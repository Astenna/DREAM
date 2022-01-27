using BusinessLogic.Dtos.Forum;
using BusinessLogic.Queries;

namespace BusinessLogic.Services
{
    public interface IForumService
    {
        Task<ForumCommentDto> CreateForumCommentAsync(ForumCommentDto createForumThreadDto);
        Task<ForumThreadDto> CreateForumThreadAsync(CreateForumThreadDto createForumThreadDto);
        Task DeleteForumCommentAsync(int id);
        Task<ForumThreadDto> GetForumThreadByIdAsync(int id);
        Task<List<ForumThreadDto>> GetForumThreadAsync(ForumThreadsQuery forumThreadsQuery);
    }
}