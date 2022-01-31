using DataAccess.Entities.Farms;

namespace DataAccess.Entites.Farms
{
    public class FarmProduction
    {
        public int Id { get; set; }

        public float Amount { get; set; }

        public DateTime Date { get; set; }

        public int ProductionTypeId { get; set; }

        public FarmProductionType ProductionType { get; set; }

        public int FarmId { get; set; }

        public Farm Farm { get; set; }
    }
}
