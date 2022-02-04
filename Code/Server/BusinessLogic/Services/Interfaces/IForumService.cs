using BusinessLogic.Dtos.Forum;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IForumService
    {
        Task<ForumCommentDto> CreateForumCommentAsync(int forumThreadId, CreateForumCommentDto createForumCommentDto);
        Task<ForumThreadDto> CreateForumThreadAsync(CreateForumThreadDto createForumThreadDto);
        Task DeleteForumCommentAsync(int id);
        ForumThreadDto GetForumThreadById(int id);
        Task<List<ForumThreadListItemDto>> GetForumThreadsAsync(ForumThreadsQuery forumThreadsQuery);
    }
}