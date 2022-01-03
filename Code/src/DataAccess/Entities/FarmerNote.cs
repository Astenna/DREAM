using DataAccess.Entities;
using DataAccess.Entites;
using DataAccess.Entites.Actors;

namespace DataAccess.Entities
{
    public class FarmerNote
    {
        public int Id { get; set; }

        public Note Note { get; set; }

        public ProblemType ProblemType { get; set; }

        public DateTime Date { get; set; }

        public int FarmerId { get; set; }

        public Farmer Farmer { get; set; }

        public int PolicyMakerId { get; set; }

        public PolicyMaker PolicyMaker { get; set; }
    }
}
