namespace GymApp.Domain;

public class Contribution
{
    public Guid Id { get; set; }
    
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    
    public DateTime Date { get; set; }
    public int AmountEnter { get; set; }
    public int DurationInMinutes { get; set; }
}