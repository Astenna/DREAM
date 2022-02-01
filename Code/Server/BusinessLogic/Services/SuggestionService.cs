using AutoMapper;
using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using DataAccess;
using DataAccess.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class SuggestionService : ISuggestionService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;

        public SuggestionService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public async Task<List<SuggestionDto>> GetSuggestionsAsync(SuggestionsQuery query)
        {
            var farmer = await _dreamDbContext.Farmers
                .Include(x => x.Farm.Production)
                .SingleOrDefaultAsync(x => x.FarmId == query.FarmerId);

            if (farmer is null)
            {
                throw new ApiException($"Farmer with id {query.FarmerId} does not exist!");
            }

            var farmerProductionTypes = farmer.Farm
                .Production
                .Select(x => x.ProductionTypeId)
                .ToList();

            var filteredSuggestions = await _dreamDbContext.Suggestions
                .Where(x => x.MandalId == farmer.Farm.MandalId)
                .Where(x => x.ProductionTypeId != null && farmerProductionTypes.Contains(x.ProductionTypeId.Value))
                .Select(x => new SuggestionDto { 
                    Id = x.Id,
                    Text= x.Text
                })
                .ToListAsync();

            return filteredSuggestions;
        }

        public /*async*/ Task<SuggestionDto> CreateSuggestionAsync(CreateSuggestionDto createSuggestionDto)
        {
            throw new NotImplementedException();
        }

        public /*async*/ Task DeleteSuggestionAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
