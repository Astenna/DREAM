using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public class SuggestionService : ISuggestionService
    {
        public async Task<List<SuggestionDto>> GetSuggestionsAsync(SuggestionsQuery query)
        {
            return new List<SuggestionDto>();
        }

        public async Task<SuggestionDto> CreateSuggestionAsync(CreateSuggestionDto createSuggestionDto)
        {
            return new SuggestionDto();
        }

        public async Task DeleteSuggestionAsync(int id)
        {
            return;
        }
    }
}
