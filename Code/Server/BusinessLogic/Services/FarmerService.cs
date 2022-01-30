using AutoMapper;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Actors;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Services
{
    public class FarmerService : IFarmerService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;

        public FarmerService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public async Task<SuggestionDto> GetFarmerSuggestionAsync(int farmerId)
        {
            return new SuggestionDto();
        }

        public List<FarmerNoteDto> GetFarmerNotes(int farmerId)
        {
            var farmerNotes = _dreamDbContext.FarmerNotes
                .Where(x => x.FarmerId == farmerId)
                .OrderByDescending(x => x.Date);
            
            return _mapper.Map<List<FarmerNoteDto>>(farmerNotes);
        }

        public async Task<FarmerNoteDto> AddNoteToFarmerAsync(int farmerId, CreateFarmerNoteDto createNoteDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role != Role.PolicyMaker)
            {
                throw new ApiException("Only users with role PolicyMaker assign notes!", ErrorCode.AuthorizationException);
            }
            var policyMaker = _dreamDbContext.PolicyMakers.Single(x => x.UserId == user.Id);
            
            var domainNote = _mapper.Map<FarmerNote>(createNoteDto);
            domainNote.FarmerId = farmerId;
            domainNote.PolicyMakerId = policyMaker.Id;

            if (!string.IsNullOrEmpty(createNoteDto.ProblemTypeName))
            {
                var domainProblemType = _dreamDbContext.ProblemTypes.SingleOrDefault(x => x.Name == createNoteDto.ProblemTypeName);
                if (domainProblemType is null)
                {
                    throw new ApiException($"Incorrect ProblemtType specified!");
                }
                domainNote.PolicyMaker = policyMaker;
            }

            await _dreamDbContext.FarmerNotes.AddAsync(domainNote);
            await _dreamDbContext.SaveChangesAsync();
            return _mapper.Map<FarmerNoteDto>(domainNote);
        }

        public async Task<List<FarmerDto>> GetFarmersAsync(FarmersQuery farmersQuery)
        {
            return new List<FarmerDto>();
        }

        public async Task<FarmerDto> GetFarmerByIdAsync(int id)
        {
            return new FarmerDto();
        }
    }
}
