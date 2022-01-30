using AutoMapper;
using BusinessLogic.Dtos.Requests;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites.Actors;
using DataAccess.Entities;
using DataAccess.Entities.Actors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class RequestService : IRequestService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;

        public RequestService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public async Task<List<HelpRequestDto>> GetRequestsAsync(RequestsQuery requestsQuery)
        {
            return new List<HelpRequestDto>();
        }

        public async Task<HelpRequestDto> GetRequestByIdAsync(int id)
        {
            return new HelpRequestDto();
        }

        public async Task<HelpRequestDto> CreateRequestAsync(CreateHelpRequestDto createRequestDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role != Role.Farmer)
            {
                throw new ApiException("Only users with role Farmer can create requests for help!", ErrorCode.AuthorizationException);
            }
            var farmer = _dreamDbContext.Farmers.Include(x => x.Farm).Single(x => x.UserId == user.Id);

            var helpRequest = _mapper.Map<HelpRequest>(createRequestDto);
            helpRequest.CreatedBy = farmer;
            helpRequest.FarmersSent = GetRecipientsFarmers(farmer.Farm.MandalId);
            await _dreamDbContext.AddAsync(helpRequest);
            await _dreamDbContext.SaveChangesAsync();

            //var addedForumThreadDto = _mapper.Map<ForumThreadDto>(helpRequest);
            //return addedForumThreadDto;

            return new HelpRequestDto();
        }

        public async Task<CreateResponseDto> CreateResponseAsync(CreateResponseDto createResponse)
        {
            return new CreateResponseDto();
        }

        public async Task<HelpRequestDto> EditRequestAsync(int id, EditHelpRequestDto editRequestDto)
        {
            return new HelpRequestDto();
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

        private List<Agronomist> GetRecipientsAgronomists()
        {
            throw new NotImplementedException();
        }

        private List<Farmer> GetRecipientsFarmers(int mandalId)
        {
            var farmers = _dreamDbContext.Farmers
                .Include(x => x.Farm)
                .Where(x => x.Farm.MandalId == mandalId)
                .Select(x => x.Id)
                .ToList();
            var farmerNotes = _dreamDbContext.FarmerNotes
                .Where(x => farmers.Contains(x.Id))
                .OrderByDescending(x => x.Date)
                .GroupBy(x => x.FarmerId)
                .ToList();
            return new List<Farmer>();
        }
    }
}
