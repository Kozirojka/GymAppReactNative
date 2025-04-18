namespace gymServer.Domain.Dto.Requests;

public class SetIntervalRequest
{
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}