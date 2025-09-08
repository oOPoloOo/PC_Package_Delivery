namespace PackageDelivery.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PackageDelivery.Data;
using PackageDelivery.DTOs;
using PackageDelivery.DTOs.Requests;
using PackageDelivery.Models;

[ApiController]
[Route("api/[controller]")] // Based on name - PackagesController -> api/packages
public class PackagesController : ControllerBase
{
    private readonly AppDbContext _db;
    // Dependency Injection
    public PackagesController(AppDbContext db) => _db = db;

    // private readonly AppDbContext _dbContext;    
    // public PackagesController(AppDbContext dbContext)
    // {
    //     _dbContext = dbContext;
    // }

    // POST api/packages
    [HttpPost]
    public async Task<ActionResult<PackageSummaryDto>> 
    PostPackage ([FromBody] CreatePackageRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var sender = new PersonInfo
        (
            request.SenderName, 
            request.SenderAddress, 
            request.SenderPhone
        );

        var recipient = new PersonInfo
        (
            request.RecipientName,  
            request.RecipientAddress,
            request.RecipientPhone
        );

        var newPackage = PackageEntity.CreateNewPackage(sender, recipient);    

        _db.Packages.Add(newPackage);
        await _db.SaveChangesAsync();

       var dto = PackageSummaryDto.FromEntity(newPackage);

       return CreatedAtAction(
            nameof(GetPackageById), 
            new { id = newPackage.Id }, 
            dto 
        );
    }

    // GET api/packages
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PackageSummaryDto>>> GetAllPackages(
        [FromQuery] string? tracking,
        [FromQuery] PackageStatus? status
    )
    {        
        var query = _db.Packages.AsNoTracking();

        // Filter by tracking number, sender name, or recipient name
        if(!string.IsNullOrWhiteSpace(tracking))
        {
            var normalized = tracking.Trim().ToLower();
            query = query.Where(p =>
                p.TrackingNumber.ToLower().Contains(normalized) ||
                p.Sender.Name.ToLower().Contains(normalized) ||
                p.Recipient.Name.ToLower().Contains(normalized));
        }

        if(status.HasValue)
        {
            query = query.Where(p => p.CurrentStatus == status.Value);
        }


        var packages = await query
        .OrderByDescending(p => p.PackageCreatedAt)
        .ToListAsync();

        // Mapping for public to DTO
        var shortPackages = packages.Select(PackageSummaryDto.FromEntity);           

        return Ok(shortPackages);
    }

    // GET api/packages/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PackageSummaryDto>> GetPackageById(Guid id)
    {
        
        var package = await _db.Packages.FindAsync(id);
        if (package == null) return NotFound();
        // TODO: add detailed DTO
        return Ok(PackageSummaryDto.FromEntity(package));
    }

    // POST api/packages/{id}/status
    [HttpPost("{id}/status")]
    public async Task<ActionResult<PackageDetailDto>> ChangeStatus(
        Guid id, 
        [FromBody] ChangeStatusRequest req
    )
    {
        // Loading package including history
        var pkg = await _db.Packages
            .Include(p => p.History)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pkg == null) 
            return NotFound(new { message = "Package not found" });

        // Trying change status 
        var result = pkg.TryChangeStatus(req.NewStatus);
        if (!result.Ok) 
            return BadRequest(new { message = result.Error });

        // Save changes to db
        await _db.SaveChangesAsync();

        // Map to DTO
        return Ok(PackageDetailDto.FromEntity(pkg));
    }

}