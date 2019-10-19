using System.Net.WebSockets;
using System.Text;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace TomasHubelbauer.Satier
{
  public class Startup
  {
    public void ConfigureServices(IServiceCollection services)
    {
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      var webSocketOptions = new WebSocketOptions();
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        webSocketOptions.AllowedOrigins.Add("https://localhost:3000");
      }
      else
      {
        webSocketOptions.AllowedOrigins.Add("https://satier.net");
      }

      app.UseWebSockets(webSocketOptions);
      app.Use(async (context, next) =>
      {
        if (context.Request.Path == "/api" && context.WebSockets.IsWebSocketRequest)
        {
          var webSocket = await context.WebSockets.AcceptWebSocketAsync();

          // TODO: https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-3.0#send-and-receive-messages
          await webSocket.SendAsync(Encoding.UTF8.GetBytes("Hello, World!"), WebSocketMessageType.Text, true, CancellationToken.None);
        }
        else
        {
          await next();
        }
      });
    }
  }
}
