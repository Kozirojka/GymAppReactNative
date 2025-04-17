using System.Security.Claims;
using gymServer.Domain;
using gymServer.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace gymServer.Api.Endpoints.Contibutions;

public class PostContributionEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/contribution", Handler).RequireAuthorization(); 
    }

    private async Task<IResult> Handler(HttpContext context, ApplicationDbContext applicationDbContext)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
            return Results.Unauthorized();

        var today = DateTime.Today;

        var contribution = await applicationDbContext.Contributions
            .SingleOrDefaultAsync(c => c.Date == today && c.UserId == userId);

        if (contribution == null)
        {
            var newContribution = new Contribution
            {
                Date = today,
                Amount = 1,
                UserId = userId
            };

            await applicationDbContext.Contributions.AddAsync(newContribution);
            await applicationDbContext.SaveChangesAsync();

            return Results.Created($"/contribution/{today:yyyy-MM-dd}", new
            {
                Message = "Contribution created",
                Date = today,
                Amount = 1,
                UserId = userId
            });
        }
        else
        {
            contribution.Amount += 1;
            await applicationDbContext.SaveChangesAsync();

            return Results.Ok(new
            {
                Message = "Contribution updated",
                Date = today,
                Amount = contribution.Amount,
                UserId = userId
            });
        }
    }
}