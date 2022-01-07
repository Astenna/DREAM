using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IFarmerService
    {
        Task<NoteDto> AddNoteToFarmerAsync(CreateNoteDto createNoteDto);
        Task<FarmerDto> GetFarmerByIdAsync(int id);
        Task<List<FarmerDto>> GetFarmersAsync(FarmersQuery farmersQuery);
        Task<List<NoteDto>> GetFarmerNotesAsync(int farmerId);
        Task<SuggestionDto> GetFarmerSuggestionAsync(int farmerId);
    }
}