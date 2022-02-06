using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/problem-type")]
    [Authorize]
    [ApiController]
    public class ProblemTypeController : ControllerBase
    {
        private readonly IProblemTypeService _problemTypeService;

        public ProblemTypeController(IProblemTypeService problemTypeService)
        {
            _problemTypeService = problemTypeService;
        }

        [HttpGet]
        public IActionResult GetProblemTypes()
        {
            return Ok(_problemTypeService.GetProblemTypes());
        }
    }
}
