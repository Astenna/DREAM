using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface ISuggestionService
    {
        Task<SuggestionDto> CreateSuggestionAsync(CreateSuggestionDto createSuggestionDto);
        Task DeleteSuggestionAsync(int id);
        Task<List<SuggestionDto>> GetSuggestionsAsync(SuggestionsQuery query);
    }
}