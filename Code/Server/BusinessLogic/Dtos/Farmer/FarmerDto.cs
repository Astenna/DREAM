using DataAccess.Entites;

namespace BusinessLogic.Dtos.Farmer
{
    public class FarmerDto
    {
        public int Id { get; set; }

        public string FarmerNameAndSurname { get; set; }

        public string FarmerEmail { get; set; }

        public Note CurrentNote { get; set; }

        public string FarmMandalName { get; set; }

        public int HelpRequestsCount { get; set; }

        public string FarmAddressLine1 { get; set; }

        public string FarmAddressLine2 { get; set; }

        public string FarmCity { get; set; }

        public string FarmPostalCode { get; set; }

    }
}
