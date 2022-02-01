using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/suggestion")]
    [Authorize]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly ISuggestionService _suggestionService;

        public SuggestionController(ISuggestionService suggestionService)
        {
            _suggestionService = suggestionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetSuggestionsAsync([FromQuery] SuggestionsQuery query)
        {
            var result = await _suggestionService.GetSuggestionsAsync(query);
            return Ok(result);
        }

        [HttpPost]
        public /*async*/ Task<IActionResult> PostSuggestionAsync([FromBody] CreateSuggestionDto createSuggestionDto)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public /*async*/ Task<IActionResult> DeleteSuggestionAsync([FromRoute] int id)
        {
            throw new NotImplementedException();
        }
    }
}
