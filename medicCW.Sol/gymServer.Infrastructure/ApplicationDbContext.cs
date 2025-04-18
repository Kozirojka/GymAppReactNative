using gymServer.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace gymServer.Infrastructure;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Contribution> Contributions { get; set; }
    public DbSet<StudentProfile> StudentProfiles { get; set; }
    public DbSet<CoachProfile> CoachProfiles { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Відношення 1:N — Contribution -> User
        builder.Entity<Contribution>()
            .HasOne(c => c.User)
            .WithMany(u => u.Contributions)
            .HasForeignKey(c => c.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        // Відношення 1:1 — StudentProfile -> User
        builder.Entity<StudentProfile>()
            .HasOne(sp => sp.User)
            .WithOne(u => u.StudentProfile)
            .HasForeignKey<StudentProfile>(sp => sp.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        // Відношення 1:1 — CoachProfile -> User
        builder.Entity<CoachProfile>()
            .HasOne(cp => cp.User)
            .WithOne(u => u.CoachProfile)
            .HasForeignKey<CoachProfile>(cp => cp.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        // Seed ролей
        builder.Entity<IdentityRole>().HasData(
            new IdentityRole
            {
                Id = "1",
                Name = "Coach",
                NormalizedName = "COACH",
                ConcurrencyStamp = "ee81f2e5-ca09-4653-81f9-1b88134634fd"
            },
            new IdentityRole
            {
                Id = "2",
                Name = "Student",
                NormalizedName = "STUDENT",
                ConcurrencyStamp = "96c3cf11-235f-408f-b93d-6138df94cb17"
            });
    }
}
