using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;

namespace DataAccess.Entites.Visists
{
    public class Visit
    {
        public int Id { get; set; }

        public string? Comment { get; set; }

        public DateTime Date { get; set; }

        public VisitState VisitState { get; set; }

        public VisitReason VisitReason { get; set; }

        public int FarmId { get; set; }

        public Farm? Farm { get; set; }

        public int AgronomistId { get; set; }

        public Agronomist? Agronomist { get; set; }
    }
}
