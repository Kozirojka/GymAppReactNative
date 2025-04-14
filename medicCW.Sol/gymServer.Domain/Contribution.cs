namespace gymServer.Domain;

public class Contribution
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
}