using Dream.Models.Actors;
using Dream.Models.DiscussionForum;

namespace Dream.Models
{
    public class Farm
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public List<Production>? Production { get; set; }

        public int? FarmerId { get; set; }

        public Farmer? Farmer { get; set; }

        public SensorSystem? SensorSystem { get; set; }

        public WaterIrrigationSystem? WaterIrrigationSystem { get; set; }

        public List<ForumThread>? ForumThreads { get; set; }

        public List<Visit>? Visits { get; set; }
    }
}
