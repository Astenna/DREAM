using DataAccess.Entities.Farms;

namespace DataAccess.Entities
{
    public class Mandal
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<WeatherForecastResponse>? WeatherForecastResponses { get; set; }
    }
}
