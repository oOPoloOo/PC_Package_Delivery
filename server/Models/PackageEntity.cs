namespace PackageDelivery.Models;

using System.ComponentModel.DataAnnotations;

public class PackageEntity
{      
    public Guid Id { get; set; } = Guid.NewGuid();  

    public PersonInfo Sender { get; private set; }

    public PersonInfo Recipient { get; private set; }   

    // Package info
    public string TrackingNumber { get; set; } = GenerateTrackingNumber();

    public PackageStatus CurrentStatus { get; set; } = PackageStatus.Created;

    public DateTimeOffset PackageCreatedAt { get; set; } = DateTimeOffset.UtcNow;

    // Functions
    private static string GenerateTrackingNumber()
    {
        return $"PKG-{Guid.NewGuid().ToString("N").Substring(0, 8).ToUpper()}";
    } 

    // Creating new package
    public static PackageEntity CreateNewPackage(
        string senderName, 
        string senderAddress, 
        string senderPhone,
        string recipientName,
        string recipientAddress,
        string recipientPhone)
    {
        return new PackageEntity
        { 
            //Overriding Id and TrackingNumber... to be sure
            Id = Guid.NewGuid(),
            TrackingNumber = GenerateTrackingNumber(),
            SenderName = senderName,
            SenderAddress = senderAddress,
            SenderPhone = senderPhone,
            RecipientName = recipientName,
            RecipientAddress = recipientAddress,
            RecipientPhone = recipientPhone,
            CurrentStatus = PackageStatus.Created,
            PackageCreatedAt = DateTimeOffset.UtcNow
        };
    }

    public (bool Ok, string? Error) TryChangeStatus(PackageStatus newStatus)
    {
        if (newStatus == CurrentStatus)
        return (false, $"Package is already this status '{CurrentStatus}'.");

        if (!StatusRules.AllowedTransitions.TryGetValue(CurrentStatus, out var allowed) || !allowed.Contains(newStatus))
        return (false, $"Cannot change status from '{CurrentStatus}' to '{newStatus}'.");

        CurrentStatus = newStatus;
        // TODO: Implement saving to db
        return (true, null);
    }
}