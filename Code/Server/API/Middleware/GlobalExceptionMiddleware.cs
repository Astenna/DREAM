using BusinessLogic.Exceptions;
using Newtonsoft.Json;
using System.Net;
using System.Security.Authentication;

namespace API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                if (context.Response.HasStarted)
                {
                    _logger.LogWarning(
                        "The response has already been sent to the client, the exception middleware will not be executed.");
                    throw;
                }

                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<GlobalExceptionMiddleware> logger)
        {
            context.Response.ContentType = "application/json";
            var json = JsonConvert.SerializeObject(ex.Message);

            switch (ex)
            {
                case ApiException apiException when apiException.ErrorCode == ErrorCode.InvalidInput:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    await context.Response.WriteAsync(json);
                    break;
                case ApiException apiException when apiException.ErrorCode == ErrorCode.AuthorizationException:
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    await context.Response.WriteAsync(json);
                    break;
                case FluentValidation.ValidationException _:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    await context.Response.WriteAsync(json);
                    break;
                case AuthenticationException _:
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    break;
                case UnauthorizedAccessException _:
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;
                default:
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    await context.Response.WriteAsync(json);
                    break;
            }

            logger.LogWarning($"Error {context.Response} occurred during processing the request {context.Request}. Server responded with {context.Response.StatusCode}");
        }
    }
}
