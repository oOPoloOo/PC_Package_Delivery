namespace PackageDelivery.Models;

using System.ComponentModel.DataAnnotations;

public class PackageEntity
{      
    public Guid Id { get; set; }  = default!;

    public PersonInfo Sender { get; private set; } = default!;

    public PersonInfo Recipient { get; private set; } = default!;

    // Package info
    public string TrackingNumber { get; set; } = default!;

    public PackageStatus CurrentStatus { get; set; } 

    public DateTimeOffset PackageCreatedAt { get; set; }
    
    public List<StatusChange> History { get; private set; } = new();

    private PackageEntity() { /* For EF */ }

    private PackageEntity(PersonInfo sender, PersonInfo recipient)
    {
        Sender = sender;
        Recipient = recipient;
        // initial history entry
        History.Add(new StatusChange(CurrentStatus));
    }    
    
    // Functions
    private static string GenerateTrackingNumber()
    {
        return $"PKG-{Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper()}";
    } 

    // Creating new package
    public static PackageEntity CreateNewPackage(PersonInfo sender, PersonInfo recipient)
    {
        var pkg = new PackageEntity(sender, recipient);

        pkg.Id = Guid.NewGuid();
        pkg.TrackingNumber = GenerateTrackingNumber();
        pkg.CurrentStatus = PackageStatus.Created;
        pkg.PackageCreatedAt = DateTimeOffset.UtcNow;
        
        return pkg;
    }

    public (bool Ok, string? Error) TryChangeStatus(PackageStatus newStatus)
    {
        if (newStatus == CurrentStatus)
        return (false, $"Package is already this status '{CurrentStatus}'.");

        if (!StatusRules.AllowedTransitions.TryGetValue(CurrentStatus, out var allowed) || !allowed.Contains(newStatus))
        return (false, $"Cannot change status from '{CurrentStatus}' to '{newStatus}'.");

        CurrentStatus = newStatus;
        // Save new status to db
        History.Add(new StatusChange(newStatus));
        return (true, null);
    }
}