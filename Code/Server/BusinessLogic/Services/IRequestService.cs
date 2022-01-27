using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IRequestService
    {
        Task<RequestDto> CreateRequestAsync(CreateRequestDto createRequestDto);
        Task<CreateResponseDto> CreateResponseAsync(CreateResponseDto createResponse);
        Task DeleteRequestAsync(int id);
        Task DeleteResponseAsync(int id);
        Task<RequestDto> EditRequestAsync(int id, EditRequestDto editRequestDto);
        Task<ResponseDto> EditResponseAsync(int id, EditResponseDto editRequestDto);
        Task<RequestDto> GetRequestByIdAsync(int id);
        Task<List<RequestDto>> GetRequestsAsync(RequestsQuery requestsQuery);
    }
}