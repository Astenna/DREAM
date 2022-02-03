using DataAccess.Entites;
using DataAccess.Entities;
using System.Text.Json.Serialization;

namespace BusinessLogic.Dtos.Farmer
{
    public class ListFarmerDto
    {
        public int Id { get; set; }

        public string FarmerNameAndSurname { get; set; }

        public Note CurrentNote { get; set; }

        [JsonIgnore]
        public List<FarmerNote> Notes { get; set; }

        public string FarmMandalName { get; set; }

        public int HelpRequestsCount { get; set; }
    }
}
