namespace gymServer.Domain;

public class Intervals
{
    public Guid Id { get; set; }
    public string UserId { get; set; }  
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public ICollection<ApplicationUser> Students { get; set; }
}