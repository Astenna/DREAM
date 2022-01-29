using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace DataAccess.AutoMigrations
{
    public class AutoMigrations<T> : IAutoMigrations where T : DbContext
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<AutoMigrations<T>> _logger;

        public AutoMigrations(IServiceScopeFactory serviceScopeFactory, ILogger<AutoMigrations<T>> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        public void ApplyMigrations()
        {
            using (var serviceScope = _serviceScopeFactory.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<T>();

                var pendingMigrations = context.Database.GetPendingMigrations();

                if (pendingMigrations.Any())
                {
                    _logger.LogInformation("Not applied migrations found. Apllying new migrations started.");

                    context.Database.Migrate();
                    context.Database.GetDbConnection();

                    _logger.LogInformation("Applying new migrations finished.");
                }
                else
                {
                    _logger.LogInformation("Database migrations check: All migrations already applied.");
                }
            }
        }
    }
}
