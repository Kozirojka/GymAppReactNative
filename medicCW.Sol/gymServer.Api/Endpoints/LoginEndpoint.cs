using gymServer.Application.Login.Command;
using gymServer.Domain;
using gymServer.Domain.Dto.Requests;
using gymServer.Domain.Dto.Responce;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace gymServer.Api.Endpoints;

public class LoginEndpoint : IEndpoint
{
    
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        
        endpoints.MapPost("/login", async (LoginRequest request, IMediator _Mediator, UserManager<ApplicationUser> _UserManager) =>
        {
            
            var user = await _UserManager.FindByEmailAsync(request.Email);
            if (user == null) 
                return Results.Unauthorized();

            var role = (await _UserManager.GetRolesAsync(user)).FirstOrDefault();

            var accessToken = await _Mediator.Send(new GenerateAccessTokenCommand 
            { 
                User = user, 
                Role = role 
            });
            
            return Results.Ok(new AuthResponse
            {
                AccessToken = accessToken,
            });
        });
    }
}