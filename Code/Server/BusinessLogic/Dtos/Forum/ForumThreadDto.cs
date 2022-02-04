namespace BusinessLogic.Dtos.Forum
{
    public class ForumThreadDto
    {
        public int Id { get; set; }

        public string Topic { get; set; }

        public string Description { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string CreatedByFarmer { get; set; }

        public List<ForumCommentDto> Comments { get; set; }
    }
}
