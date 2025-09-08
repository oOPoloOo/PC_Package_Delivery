namespace PackageDelivery.Models;

public class StatusChange
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid PackageId  { get; private set; }
    public PackageStatus Status { get; private set; }
    public DateTimeOffset ChangedAt { get; private set; }

    private StatusChange() { } // For EF
    public StatusChange(PackageStatus status, Guid packageId)
    {       
        Status = status;
        PackageId = packageId;
        ChangedAt = DateTimeOffset.UtcNow;
    }
}