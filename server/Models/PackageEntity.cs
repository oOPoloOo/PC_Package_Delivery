namespace PackageDelivery.Models;

using System.ComponentModel.DataAnnotations;

public class PackageEntity
{      
    public Guid Id { get; set; } = Guid.NewGuid();   

    // Sender info
    [Required]
    public string SenderName { get; set; } = string.Empty;
    [Required]
    public string SenderAddress { get; set; } = string.Empty;
    [Required]
    public string SenderPhone { get; set; } = string.Empty;

    // Recipient info
    [Required]
    public string RecipientName { get; set; } = string.Empty;
    [Required]
    public string RecipientAddress { get; set; } = string.Empty;
    [Required]
    public string RecipientPhone { get; set; } = string.Empty;

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
            TraackingNumber = GenerateTrackingNumber(),
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
}