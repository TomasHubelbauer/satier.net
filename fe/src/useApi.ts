import { useState } from 'react';

type ProgressOperation<T> = { state: 'progress'; promise: Promise<T>; };
type SuccessOperation<T> = { state: 'success'; result: T; };
type ErrorOperation = { state: 'error'; error: Error; };

export type Operation<T> =
  | ProgressOperation<T>
  | SuccessOperation<T>
  | ErrorOperation
  ;

// (args: string[]): RequestInit
const api = {
  recordFood: (args: any[]) => null
};

void api;

// TODO: Derive from `typeof api` or the other way around or something
// https://stackoverflow.com/q/58457739/2715716
type Api = {
  recordFood: (name: string) => Operation<object>;
  deleteFood: (id: number) => Operation<void>;
};

export default function useApi() {
  const [, forceUpdate] = useState();
  return new Proxy<Api>(
    {} as Api,
    {
      get(_target, p, _receiver) {
        return function () {
          // TODO: Look up the corresponding arguments to RequestInit mapper
          const promise = fetch(`/api/${String(p)}`, { body: JSON.stringify(arguments) }).then(response => response.text());

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
  );
}
