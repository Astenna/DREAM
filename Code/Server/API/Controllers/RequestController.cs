using BusinessLogic.Dtos.Requests;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/requests")]
    [Authorize]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }

        [HttpPost]
        public async Task<IActionResult> PostRequestAsync([FromBody] CreateHelpRequestDto createRequestDto)
        {
            var result = await _requestService.CreateRequestAsync(createRequestDto);
            return Ok(result);
        }

        [HttpPost("{requestId}/response")]
        public async Task<IActionResult> PostResponseAsync([FromRoute] int requestId, [FromBody] CreateHelpResponseDto createResponseDto)
        {
            var result = await _requestService.CreateResponseAsync(requestId, createResponseDto);
            return Ok(result);
        }

        [HttpPut("{requestId}")]
        public async Task<IActionResult> PutRequestAsync([FromRoute] int requestId, [FromBody] EditHelpRequestDto editRequestDto)
        {
            var result = await _requestService.EditRequestAsync(requestId, editRequestDto);
            return Ok(result);
        }

        [HttpPut("response/{responseId}")]
        public async Task<IActionResult> PutResponseAsync([FromRoute] int responseId, [FromBody] EditResponseDto editResponseDto)
        {
            var result = await _requestService.EditResponseAsync(responseId, editResponseDto);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequestAsync([FromRoute] int id)
        {
            await _requestService.DeleteRequestAsync(id);
            return Ok();
        }

        [HttpDelete("response/{id}")]
        public async Task<IActionResult> DeleteResponseAsync([FromRoute] int id)
        {
            await _requestService.DeleteResponseAsync(id);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetRequestsAsync([FromQuery] RequestsQuery requestsQuery)
        {
            var result = await _requestService.GetRequestsAsync(requestsQuery);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestByIdAsync([FromRoute] int id)
        {
            var result = await _requestService.GetRequestByIdAsync(id);
            return Ok(result);
        }
    }
}
