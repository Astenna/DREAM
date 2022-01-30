using DataAccess.Entites;

namespace BusinessLogic.Dtos.Farmer
{
    public class FarmerNoteDto
    {
        public int Id { get; set; }

        public Note Note { get; set; }

        public string ProblemTypeName { get; set; }

        public DateTime Date { get; set; }

        public int FarmerId { get; set; }

        public string Farmer { get; set; }

        public int PolicyMakerId { get; set; }

        public string PolicyMaker { get; set; }
    }
}
