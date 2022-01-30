using AutoMapper;
using BusinessLogic.Dtos.Requests;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites;
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
            var requests = await _dreamDbContext.HelpRequests
                .Include(x => x.CreatedBy.User)
                .ToListAsync();
            return _mapper.Map<List<HelpRequestDto>>(requests);
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
            var farmer = _dreamDbContext.Farmers
                .Include(x => x.Farm)
                .Single(x => x.UserId == user.Id);

            var helpRequest = _mapper.Map<HelpRequest>(createRequestDto);
            helpRequest.CreatedBy = farmer;
            helpRequest.FarmersSent = GetRecipientsFarmers(farmer.Farm.MandalId);

            await _dreamDbContext.AddAsync(helpRequest);
            await _dreamDbContext.SaveChangesAsync();

            var addedHelpRequestDto = _mapper.Map<HelpRequestDto>(helpRequest);
            return addedHelpRequestDto;
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
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmers = _dreamDbContext.Farmers
                .Include(x => x.User)
                .Include(x => x.Notes)
                .Where(x => x.Farm.MandalId == mandalId)
                .ToList();

            // Latest note must be positive
            var farmerNotes = farmers
                .Where(x => x.Notes.Any() &&
                            x.Notes.OrderByDescending(x => x.Date.Ticks)
                                   .First().Note == Note.Positive);

            // Filter to remove author of the request from recipients
            return farmerNotes.Where(x => x.User.Id != user.Id).ToList();
        }
    }
}
