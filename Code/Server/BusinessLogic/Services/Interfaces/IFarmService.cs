using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IFarmService
    {
        Task<FarmProductionDataDto> AddProductionDataAsync(CreateFarmProductionDto createProductionData);
        Task<FarmProductionDataDto> EditProductionDataAsync(int productionDataId, EditProductionDataDto editProductionDataDto);
        Task<FarmProductionDataDto> DeleteProductionDataAsync(int productionDataId);
        Task<List<IrrigationSystemDto>> GetIrrigationSystemDataAsync(int farmId, IrrigationSystemQuery irrigationSystemQuery);
        Task<List<FarmProductionDataDto>> GetProductionDataAsync(int farmId, ProductionDataQuery productionDataQuery);
        Task<List<SensorSystemDto>> GetSensorSystemDataAsync(int farmId, SensorSystemQuery sensorSystemQuery);
        Task<List<string>> GetFarmProductionTypes();
    }
}