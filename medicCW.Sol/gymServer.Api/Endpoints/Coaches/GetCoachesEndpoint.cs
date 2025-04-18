using Microsoft.EntityFrameworkCore;
using gymServer.Infrastructure;

namespace gymServer.Api.Endpoints.Coaches;

public class GetCoachesEndpoint : IEndpoint
{
    // GET /coaches?specializations=fitness&specializations=boxing
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/coaches", Handler)
            .RequireAuthorization("student_or_coach");
    }

    private async Task<IResult> Handler(HttpContext context, ApplicationDbContext db)
    {
        var query = context.Request.Query;

        var specializationFilters = query["specializations"]
            .Select(s => s.ToLower())
            .ToList();

        var coachesQuery = db.CoachProfiles
            .Include(cp => cp.User)
            .Include(cp => cp.Specializations)
            .AsQueryable();

        if (specializationFilters.Any())
        {
            coachesQuery = coachesQuery.Where(cp =>
                cp.Specializations.Any(s => specializationFilters.Contains(s.Name.ToLower())));
        }

        var coaches = await coachesQuery.ToListAsync();

        return Results.Ok(coaches);
    }
}