using System.Security.Claims;
using gymServer.Domain.Dto.Requests;
using gymServer.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;

namespace gymServer.Api.Endpoints.Intervals.Coach;

public class PostAvalableIntervalEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/interval", Handler).RequireAuthorization("Coach");
    }

    private async Task<IResult> Handler(SetIntervalRequest request, HttpContext context, ApplicationDbContext dbContext)
    {
        try
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Results.Unauthorized(); 

            if (request.StartTime >= request.EndTime)
                return Results.BadRequest("StartTime має бути меншим за EndTime");

            var interval = new Domain.Intervals
            {
                EndDate = request.EndTime,
                StartDate = request.StartTime,
                UserId = userId
            };

            dbContext.Intervals.Add(interval);
            await dbContext.SaveChangesAsync();

            return Results.Ok(new { message = "Інтервал успішно збережено" }); 
        }
        catch (Exception ex)
        {
            return Results.Problem($"Помилка при збереженні інтервалу: {ex.Message}");
        }
    }
}