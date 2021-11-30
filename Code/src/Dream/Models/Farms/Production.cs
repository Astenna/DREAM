namespace Dream.Models
{
    public class Production
    {
        public int Id { get; set; }

        public float Amount { get; set; }

        public int Month { get; set; }

        public int Year { get; set; }

        public int ProductionTypeId { get; set; }

        public ProductionType? ProductionType { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }
    }
}
