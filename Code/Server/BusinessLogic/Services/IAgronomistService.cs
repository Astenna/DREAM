using BusinessLogic.Dtos;
using BusinessLogic.Dtos.Agronomist;

namespace BusinessLogic.Services
{
    public interface IAgronomistService
    {
        Task DeleteVisitAsync(int visitId);
        Task<AgronomistDto> GetAreaOfResponsibilityAsync(int agronomistId);
        Task<VisitDto> ReplanVisitAsync(int visitId, DateTime newDate);
        Task<List<VisitDto>> SetDailyPlanExecutionStateAsync(List<VisitDto> dailyPlanExecutionState);
        Task<List<MandalDto>> UpdateAreaOfResponsibilityAsync(int agronomistId, List<MandalDto> mandals);
    }
}