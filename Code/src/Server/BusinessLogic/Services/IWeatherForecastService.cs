using BusinessLogic.Dtos;

namespace BusinessLogic.Services
{
    public interface IWeatherForecastService
    {
        Task<List<WeatherResponseDto>> GetWeatherForecastAsync(WeatherForecastService query);
    }
}