namespace Dream.Models
{
    public class ExternalSystem
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }

        public string? Url { get; set; }
    }
}
