using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DataAccess.Seeder
{
    public class Seeder<T> : ISeeder where T : DbContext
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<Seeder<T>> _logger;

        public Seeder(IServiceScopeFactory serviceScopeFactory, ILogger<Seeder<T>> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        public void SeedMandals()
        {
            using (var serviceScope = _serviceScopeFactory.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<T>();
                string script = @"INSERT INTO ""Mandals"" (""Name"") 
                                    VALUES
                                        ('Kothagudem'), 
                                        ('Palwancha'), 
                                        ('Tekulapalli'), 
                                        ('Yellandu'), 
                                        ('Chandrugonda'), 
                                        ('Aswaraopeta'), 
                                        ('Mulakalapalli'), 
                                        ('Dammapeta'), 
                                        ('Gundala'), 
                                        ('Julurpadu'), 
                                        ('Sujathanagar'), 
                                        ('Chunchupalle'), 
                                        ('Laxmidevipalli'), 
                                        ('Allapalli'), 
                                        ('Annapureddypalli'), 
                                        ('Bachannapeta'), 
                                        ('Devaruppala'), 
                                        ('Jangaon'), 
                                        ('Lingalaghanpur'), 
                                        ('Narmetta'), 
                                        ('Raghunathapalle'), 
                                        ('Tarigoppula'), 
                                        ('Bhupalpalle'), 
                                        ('Chityal'), 
                                        ('Ghanpur'), 
                                        ('Kataram'), 
                                        ('Mahadevpur'), 
                                        ('Maha Mutharam'), 
                                        ('Malharrao'), 
                                        ('Mogullapalle'), 
                                        ('Palimela'), 
                                        ('Regonda'), 
                                        ('Tekumatla')
                ON CONFLICT DO NOTHING;";

                context.Database.ExecuteSqlRaw(script);
                _logger.LogInformation("Database seeded with mandals from mandals.sql.");
            }
        }

        public void SeedProblemTypes()
        {
            using (var serviceScope = _serviceScopeFactory.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<T>();
                string script = @"INSERT INTO ""ProblemTypes""(""Name"", ""NumberOfAdditionalVisits"")
                                VALUES('Weather', 1),
                                ('Insects', 2),
                                ('NegativeNote', 3),
                                ('Other', 2); 
                                ON CONFLICT DO NOTHING;";

                context.Database.ExecuteSqlRaw(script);
                _logger.LogInformation("Database seeded with mandals from mandals.sql.");
            }
        }
    }
}
