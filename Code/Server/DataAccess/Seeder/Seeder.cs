﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace DataAccess.Seeder
{
    public class Seeder<T> : ISeeder where T : DbContext
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly ILogger<Seeder<T>> _logger;
        public static string SuggestionsFilename = "Suggestions.sql";

        public Seeder(IServiceScopeFactory serviceScopeFactory, ILogger<Seeder<T>> logger)
        {
            _serviceScopeFactory = serviceScopeFactory;
            _logger = logger;
        }

        public void SeedMandals()
        {
            using var serviceScope = _serviceScopeFactory.CreateScope();
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
            _logger.LogInformation("Database seeded with mandals");
        }

        public void SeedFarmProducitonTypes()
        {
            using var serviceScope = _serviceScopeFactory.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<T>();
            string script = @"INSERT INTO ""FarmProductionTypes"" (""Name"")
                                    VALUES
                                        ('Milk'),
                                        ('Cucumber'),
                                        ('Rice'),
                                        ('Wheat'),
                                        ('Sugarcane'),
                                        ('Cotton'),
                                        ('Wool'),
                                        ('Groundnuts'),
                                        ('Jute'),
                                        ('Soy Bean'),
                                        ('Sunflower'),
                                        ('Mandarin'),
                                        ('Banana'),
                                        ('Guava'),
                                        ('Mango'),
                                        ('Papaya'),
                                        ('Pomegranate'),
                                        ('Cauliflower'),
                                        ('Onion'),
                                        ('Coconut'),
                                        ('Cumin'),
                                        ('Coriander'),
                                        ('Grapes'),
                                        ('Apple')
                ON CONFLICT DO NOTHING;";

            context.Database.ExecuteSqlRaw(script);
            _logger.LogInformation("Database seeded with farm production types.");
        }
        public void SeedSuggestions()
        {
            using var serviceScope = _serviceScopeFactory.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<T>(); 
            
            var assembly = typeof(Seeder<DbContext>).Assembly;
            var files = assembly.GetManifestResourceNames();
            var file = assembly.GetManifestResourceNames()
                .SingleOrDefault(x => x.Contains(SuggestionsFilename));
            
            if(file is null)
            {
                _logger.LogWarning("Could not find sql script for Suggestions seeder. Suggestions not added.");
            }

            using Stream stream = assembly.GetManifestResourceStream(file);
            using StreamReader reader = new StreamReader(stream);
            string command = reader.ReadToEnd();
            context.Database.ExecuteSqlRaw(command);
            _logger.LogInformation("Database seeded with suggestions.");
        }

        public void SeedProblemTypes()
        {
            using var serviceScope = _serviceScopeFactory.CreateScope();
            var context = serviceScope.ServiceProvider.GetRequiredService<T>();
            string script = @"INSERT INTO ""ProblemTypes""(""Name"", ""NumberOfAdditionalVisits"")
                                VALUES('Weather', 1),
                                ('Insects', 2),
                                ('NegativeNote', 3),
                                ('Other', 2) 
                                ON CONFLICT DO NOTHING;";

            context.Database.ExecuteSqlRaw(script);
            _logger.LogInformation("Database seeded with problem types.");
        }
    }
}
