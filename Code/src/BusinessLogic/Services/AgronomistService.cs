using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Agronomist;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public class AgronomistService : IAgronomistService
    {
        public async Task<AgronomistDto> GetAreaOfResponsibilityAsync(int agronomistId)
        {
            return new AgronomistDto();
        }

        public async Task<List<MandalDto>> UpdateAreaOfResponsibilityAsync(int agronomistId, List<MandalDto> mandals)
        {
            return new List<MandalDto>();
        }

        public async Task<List<VisitDto>> SetDailyPlanExecutionStateAsync(List<VisitDto> dailyPlanExecutionState)
        {
            return new List<VisitDto>();
        }

        public async Task<List<VisitDto>> GetVisitsAsync(VisitsQuery visitsQuery)
        {
            return new List<VisitDto>();
        }

        public async Task<VisitDto> CreateVisitAsync(CreateVisitDto createVisitDto)
        {
            return new VisitDto();
        }

        public async Task DeleteVisitAsync(int visitId)
        {
            return;
        }

        public async Task<VisitDto> ReplanVisitAsync(int visitId, DateTime newDate)
        {
            return new VisitDto();
        }
    }
}
