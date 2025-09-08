namespace PackageDelivery.DTOs;

using PackageDelivery.Models;

public record StatusChangeDto(PackageStatus Status, DateTimeOffset ChangedAt);