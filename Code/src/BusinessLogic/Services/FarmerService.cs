using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;
namespace BusinessLogic.Services
{
    public class FarmerService : IFarmerService
    {
        public async Task<SuggestionDto> GetFarmerSuggestionAsync(int farmerId)
        {
            return new SuggestionDto();
        }

        public async Task<List<NoteDto>> GetFarmerNotesAsync(int farmerId)
        {
            return new List<NoteDto>();
        }

        public async Task<NoteDto> AddNoteToFarmerAsync(CreateNoteDto createNoteDto)
        {
            return new NoteDto();
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
