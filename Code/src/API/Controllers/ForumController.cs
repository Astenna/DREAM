using BusinessLogic.Dtos.Forum;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/forum")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IForumService _forumService;

        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpPost]
        public async Task<IActionResult> PostForumThreadAsync([FromBody] CreateForumThreadDto createRequestDto)
        {
            return Ok();
        }

        [HttpPost("{id}/comment")]
        public async Task<IActionResult> PostForumCommentAsync([FromRoute] int forumThreadId, [FromBody] CreateForumCommentDto createForumCommentDto)
        {
            return Ok();
        }


        [HttpDelete("comment/{id}")]
        public async Task<IActionResult> DeleteForumCommentAsync([FromRoute] int commentId)
        {
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetForumThreadsAsync([FromQuery] ForumThreadsQuery requestsQuery)
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetForumThreadByIdAsync([FromRoute] int id)
        {
            return Ok();
        }
    }
}
