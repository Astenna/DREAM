using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configuration
{
    internal class ProblemTypeConfiguration : IEntityTypeConfiguration<ProblemType>
    {
        public void Configure(EntityTypeBuilder<ProblemType> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();
        }
    }
}
