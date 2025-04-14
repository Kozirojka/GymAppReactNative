namespace gymServer.Api.Endpoints;

public class LoginEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        
        endpoints.MapPost("/login", async (HttpContext context) =>
        {
            return Results.Ok(new
            {
                message = "name"
            });
        });
    }
}