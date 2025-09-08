namespace PackageDelivery.DTOs.Requests;

using PackageDelivery.Models;
using System.ComponentModel.DataAnnotations;

public record ChangeStatusRequest([Required] PackageStatus NewStatus);