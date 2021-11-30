using Dream.Models.Actors;

namespace Dream.Models.DiscussionForum
{
    public class Comment
    {
        public int Id { get; set; }

        public string? Content { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public Farmer? CreatedBy { get; set; }

        public int? ForumThreadId { get; set; }

        public ForumThread? ForumThread { get; set; }
    }
}
