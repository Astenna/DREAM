using DataAccess.Entites;

namespace BusinessLogic.Dtos.Farmer
{
    public class CreateFarmerNoteDto
    {
        public Note Note { get; set; }

        public string ProblemTypeName { get; set; }
    }
}
