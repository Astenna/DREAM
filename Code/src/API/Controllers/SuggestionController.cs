using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/suggestion")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetSuggestionsAsync([FromBody] SuggestionsQuery query)
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> PostSuggestionAsync([FromBody] CreateSuggestionDto createSuggestionDto)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSuggestionAsync([FromRoute] int id)
        {
            return Ok();
        }
    }
}
