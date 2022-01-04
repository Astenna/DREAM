using BusinessLogic.Dtos;

namespace BusinessLogic.Services
{
    public class WeatherForecastService : IWeatherForecastService
    {
        public async Task<List<WeatherResponseDto>> GetWeatherForecastAsync(WeatherForecastService query)
        {
            return new List<WeatherResponseDto>();
        }
    }
}
