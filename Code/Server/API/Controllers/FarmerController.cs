using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/farmer")]
    [ApiController]
    [Authorize]
    public class FarmerController : ControllerBase
    {
        private readonly IFarmService _farmService;
        private readonly IFarmerService _farmerService;

        public FarmerController(IFarmService farmService, IFarmerService farmerService)
        {
            _farmService = farmService;
            _farmerService = farmerService;
        }

        [HttpGet("{farmerId}")]
        public async Task<IActionResult> GetFarmerByIdAsync([FromRoute] int farmerId)
        {
            var result = await _farmerService.GetFarmerByIdAsync(farmerId);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetFarmersAsync([FromRoute] FarmersQuery query)
        {
            var result = await _farmerService.GetFarmersAsync(query);
            return Ok(result);
        }

        [HttpPost("{farmerId}/note")]
        public async Task<IActionResult> PostFarmerNoteAsync([FromRoute] int farmerId, CreateFarmerNoteDto createNoteDto)
        {
            var result = await _farmerService.AddNoteToFarmerAsync(farmerId, createNoteDto);
            return Ok(result);
        }

        [HttpGet("{farmerId}/note")]
        public IActionResult GetFarmerNotes([FromRoute] int farmerId)
        {
            var result = _farmerService.GetFarmerNotes(farmerId);
            return Ok(result);
        }

        [HttpPost("farm/production-data")]
        public async Task<IActionResult> PostProductionDataAsync([FromBody] CreateFarmProductionDto createProductionData)
        {
            var result = await _farmService.AddProductionDataAsync(createProductionData);
            return Ok(result);
        }

        [HttpPut("farm/production-data/{productionDataId}")]
        public async Task<IActionResult> PutProductionDataAsync([FromRoute] int productionDataId, [FromBody] EditProductionDataDto editProductionData)
        {
            var result = await _farmService.EditProductionDataAsync(productionDataId, editProductionData);
            return Ok(result);
        }

        [HttpGet("{farmerId}/farm/production-data")]
        public async Task<IActionResult> GetProductionDataAsync([FromRoute] int farmerId, [FromQuery] ProductionDataQuery query)
        {
            var result = await _farmService.GetProductionDataAsync(farmerId, query);
            return Ok(result);
        }

        [HttpGet("farm/production-data/production-types")]
        public async Task<IActionResult> GetFarmProductionTypesAsync()
        {
            var result = await _farmService.GetFarmProductionTypes();
            return Ok(result);
        }

        [HttpGet("{farmerId}/farm/sensor-system")]
        public async Task<IActionResult> GetSensorSystemDataAsync([FromRoute] int farmerId, [FromBody] SensorSystemQuery query)
        {
            return Ok();
        }

        [HttpGet("{farmerId}/farm/irrigation-system")]
        public async Task<IActionResult> GetIrrigatoinSystemionDataAsync([FromRoute] int farmerId, [FromBody] IrrigationSystemQuery query)
        {
            return Ok();
        }
    }
}
