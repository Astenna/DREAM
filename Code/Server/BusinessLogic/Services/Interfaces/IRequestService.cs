using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IRequestService
    {
        Task<HelpRequestDto> CreateRequestAsync(CreateHelpRequestDto createRequestDto);
        Task<HelpResponseDto> CreateResponseAsync(int requestId, CreateHelpResponseDto createResponse);
        Task DeleteRequestAsync(int id);
        Task DeleteResponseAsync(int id);
        Task<HelpRequestDto> EditRequestAsync(int id, EditHelpRequestDto editRequestDto);
        Task<HelpResponseDto> EditResponseAsync(int id, EditResponseDto editRequestDto);
        Task<HelpRequestDto> GetRequestByIdAsync(int id);
        Task<List<HelpRequestListItemDto>> GetRequestsAsync(RequestsQuery requestsQuery);
    }
}