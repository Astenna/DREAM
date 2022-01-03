using DataAccess.Entites.Actors;

namespace DataAccess.Entities
{
    public class HelpRequest
    {
        public int Id { get; set; }

        public string? Message { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public int CreatedById { get; set; }

        public Farmer? CreatedBy { get; set; }

        public List<Farmer>? FarmersSent { get; set; }

        public List<Agronomist>? AgronomistsSent { get; set; }

        public List<HelpResponse>? HelpResponses { get; set; }
    }
}
