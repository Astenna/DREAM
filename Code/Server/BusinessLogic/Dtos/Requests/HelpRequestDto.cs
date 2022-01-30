namespace BusinessLogic.Dtos.Requests
{
    public class HelpRequestDto
    {
        public int Id { get; set; }

        public string Message { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public string CreatedBy { get; set; }
    }
}
