using AutoMapper;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;
using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class FarmService : IFarmService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly IMapper _mapper;

        public FarmService(DreamDbContext dreamDbContext, IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _mapper = mapper;
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

        public async Task<List<string>> GetFarmProductionTypes()
        {
            var farmProductionTypes = await _dreamDbContext.FarmProductionTypes
                .Select(x => x.Name)
                .ToListAsync();
            return farmProductionTypes;
        }
    }
}
