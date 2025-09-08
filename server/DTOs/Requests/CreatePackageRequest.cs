namespace PackageDelivery.DTOs.Requests;

using System.ComponentModel.DataAnnotations;

public class CreatePackageRequest
{
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
}