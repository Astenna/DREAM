using DataAccess.AutoMigrations;
using DataAccess.Seeder;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BusinessLogic.ServiceCollectionExtensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAutomigrations<T>(this IServiceCollection services, IConfiguration configuration) where T : DbContext
        {
            if (configuration.GetValue<bool>("EnableAutoMigrations"))
            {
                services.AddSingleton<IAutoMigrations, AutoMigrations<T>>();
            }

            return services;
        }

        public static IApplicationBuilder UseAutoMigration(this IApplicationBuilder app)
        {
            foreach (var autoMigration in app.ApplicationServices.GetServices<IAutoMigrations>())
            {
                autoMigration?.ApplyMigrations();
            }

            return app;
        }

        public static IServiceCollection AddSeeder<T>(this IServiceCollection services, IConfiguration configuration) where T : DbContext
        {
            if (configuration.GetValue<bool>("EnableSeeder"))
            {
                services.AddSingleton<ISeeder, Seeder<T>>();
            }

            return services;
        }

        public static IApplicationBuilder UseSeeder(this IApplicationBuilder app)
        {
            foreach (var seeder in app.ApplicationServices.GetServices<ISeeder>())
            {
                seeder?.SeedMandals();
                seeder?.SeedProblemTypes();
            }

            return app;
        }
    }
}
