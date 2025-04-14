using Microsoft.AspNetCore.Identity;

namespace gymServer.Domain;

public class ApplicationUser : IdentityUser
{
    public ICollection<Contribution> Contributions { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}