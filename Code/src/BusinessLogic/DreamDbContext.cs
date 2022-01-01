using DataAccess.Entites.Actors;
using DataAccess.Entites.DiscussionForum;
using DataAccess.Entites.Farms;
using DataAccess.Entites.Visists;
using DataAccess.Entities;
using DataAccess.Entities.Farms;
using Microsoft.EntityFrameworkCore;

namespace DataAccess
{
    public class DreamDbContext : DbContext
    {
        public DreamDbContext(DbContextOptions<DreamDbContext> options) : base(options) { }

        public DbSet<Agronomist> Agronomists { get; set; }

        public DbSet<Farmer> Farmers { get; set; }

        public DbSet<PolicyMaker> PolicyMakers { get; set; }

        public DbSet<ForumThread> ForumThreads{ get; set; }

        public DbSet<ForumComment> ForumComments { get; set; }

        public DbSet<Farm> Farms { get; set; }

        public DbSet<FarmProduction> FarmProductions { get; set; }

        public DbSet<FarmProductionType> FarmProductionTypes { get; set; }

        public DbSet<SensorSystemResponse> SensorSystemResponses { get; set; }

        public DbSet<WaterIrrigationSystemResponse> WaterIrrigationSystemResponses { get; set; }

        public DbSet<Visit> Visits { get; set; }

        public DbSet<FarmerNote> FarmerNotes { get; set; }

        public DbSet<HelpRequest> HelpRequests { get; set; }

        public DbSet<HelpResponse> HelpResponses { get; set; }

        public DbSet<Mandal> Mandals { get; set; }

        public DbSet<ProblemType> ProblemTypes { get; set; }

        public DbSet<Suggestion> Suggestions { get; set; }

        public DbSet<WeatherForecastResponse> WeatherForecastResponses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
