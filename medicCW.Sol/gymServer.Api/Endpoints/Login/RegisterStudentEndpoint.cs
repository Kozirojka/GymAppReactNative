using gymServer.Application.Login.Command;
using gymServer.Application.Login.Command.RegisterUsers;
using gymServer.Domain.Dto.Requests;
using MediatR;

namespace gymServer.Api.Endpoints.Login;

public class RegisterStudentEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/student/register", Handler).AllowAnonymous();
    }

    private async Task<IResult> Handler(IMediator _Mediator, RegisterUserRequest request)
    {
        var command = new CreateStudentCommand(request);
        var result = await _Mediator.Send(command);

        if (result == null)
            return Results.BadRequest("I fuck your life its null");

        return Results.Ok(result);
    }
}