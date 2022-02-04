using AutoMapper;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites;
using DataAccess.Entities;
using DataAccess.Entities.Actors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class FarmerService : IFarmerService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IRequestRecipientsProvider _requestRecipientsProvider;
        private readonly IMapper _mapper;

        public FarmerService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IRequestRecipientsProvider requestRecipientsProvider,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _requestRecipientsProvider = requestRecipientsProvider;
            _mapper = mapper;
        }


        public List<FarmerNoteDto> GetFarmerNotes(int farmerId)
        {
            var farmerNotes = _dreamDbContext.FarmerNotes
                .Include(x => x.PolicyMaker.User)
                .Include(x => x.Farmer.User)
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

            var farmer = await _dreamDbContext.Farmers
                                .Include(x => x.User)
                                .Include(x => x.Farm)
                                 .SingleOrDefaultAsync(x => x.Id == farmerId);

            if (farmer is null)
            {
                throw new ApiException($"Farmer with id {farmerId} does not exist!");
            }
            domainNote.Farmer = farmer;

            if (domainNote.Note == Note.Negative)
            {
                var automaticHelpRequest = new HelpRequest {
                    Topic = createNoteDto.ProblemTypeName,
                    FarmersSent = _requestRecipientsProvider.GetRecipientsFarmers(farmer.Farm.MandalId, farmerId),
                    IsAutomatic = true,
                    CreatedById = farmerId
                };
                await _dreamDbContext.HelpRequests.AddAsync(automaticHelpRequest);
            }

            await _dreamDbContext.FarmerNotes.AddAsync(domainNote);
            await _dreamDbContext.SaveChangesAsync(); 
            
            // Fill farmer name as user entity is not loaded after add
            var mapped = _mapper.Map<FarmerNoteDto>(domainNote);
            mapped.Farmer = farmer.User.Name + " " + farmer.User.Surname;
            return mapped;
        }

        public async Task<List<ListFarmerDto>> GetFarmersAsync(FarmersQuery farmersQuery)
        {
            var farmers = _dreamDbContext.Farmers
                .Include(x => x.User)
                .Include(x => x.CreatedHelpRequests)
                .Include(x => x.Farm.Mandal)
                .Include(x => x.Notes);

            var result = await farmers.Select(
                x =>
                new ListFarmerDto
                {
                    Id = x.Id,
                    FarmerNameAndSurname = x.User.Name + " " + x.User.Surname,
                    FarmMandalName = x.Farm.Mandal.Name,
                    HelpRequestsCount = x.CreatedHelpRequests.Count,
                    Notes = x.Notes
                }).ToListAsync();

            result.ForEach(x => x.CurrentNote = x.Notes.OrderByDescending(x => x.Date.Ticks)
                                                        .FirstOrDefault()?.Note ?? Note.Neutral);
            return result;
        }

        public async Task<FarmerDto> GetFarmerByIdAsync(int id)
        {
            var farmer = await _dreamDbContext.Farmers
                   .Include(x => x.User)
                   .Include(x => x.CreatedHelpRequests)
                   .Include(x => x.Farm.Mandal)
                   .Include(x => x.Notes)
                   .SingleOrDefaultAsync(x => x.Id == id);

            if (farmer is null)
            {
                throw new ApiException($"Farmer with id {id} not found!");
            }

            var farmerDto = _mapper.Map<FarmerDto>(farmer);
            farmerDto.CurrentNote = farmer.Notes.OrderByDescending(x => x.Date.Ticks)
                                                .FirstOrDefault()?.Note ?? Note.Neutral;

            return farmerDto;
        }
    }
}
