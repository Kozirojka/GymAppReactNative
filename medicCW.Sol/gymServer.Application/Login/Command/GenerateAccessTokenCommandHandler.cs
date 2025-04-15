using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using gymServer.Domain;
using gymServer.Infrastructure.Settings;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace gymServer.Application.Login.Command;


public record GenerateAccessTokenCommand : IRequest<string>
{
    public ApplicationUser User { get; init; }
    public string Role { get; init; }
}


public class GenerateAccessTokenCommandHandler : IRequestHandler<GenerateAccessTokenCommand, string>
{
    private readonly JwtSettings _jwtSettings;
    
    public GenerateAccessTokenCommandHandler(IOptions<JwtSettings> jwtOptions)
    {
        _jwtSettings = jwtOptions.Value;
    }


    public async Task<string> Handle(GenerateAccessTokenCommand request, CancellationToken cancellationToken)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, request.User.Id),
            new Claim(ClaimTypes.Name, request.User.UserName),
            new Claim(ClaimTypes.Email, request.User.Email),
            new Claim(ClaimTypes.Role, request.Role),
            new Claim("FirstName", request.User.FirstName),
            new Claim("LastName", request.User.LastName)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(_jwtSettings.ExpiryHours),
            SigningCredentials = creds,
            Issuer = _jwtSettings.Issuer,
            Audience = _jwtSettings.Audience
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}