using DataAccess.Entites.Farms;
using DataAccess.Entities;

namespace DataAccess.Entites.Actors
{
    public class Farmer
    {
        public int Id { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }

        public int? FarmId { get; set; }

        public Farm Farm { get; set; }

        public List<FarmerNote> Notes { get; set; }

        public List<HelpRequest> CreatedHelpRequests { get; set; }

        public List<HelpRequest> ReceivedHelpRequests { get; set; }

        public List<HelpResponse> CreatedHelpReponses { get; set; }
    }
}
