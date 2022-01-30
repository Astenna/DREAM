using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IRequestService
    {
        Task<HelpRequestDto> CreateRequestAsync(CreateHelpRequestDto createRequestDto);
        Task<CreateResponseDto> CreateResponseAsync(CreateResponseDto createResponse);
        Task DeleteRequestAsync(int id);
        Task DeleteResponseAsync(int id);
        Task<HelpRequestDto> EditRequestAsync(int id, EditHelpRequestDto editRequestDto);
        Task<ResponseDto> EditResponseAsync(int id, EditResponseDto editRequestDto);
        Task<HelpRequestDto> GetRequestByIdAsync(int id);
        Task<List<HelpRequestDto>> GetRequestsAsync(RequestsQuery requestsQuery);
    }
}