namespace PackageDelivery.Data;

using Microsoft.EntityFrameworkCore;
using PackageDelivery.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }   

    public DbSet<PackageEntity> Packages => Set<PackageEntity>();
    public DbSet<StatusChange> StatusChanges => Set<StatusChange>();


    //Map model to the database 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PackageEntity>(b =>
        {
            b.HasKey(p => p.Id);
            b.OwnsOne(p => p.Sender);
            b.OwnsOne(p => p.Recipient);
            b.HasMany(p => p.History).WithOne().HasForeignKey(h => h.PackageId);
        });

        modelBuilder.Entity<StatusChange>(b =>
        {
            b.HasKey(s => s.Id);
            b.Property(s => s.Status).HasConversion<string>();
        });
    }
}