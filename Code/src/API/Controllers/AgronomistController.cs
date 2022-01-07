using BusinessLogic.Dtos.Agronomist;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/agronomist")]
    [ApiController]
    public class AgronomistController : ControllerBase
    {
        private readonly IAgronomistService _agronomistService;

        public AgronomistController(IAgronomistService agronomistService)
        {
            _agronomistService = agronomistService;
        }

        [HttpGet("{id}/area-of-responsibility")]
        public async Task<IActionResult> GetAreaOfResponsibilityAsync([FromRoute] int agronomistId)
        {
            return Ok();
        }

        [HttpPut("{id}/area-of-responsibility")]
        public async Task<IActionResult> PutAreaOfResponsibilityAsync([FromRoute] int agronomistId)
        {
            return Ok();
        }

        [HttpPut("{id}/execution-state")]
        public async Task<IActionResult> PutDailyPlanExecutionStateAsync([FromRoute] int agronomistId, List<VisitDto> visits)
        {
            return Ok();
        }

        [HttpGet("{id}/visits")]
        public async Task<IActionResult> GetVisitsAsync([FromRoute] VisitsQuery query)
        {
            return Ok();
        }

        [HttpDelete("{id}/visits/{visitId}")]
        public async Task<IActionResult> DeleteVisitAsync([FromRoute] int agronomistId, [FromRoute] int visitId)
        {
            return Ok();
        }

        [HttpPut("{id}/visits/{visitId}")]
        public async Task<IActionResult> PutVisitAsync([FromRoute] int agronomistId, [FromRoute] int visitId, [FromBody] DateTime newDate)
        {
            return Ok();
        }
    }
}
