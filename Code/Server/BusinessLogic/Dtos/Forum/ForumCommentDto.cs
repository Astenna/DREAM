namespace BusinessLogic.Dtos.Forum
{
    public class ForumCommentDto
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime? CreatedDate { get; set; } = DateTime.Now;

        public int CreatedByFarmerId { get; set; }

        public string CreatedByFarmer { get; set; }
    }
}
