using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IFarmService
    {
        Task<FarmProductionDataDto> AddProductionDataAsync(int farmId, CreateFarmProductionDto createProductionData);
        Task<FarmProductionDataDto> EditProductionDataAsync(int farmId, EditProductionDataDto editProductionDataDto);
        Task<List<IrrigationSystemDto>> GetIrrigationSystemDataAsync(int farmId, IrrigationSystemQuery irrigationSystemQuery);
        Task<List<FarmProductionDataDto>> GetProductionDataAsync(int farmId, ProductionDataQuery productionDataQuery);
        Task<List<SensorSystemDto>> GetSensorSystemDataAsync(int farmId, SensorSystemQuery sensorSystemQuery);
        Task<List<string>> GetFarmProductionTypes();
    }
}