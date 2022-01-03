namespace DataAccess.Entites.Farms
{
    public class WaterIrrigationSystemResponse 
    {
        public int Id { get; set; }

        public float WaterUsed { get; set; }

        public DateTime Date { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }

        public string? Url { get; set; }
    }
}
