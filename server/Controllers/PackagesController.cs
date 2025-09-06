namespace PackageDelivery.Controllers;

using Microsoft.AspNetCore.Mvc;
using PackageDelivery.Data;
using PackageDelivery.DTOs;
using PackageDelivery.Models;

[ApiController]
[Route("api/[controller]")] // Based on name - PackagesController -> api/packages
public class PackagesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    // Dependency Injection
    public PackagesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    // POST api/packages
    [HttpPost]
    public async Task<ActionResult<PackageSummaryDto>> 
    PostPackage ([FromBody] CreatePackageRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var newPackage = PackageEntity.CreateNewPackage(
            request.SenderName,
            request.SenderAddress,
            request.SenderPhone,
            request.RecipientName,
            request.RecipientAddress,
            request.RecipientPhone
        );    

        _dbContext.Packages.Add(newPackage);
        await _dbContext.SaveChangesAsync();

       var dto = PackageSummaryDto.FromEntity(newPackage);

       return CreatedAtAction(
            nameof(GetPackageById), // Name of the action
            new { id = newPackage.Id }, // Route values
            dto // Response body
        );
    }

    // GET api/packages
    [HttpGet]
    public ActionResult<IEnumerable<PackageSummaryDto>> GetAllPackages()
    {
        var packages = _dbContext.Packages
            .Select(PackageSummaryDto.FromEntity)
            .ToList();

        return Ok(packages);
    }

    // GET api/packages/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PackageSummaryDto>> GetPackageById(Guid id)
    {
        var package = await _dbContext.Packages.FindAsync(id);
        if (package == null) return NotFound();

        return Ok(PackageSummaryDto.FromEntity(package));
    }
}