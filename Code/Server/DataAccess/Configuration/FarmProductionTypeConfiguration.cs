using DataAccess.Entities.Farms;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configuration
{
    internal class FarmProductionTypeConfiguration : IEntityTypeConfiguration<FarmProductionType>
    {
        public void Configure(EntityTypeBuilder<FarmProductionType> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();
        }
    }
}
