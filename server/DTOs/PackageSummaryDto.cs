namespace PackageDelivery.DTOs;

using PackageDelivery.Models;

public class PackageSummaryDto
{
    public Guid id { get; set; }   

    // Sender info
    public string senderName { get; set; } = string.Empty;

    // Recipient info
    public string recipientName { get; set; } = string.Empty;

    // Package info
    public string trackingNumber { get; set; } = string.Empty;
    public PackageStatus currentStatus { get; set; } 
    public DateTimeOffset packageCreatedAt { get; set; } 

    // Mapping entity -> DTO
    public static PackageSummaryDto FromEntity(PackageEntity entity)
    {
        return new PackageSummaryDto
        {
            id = entity.Id,
            senderName = entity.SenderName,
            recipientName = entity.RecipientName,
            trackingNumber = entity.TrackingNumber,
            currentStatus = entity.CurrentStatus,
            packageCreatedAt = entity.PackageCreatedAt
        };
    }
}