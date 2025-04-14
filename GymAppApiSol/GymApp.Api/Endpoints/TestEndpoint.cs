namespace GymApp.Api.Endpoints;

public class TestEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/apple", Handler).WithOpenApi();
    }

    private async Task<IResult> Handler(HttpContext context)
    {   
        
        Console.WriteLine("Hello Bitch!");
        
        return Results.Ok(new { message = "Hello World!" });
    }
}