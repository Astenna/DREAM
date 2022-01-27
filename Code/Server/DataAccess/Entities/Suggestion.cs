using DataAccess.Entities.Farms;

namespace DataAccess.Entities
{
    public class Suggestion
    {
        public int Id { get; set; }

        public string? Text { get; set; }

        public int? MandalId { get; set; }

        public Mandal? Mandal { get; set; }

        public int? ProductionTypeId { get; set; }

        public FarmProductionType? ProductionType { get; set; }
    }
}
