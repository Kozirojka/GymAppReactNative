namespace gymServer.Domain;

public class StudentProfile
{
    public int Id { get; set; }
    public ApplicationUser User { get; set; }
    public string UserId { get; set; }
}