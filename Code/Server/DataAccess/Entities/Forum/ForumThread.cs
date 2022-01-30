using DataAccess.Entites.Actors;

namespace DataAccess.Entites.Forum
{
    public class ForumThread
    {
        public int Id { get; set; }

        public string Topic { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.UtcNow;

        public int CreatedById { get; set; }

        public Farmer CreatedBy { get; set; }

        public List<ForumComment> Comments { get; set; }
    }
}
