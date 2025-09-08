public static class StatusRules
{
    public static readonly IReadOnlyDictionary<PackageStatus, PackageStatus[]> AllowedTransitions = 
    new Dictionary<PackageStatus, PackageStatus[]>
    {
        { PackageStatus.Created, new[] { PackageStatus.Send, PackageStatus.Cancelled} },
        { PackageStatus.Sent, new[] { PackageStatus.Accepted, PackageStatus.Returned, PackageStatus.Cancelled} },
        { PackageStatus.Returned, new[] { PackageStatus.Send, PackageStatus.Cancelled} },
        { PackageStatus.Accepted, Array.Empty<PackageStatus>() },
        { PackageStatus.Cancelled, Array.Empty<PackageStatus>() }       
    };
}