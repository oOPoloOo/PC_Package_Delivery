namespace PackageDelivery.DTOs;

using PackageDelivery.Models;

public class PackageSummaryDto
{
    public Guid Id { get; set; }   

    // Sender info
    public string SenderName { get; set; } = string.Empty;

    // Recipient info
    public string RecipientName { get; set; } = string.Empty;

    // Package info
    public string TrackingNumber { get; set; } = string.Empty;
    public PackageStatus CurrentStatus { get; set; } 
    public DateTimeOffset PackageCreatedAt { get; set; } 

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