using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IFarmService
    {
        Task<ProductionDataDto> AddProductionDataAsync(int farmId, CreateProductionDataDto createProductionData);
        Task<ProductionDataDto> EditProductionDataAsync(int farmId, EditProductionDataDto editProductionDataDto);
        Task<List<IrrigationSystemDto>> GetIrrigationSystemDataAsync(int farmId, IrrigationSystemQuery irrigationSystemQuery);
        Task<List<ProductionDataDto>> GetProductionDataAsync(int farmId, ProductionDataQuery productionDataQuery);
        Task<List<SensorSystemDto>> GetSensorSystemDataAsync(int farmId, SensorSystemQuery sensorSystemQuery);
    }
}