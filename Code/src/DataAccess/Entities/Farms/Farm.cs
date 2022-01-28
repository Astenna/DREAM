using DataAccess.Entites.Actors;
using DataAccess.Entites.Visists;

namespace DataAccess.Entites.Farms
{
    public class Farm
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        public string? AddressLine1 { get; set; }

        public string? AddressLine2 { get; set; }

        public string? City { get; set; }

        public string? PostalCode { get; set; }

        public int WaterIrrigationSystemId { get; set; }

        public int SensorSystemId { get; set; }

        public List<FarmProduction>? Production { get; set; }

        public Farmer? Farmer { get; set; }

        public List<SensorSystemResponse>? SensorSystemResponses { get; set; }

        public List<WaterIrrigationSystemResponse>? WaterIrrigationSystemResponses { get; set; }

        public List<Visit>? Visits { get; set; }
    }
}
