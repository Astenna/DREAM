using DataAccess.Entites.Actors;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configuration
{
    internal class FarmerConfiguration : IEntityTypeConfiguration<Farmer>
    {
        public void Configure(EntityTypeBuilder<Farmer> builder)
        {
            builder
               .HasMany(x => x.CreatedHelpReponses)
               .WithOne(x => x.CreatedByFarmer)
               .OnDelete(DeleteBehavior.Cascade);

            builder
               .HasMany(x => x.CreatedHelpRequests)
               .WithOne(x => x.CreatedBy)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

            builder
               .HasMany(x => x.ReceivedHelpRequests)
               .WithMany(x => x.FarmersSent);

            builder
               .HasMany(x => x.Note)
               .WithOne(x => x.Farmer)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
