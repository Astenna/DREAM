using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;
using DataAccess;

namespace BusinessLogic.Services
{
    public class RequestService : IRequestService
    {
        private readonly DreamDbContext _dreamDbContext;

        public RequestService(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public async Task<List<RequestDto>> GetRequestsAsync(RequestsQuery requestsQuery)
        {
            return new List<RequestDto>();
        }

        public async Task<RequestDto> GetRequestByIdAsync(int id)
        {
            return new RequestDto();
        }

        public async Task<RequestDto> CreateRequestAsync(CreateRequestDto createRequestDto)
        {
            return new RequestDto();
        }

        public async Task<CreateResponseDto> CreateResponseAsync(CreateResponseDto createResponse)
        {
            return new CreateResponseDto();
        }

        public async Task<RequestDto> EditRequestAsync(int id, EditRequestDto editRequestDto)
        {
            return new RequestDto();
        }

        public async Task<ResponseDto> EditResponseAsync(int id, EditResponseDto editRequestDto)
        {
            return new ResponseDto();
        }

        public async Task DeleteRequestAsync(int id)
        {
            return;
        }

        public async Task DeleteResponseAsync(int id)
        {
            return;
        }

        private List<int> GetRecipientsAgronomists()
        {
            return new List<int>();
        }

        private List<int> GetRecipientsFarmers()
        {
            return new List<int>();
        }
    }
}
