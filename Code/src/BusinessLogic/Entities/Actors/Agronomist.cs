using DataAccess.Entites.Visists;
using DataAccess.Entities;

namespace DataAccess.Entites.Actors
{
    public class Agronomist
    {
        public List<Mandal>? Mandals { get; set; }

        public List<HelpRequest>? ReceivedHelpRequests { get; set; }

        public List<HelpResponse>? CreatedHelpReponses { get; set; }

        public List<Visit>? Visits { get; set; }
    }
}
