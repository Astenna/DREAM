namespace DataAccess.Seeder
{
    public interface ISeeder
    {
        void SeedMandals();
        void SeedProblemTypes();
        void SeedFarmProducitonTypes();
        void SeedSuggestions();
    }
}