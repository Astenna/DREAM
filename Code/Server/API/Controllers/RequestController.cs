using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/requests")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost]
        public async Task<IActionResult> PostRequestAsync([FromBody] CreateRequestDto createRequestDto)
        {
            return Ok();
        }

        [HttpPost("response")]
        public async Task<IActionResult> PostResponseAsync([FromRoute] int requestId, [FromBody] CreateResponseDto createResponseDto)
        {
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> PutRequestAsync([FromRoute] int responseId, [FromBody] EditRequestDto editRequestDto)
        {
            return Ok();
        }

        [HttpPost("response/{id}")]
        public async Task<IActionResult> PutResponseAsync([FromRoute] int responseId, [FromBody] EditResponseDto editResponseDto)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequestAsync([FromRoute] int id)
        {
            return Ok();
        }

        [HttpDelete("response/{id}")]
        public async Task<IActionResult> DeleteResponseAsync([FromRoute] int id)
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetRequestsAsync([FromQuery] RequestsQuery requestsQuery)
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestByIdAsync([FromRoute] int id)
        {
            return Ok();
        }
    }
}
