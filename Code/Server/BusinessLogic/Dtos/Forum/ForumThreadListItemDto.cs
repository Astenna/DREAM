namespace BusinessLogic.Dtos.Forum
{
    public class ForumThreadListItemDto
    {
        public int Id { get; set; }

        public string Topic { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedDate { get; set; } 

        public string CreatedByFarmer { get; set; }

        public int CommentsCount { get; set; }

    }
}
