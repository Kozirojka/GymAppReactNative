using Microsoft.AspNetCore.Identity;

namespace gymServer.Domain;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public ICollection<Contribution> Contributions { get; set; }

    public StudentProfile StudentProfile { get; set; }
    public CoachProfile CoachProfile { get; set; }
}