import { useState, useRef, useEffect } from 'react';

type ProgressOperation<T> = { state: 'progress'; promise: Promise<T>; };
type SuccessOperation<T> = { state: 'success'; result: T; };
type ErrorOperation = { state: 'error'; error: Error; };

export type Operation<T> =
  | ProgressOperation<T>
  | SuccessOperation<T>
  | ErrorOperation
  ;

type Api = {
  recordFood: (name: string) => Operation<object>;
  deleteFood: (id: number) => Operation<void>;
};

export default function useApi() {
  const [, forceUpdate] = useState();
  const { current: webSocket } = useRef(new WebSocket('/api'));
  useEffect(() => {
    webSocket.addEventListener('open', () => console.log('open'));
    webSocket.addEventListener('message', () => console.log('message'));
    webSocket.addEventListener('close', () => console.log('close'));
    webSocket.addEventListener('error', () => console.log('error'));
  }, []);

  const proxy = useRef(new Proxy<Api>(
    {} as Api,
    {
      get(_target, p, _receiver) {
        return function () {
          // Stringify only the argument values because it is impossible to get the argument names at runtime
          // https://github.com/TomasHubelbauer/typescript-api-proxy
          const _promise = fetch(`/api/${String(p)}`, { body: JSON.stringify(arguments) }).then(response => response.text());
          void _promise;

          // TODO
          const method = String(p);
          const args = Array.from(arguments);
          const promise = new Promise((resolve, reject) => {
            // TODO: Attach a correlation ID and resolve/reject based on incoming messages with that same correlation ID
            webSocket.send(`${method}(${JSON.stringify(args)})`);
          });

          // Provide access to the promise to avoid hooking into its flow
          let operation: Operation<unknown> = { state: 'progress', promise };

          void async function () {
            try {
              (operation as any as SuccessOperation<unknown>).result = await promise;
              (operation as any).state = 'success';
            } catch (error) {
              (operation as any as ErrorOperation).error = error;
              (operation as any).state = 'error';
            } finally {
              delete operation.promise;

              // Cause  the caller to re-render and re-query the operation reference
              forceUpdate(operation);
            }
          }()

          // Return a reference to the mutable operation object
          return operation;
        };
      }
    }
  ));

  return proxy.current;
}
