namespace DataAccess.Entites.Farms
{
    public class SensorSystemResponse
    {
        public int Id { get; set; }

        public float? Humidity { get; set; }

        public DateTime Date { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }

        public string? Url { get; set; }
    }
}
