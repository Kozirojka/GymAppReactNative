namespace gymServer.Domain.Dto.Responce;

public class IntervalDto
{
    public Guid Id { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public List<StudentDto>? Students { get; set; }
}