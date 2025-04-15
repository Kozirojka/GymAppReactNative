namespace gymServer.Domain;

public class CoachProfile
{
    public int Id { get; set; }
    public ApplicationUser User { get; set; }
    public string UserId { get; set; }
}