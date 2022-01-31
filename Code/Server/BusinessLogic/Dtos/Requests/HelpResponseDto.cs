namespace BusinessLogic.Dtos.Requests
{
    public class HelpResponseDto
    {
        public int Id { get; set; }

        public string Message { get; set; }

        public DateTime CreatedOn { get; set; }

        public int HelpRequestId { get; set; }

        public string CreatedByAgronomist { get; set; }

        public string CreatedByFarmer { get; set; }
    }
}
