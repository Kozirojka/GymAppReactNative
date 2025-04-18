using gymServer.Domain.Enums;

namespace gymServer.Domain;

public class CoachProfile
{
    public int Id { get; set; }
    public ApplicationUser User { get; set; }
    public string UserId { get; set; }

    public ICollection<Specialization> Specializations { get; set; } = new List<Specialization>();
}