namespace Dream.Models.Actors
{
    public class Farmer : User
    {
        public Note Note { get; set; }

        public Farm? Farm { get; set; }

        public List<HelpRequest>? CreatedHelpRequests { get; set; }

        public List<HelpRequest>? ReceivedHelpRequests { get; set; }

        public List<HelpResponse>? CreatedHelpReponses { get; set; }
    }
}
