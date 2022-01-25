using BusinessLogic.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/weather-forecast")]
    [ApiController]
    public class WeatherForecastController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> GetWeatherForecastAsync([FromBody] WeatherForecastQuery query)
        {
            return Ok();
        }
    }
}
