namespace PackageDelivery.Data;

using Microsoft.EntityFrameworkCore;
using PackageDelivery.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }   

    public DbSet<PackageEntity> Packages {get; set; } = null!;

    //Map model to the database 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PackageEntity>()
            .Property(p => p.CurrentStatus)
            .HasConversion<string>();
    }
}