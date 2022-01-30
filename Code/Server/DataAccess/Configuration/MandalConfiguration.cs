using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configuration
{
    internal class MandalConfiguration : IEntityTypeConfiguration<Mandal>
    {
        public void Configure(EntityTypeBuilder<Mandal> builder)
        {
            builder.HasIndex(p => p.Name).IsUnique();
        }
    }
}
