using Dream.Models.Actors;

namespace Dream.Models
{
    public class Visit
    {
        public int Id { get; set; }

        public string? Text { get; set; }

        public DateTime PlannedOn { get; set; }

        public bool Confirmed { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }

        public int AgronomistId { get; set; }

        public Agronomist? Agronomist { get; set; }
    }
}
