using gymServer.Domain;
using gymServer.Domain.Dto.Requests;
using gymServer.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace gymServer.Application.Login.Command.RegisterUsers;

public record  GenerateCoachCommand(RegisterCoach DriverRequest) : IRequest<AuthResult>;

public class GenerateCoachCommandHandler : IRequestHandler<GenerateCoachCommand, AuthResult>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMediator _mediator;
    private readonly ApplicationDbContext _context; 

    public GenerateCoachCommandHandler(UserManager<ApplicationUser> userManager, IMediator mediator,
        ApplicationDbContext context)
    {
        _userManager = userManager;
        _mediator = mediator;
        _context = context;
    }


    public async Task<AuthResult> Handle(GenerateCoachCommand request, CancellationToken cancellationToken)
    {
        if (request == null || request.DriverRequest == null)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "Request is null"
            };
        }

        
        if (string.IsNullOrWhiteSpace(request.DriverRequest.Email) ||
            string.IsNullOrWhiteSpace(request.DriverRequest.Password) ||
            string.IsNullOrWhiteSpace(request.DriverRequest.FirstName) ||
            string.IsNullOrWhiteSpace(request.DriverRequest.LastName))
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "All fields are required"
            };
        }

        if (await _userManager.FindByEmailAsync(request.DriverRequest.Email) != null)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "Email is already registered"
            };
        }

        var user = new ApplicationUser
        {
            UserName = request.DriverRequest.Email,
            Email = request.DriverRequest.Email,
            FirstName = request.DriverRequest.FirstName,
            LastName = request.DriverRequest.LastName,
        };
        
        
        
        var result = await _userManager.CreateAsync(user, request.DriverRequest.Password);
        if (!result.Succeeded)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = string.Join(", ", result.Errors.Select(e => e.Description))
            };
        }
        
        var roleResult = await _userManager.AddToRoleAsync(user, "Coach");
        if (!roleResult.Succeeded)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "Failed to assign role"
            };
        }

        var createCoachProfile = new CoachProfile()
        {
            UserId = user.Id,
            User = user
        };
        
        if (request.DriverRequest.Specializations != null && request.DriverRequest.Specializations.Any())
        {
            var specializations = await _context.Specializations
                .Where(s => request.DriverRequest.Specializations.Contains(s.Name))  
                .ToListAsync(cancellationToken);

            createCoachProfile.Specializations = specializations;
        }
        
        string token;
        try
        {
            token = await _mediator.Send(new GenerateAccessTokenCommand
            {
                User = user,
                Role = "Coach"
            }, cancellationToken);
        }
        catch (Exception ex)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = $"Failed to generate access token: {ex.Message}"
            };
        }

        


        try
        {
            _context.CoachProfiles.Add(createCoachProfile);
            await _context.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            await _userManager.DeleteAsync(user); 
            return new AuthResult
            {
                Succeeded = false,
                Error = $"Failed to create patient profile: {ex.Message}"
            };
        }

        var updateResult = await _userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "Failed to update user with refresh token"
            };
        }

        if (string.IsNullOrEmpty(token))
        {
            return new AuthResult
            {
                Succeeded = false,
                Error = "Token generation failed"
            };
        }

        return new AuthResult
        {
            Succeeded = true,
            Response = new AuthResponseDto
            {
                UserId = user.Id,
                Email = user.Email,
                Token = token,
                Role = "Coach",
                FirstName = user.FirstName,
                LastName = user.LastName,
            }
        };
    }

}
