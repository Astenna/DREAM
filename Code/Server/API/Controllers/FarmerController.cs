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
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetFarmersAsync([FromRoute] FarmersQuery query)
        {
            return Ok();
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

        [HttpPost("{farmerId}/farm/production-data")]
        public async Task<IActionResult> PostProductionDataAsync([FromRoute] int farmerId, [FromBody] CreateProductionDataDto createProductionData)
        {
            return Ok();
        }

        [HttpPut("farm/production-data/{productionDataId}")]
        public async Task<IActionResult> PutProductionDataAsync([FromRoute] int productionDataId, [FromBody] EditProductionDataDto editProductionData)
        {
            return Ok();
        }

        [HttpGet("{farmerId}/farm/production-data")]
        public async Task<IActionResult> GetProductionDataAsync([FromRoute] int farmerId, [FromBody] ProductionDataQuery query)
        {
            return Ok();
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
