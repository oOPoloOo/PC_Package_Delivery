namespace PackageDelivery.DTOs;

using PackageDelivery.Models;

public record PackageDetailDto(
    Guid Id,
    string TrackingNumber,
    PersonInfo Sender,
    PersonInfo Recipient,
    PackageStatus CurrentStatus,
    DateTimeOffset PackageCreatedAt,
    IReadOnlyList<StatusChangeDto> History)
{
    public static PackageDetailDto FromEntity(PackageEntity  p) => new(
        p.Id,
        p.TrackingNumber,
        new PersonInfo(p.Sender.Name, p.Sender.Address, p.Sender.Phone),
        new PersonInfo(p.Recipient.Name, p.Recipient.Address, p.Recipient.Phone),
        p.CurrentStatus,
        p.PackageCreatedAt,
        p.History
            .OrderBy(h => h.ChangedAt) // Property of StatusChange
            .Select(h => new StatusChangeDto(h.Status, h.ChangedAt))
            .ToList()
    );
}