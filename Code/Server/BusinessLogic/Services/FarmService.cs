using AutoMapper;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites.Farms;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class FarmService : IFarmService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;

        public FarmService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public async Task<FarmProductionDataDto> AddProductionDataAsync(int farmerId, CreateFarmProductionDto createProductionData)
        {
            var farmer = _httpContext.GetFarmerUsingClaims(_dreamDbContext);
            var domainProductiondata = _mapper.Map<FarmProduction>(createProductionData);

            var productionDataType = await _dreamDbContext.FarmProductionTypes
                .SingleOrDefaultAsync(x => x.Name == createProductionData.ProductionType);
            if(productionDataType is null)
            {
                throw new ApiException($"ProductionType {createProductionData.ProductionType} is not a valid production type!");
            }

            domainProductiondata.ProductionType = productionDataType;
            domainProductiondata.FarmId = farmer.FarmId;

            await _dreamDbContext.FarmProductions.AddAsync(domainProductiondata);
            await _dreamDbContext.SaveChangesAsync();

            return _mapper.Map<FarmProductionDataDto>(domainProductiondata);
        }

        public async Task<FarmProductionDataDto> EditProductionDataAsync(int productionDataId, EditProductionDataDto editProductionDataDto)
        {
            var farmer = _httpContext.GetFarmerUsingClaims(_dreamDbContext);
            var productionDataToEdit = await _dreamDbContext.FarmProductions.SingleOrDefaultAsync(x => x.Id == productionDataId);

            var productionDataType = await _dreamDbContext.FarmProductionTypes
                .SingleOrDefaultAsync(x => x.Name == editProductionDataDto.ProductionType);
            if (productionDataType is null)
            {
                throw new ApiException($"ProductionType {editProductionDataDto.ProductionType} is not a valid production type!");
            }

            productionDataToEdit.Amount = editProductionDataDto.Amount;
            productionDataToEdit.Date = editProductionDataDto.Date;
            productionDataToEdit.ProductionType = productionDataType;

            _dreamDbContext.FarmProductions.Update(productionDataToEdit);
            await _dreamDbContext.SaveChangesAsync();

            return _mapper.Map<FarmProductionDataDto>(productionDataToEdit);
        }

        public async Task<List<FarmProductionDataDto>> GetProductionDataAsync(int farmerId, ProductionDataQuery productionDataQuery)
        {
            var farmer = await _dreamDbContext.Farmers.SingleOrDefaultAsync(x => x.Id == farmerId);
            if (farmer is null)
            {
                throw new ApiException($"Farmer with id {farmerId} not found!");
            }

           var production = _dreamDbContext.FarmProductions
                .Include(x => x.ProductionType)
                .Where(x => x.FarmId == farmer.FarmId);

            return _mapper.Map<List<FarmProductionDataDto>>(production);
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
