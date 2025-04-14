using Microsoft.AspNetCore.Identity;

namespace gymServer.Domain;

public class ApplicationUser : IdentityUser
{
    public ICollection<Contribution> Contributions { get; set; }
}