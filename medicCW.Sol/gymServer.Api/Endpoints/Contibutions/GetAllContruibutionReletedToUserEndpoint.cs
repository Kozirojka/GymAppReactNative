using System.Security.Claims;
using gymServer.Domain;
using gymServer.Infrastructure;

namespace gymServer.Api.Endpoints.Contibutions;

public class GetAllContruibutionReletedToUserEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/contribution", Handler).RequireAuthorization("Student");
    }

    private async Task<IResult> Handler(HttpContext context, ApplicationDbContext dbContext)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Results.Ok();

        
        var fromDate = DateTime.UtcNow.AddDays(-364);

        var listOfContribution = dbContext
            .Contributions
            .Where(c => c.UserId == userId)
            .Where(c => c.Date >= fromDate)
            .ToList();

        if (listOfContribution.Any())
        {
            return Results.Ok(listOfContribution);
        }
        
        return Results.Ok(new List<Contribution>());
    }
}