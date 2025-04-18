using gymServer.Domain.Dto.Responce;

namespace gymServer.Api.Endpoints.Intervals.Mapper;

public static class IntervalMapper
{
    private static IntervalDto MapToDto(Domain.Intervals interval)
    {
        return new IntervalDto
        {
            Id = interval.Id,
            StartDate = interval.StartDate,
            EndDate = interval.EndDate,
            Students = interval.Students?.Select(s => new StudentDto
            {
                Id = s.Id,
                FullName = $"{s.FirstName} {s.LastName}"
            }).ToList()
        };
    }

    public static List<IntervalDto> MapToDtoList(List<Domain.Intervals> intervals)
    {
        return intervals.Select(MapToDto).ToList();
    }
}
