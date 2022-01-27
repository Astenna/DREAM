using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;
using DataAccess;

namespace BusinessLogic.Services
{
    public class FarmService : IFarmService
    {
        private readonly DreamDbContext _dreamDbContext;

        public FarmService(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public async Task<ProductionDataDto> AddProductionDataAsync(int farmId, CreateProductionDataDto createProductionData)
        {
            return new ProductionDataDto();
        }

        public async Task<ProductionDataDto> EditProductionDataAsync(int farmId, EditProductionDataDto editProductionDataDto)
        {
            return new ProductionDataDto();
        }

        public async Task<List<ProductionDataDto>> GetProductionDataAsync(int farmId, ProductionDataQuery productionDataQuery)
        {
            return new List<ProductionDataDto>();
        }

        public async Task<List<SensorSystemDto>> GetSensorSystemDataAsync(int farmId, SensorSystemQuery sensorSystemQuery)
        {
            return new List<SensorSystemDto>();
        }

        public async Task<List<IrrigationSystemDto>> GetIrrigationSystemDataAsync(int farmId, IrrigationSystemQuery irrigationSystemQuery)
        {
            return new List<IrrigationSystemDto>();
        }
    }
}
