using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Dtos.Suggestion;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IFarmerService
    {
        Task<FarmerNoteDto> AddNoteToFarmerAsync(int farmerId, CreateFarmerNoteDto createNoteDto);
        Task<FarmerDto> GetFarmerByIdAsync(int id);
        Task<List<FarmerListItemDto>> GetFarmersAsync(FarmersQuery farmersQuery);
        List<FarmerNoteDto> GetFarmerNotes(int farmerId);
    }
}