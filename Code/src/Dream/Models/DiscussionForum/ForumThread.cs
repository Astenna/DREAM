using Dream.Models.Actors;

namespace Dream.Models.DiscussionForum
{
    public class ForumThread
    {
        public int Id { get; set; } 

        public string? Name { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public Farmer? CreatedBy { get; set; }

        public List<Comment>? Comments { get; set; }
    }
}
