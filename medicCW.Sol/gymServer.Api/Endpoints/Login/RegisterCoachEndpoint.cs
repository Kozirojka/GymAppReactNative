using gymServer.Application.Login.Command.RegisterUsers;
using gymServer.Domain.Dto.Requests;
using MediatR;

namespace gymServer.Api.Endpoints.Login;



public class RegisterCoachEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/coach/register", Handler).AllowAnonymous();
    }

    private async Task<IResult> Handler(IMediator _Mediator, RegisterCoach request)
    {
        var command = new GenerateCoachCommand(request);
        var result = await _Mediator.Send(command);

        if (result == null)
            return Results.BadRequest("I fuck your life its null");

        return Results.Ok(result);
    }
}