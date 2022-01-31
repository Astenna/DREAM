namespace BusinessLogic.Dtos.Requests
{
    public class HelpRequestDto
    {
        public int Id { get; set; }

        public string Topic { get; set; }

        public string Description { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public string CreatedBy { get; set; }

        public List<HelpResponseDto> HelpResponses { get; set; }
    }
}
