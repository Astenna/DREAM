using DataAccess.Entites.Farms;
using DataAccess.Entities;

namespace DataAccess.Entites.Actors
{
    public class Farmer : User
    {
        public Farm? Farm { get; set; }

        public List<FarmerNote>? Note { get; set; }

        public List<HelpRequest>? CreatedHelpRequests { get; set; }

        public List<HelpRequest>? ReceivedHelpRequests { get; set; }

        public List<HelpResponse>? CreatedHelpReponses { get; set; }
    }
}
