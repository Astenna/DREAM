using DataAccess.Entites.Actors;

namespace DataAccess.Entities
{
    public class HelpResponse
    {
        public int Id { get; set; }

        public string? Message { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public int HelpRequestId { get; set; }

        public HelpRequest? HelpRequest { get; set; }

        public Agronomist? CreatedByAgronomist { get; set; }

        public int? CreatedByAgronomistId { get; set; }

        public Farmer? CreatedByFarmer { get; set; }

        public int? CreatedByFarmerId { get; set; }
    }
}
