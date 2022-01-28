using DataAccess.Entites.Farms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configuration
{
    internal class FarmConfiguration : IEntityTypeConfiguration<Farm>
    {
        public void Configure(EntityTypeBuilder<Farm> builder)
        {
            builder
               .HasMany(x => x.SensorSystemResponses)
               .WithOne(x => x.Farm)
               .OnDelete(DeleteBehavior.Cascade);

            builder
               .HasMany(x => x.WaterIrrigationSystemResponses)
               .WithOne(x => x.Farm)
               .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
