using DataAccess.Entites.Actors;

namespace DataAccess.Entites.DiscussionForum
{
    public class ForumComment
    {
        public int Id { get; set; }

        public string? Content { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public Farmer? CreatedBy { get; set; }

        public int? ForumThreadId { get; set; }

        public ForumThread? ForumThread { get; set; }
    }
}
