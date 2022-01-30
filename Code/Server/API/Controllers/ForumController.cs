using BusinessLogic.Dtos.Forum;
using BusinessLogic.Queries;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/forum")]
    [Authorize]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IForumService _forumService;

        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }

        [HttpPost("thread")]
        public async Task<IActionResult> PostForumThreadAsync([FromBody] CreateForumThreadDto createRequestDto)
        {
            var result = await _forumService.CreateForumThreadAsync(createRequestDto);
            return Ok(result);
        }

        [HttpPost("thread/{forumThreadId}/comment/")]
        public async Task<IActionResult> PostForumCommentAsync([FromRoute] int forumThreadId, [FromBody] CreateForumCommentDto createForumCommentDto)
        {
            var result = await _forumService.CreateForumCommentAsync(forumThreadId, createForumCommentDto);
            return Ok(result);
        }


        [HttpDelete("thread/comment/{commentId}")]
        public async Task<IActionResult> DeleteForumCommentAsync([FromRoute] int commentId)
        {
            await _forumService.DeleteForumCommentAsync(commentId);
            return Ok();
        }

        [HttpGet("thread")]
        public async Task<IActionResult> GetForumThreadsAsync([FromQuery] ForumThreadsQuery requestsQuery)
        {
            var result = await _forumService.GetForumThreadsAsync(requestsQuery);
            return Ok(result);
        }

        [HttpGet("thread/{id}")]
        public  IActionResult GetForumThreadById([FromRoute] int id)
        {
            var result = _forumService.GetForumThreadById(id);
            return Ok(result);
        }
    }
}
