using Microsoft.EntityFrameworkCore;
using TileManagementSystem.Models;

namespace TileManagementSystem.Data
{
    public class TileDbContext : DbContext
    {
        public TileDbContext(DbContextOptions<TileDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Application)
                .WithMany()
                .HasForeignKey(p => p.ApplicationId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
