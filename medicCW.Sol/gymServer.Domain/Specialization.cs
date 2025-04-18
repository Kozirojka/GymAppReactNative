namespace gymServer.Domain;

public class Specialization
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public ICollection<CoachProfile> Coaches { get; set; } = new List<CoachProfile>();
}