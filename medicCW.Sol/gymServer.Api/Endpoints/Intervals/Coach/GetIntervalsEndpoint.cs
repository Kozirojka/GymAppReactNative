using System.Security.Claims;
using gymServer.Api.Endpoints.Intervals.Mapper;
using gymServer.Domain.Dto.Requests;
using gymServer.Domain.Dto.Responce;
using gymServer.Infrastructure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace gymServer.Api.Endpoints.Intervals.Coach;

public class GetIntervalsEndpoint : IEndpoint
{
    public void RegisterEndpoints(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/coach/interval", Handler).RequireAuthorization("Coach").RequireAuthorization("Student");
    }

    private async Task<IResult> Handler(HttpContext context, ApplicationDbContext dbContext)
    {
        try
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
                return Results.Unauthorized();

            var result = dbContext.Intervals
                .Where(i => i.UserId == userId && 
                            (i.EndDate == DateTime.Today || i.StartDate > DateTime.Today))
                .Include(u => u.Students)
                .ToList();
            
            var mapped = IntervalMapper.MapToDtoList(result);
            
            
            if (result == null)
            {
                return Results.Ok((new List<IntervalDto>()));
            }
            
            return Results.Ok(mapped); 
        }
        catch (Exception ex)
        {
            return Results.Problem($"Помилка при поверненні інтервалу: {ex.Message}");
        }
    }
}