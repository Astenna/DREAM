using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/mandals")]
    [ApiController]
    public class MandalController : ControllerBase
    {
        private readonly IMandalService _mandalService;

        public MandalController(IMandalService mandalService)
        {
            _mandalService = mandalService;
        }

        [HttpGet]
        public IActionResult GetMandals()
        {
            return Ok(_mandalService.GetMandals());
        }
    }
}
