using BusinessLogic.Dtos.Forum;
using BusinessLogic.Queries;
using DataAccess;

namespace BusinessLogic.Services
{
    public class ForumService : IForumService
    {
        private readonly DreamDbContext _dreamDbContext;

        public ForumService(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public async Task<List<ForumThreadDto>> GetForumThreadsAsync(ForumThreadsQuery forumThreadsQuery)
        {
            return new List<ForumThreadDto>();
        }

        public async Task<ForumThreadDto> GetForumThreadByIdAsync(int id)
        {
            return new ForumThreadDto();
        }

        public async Task<ForumThreadDto> CreateForumThreadAsync(CreateForumThreadDto createForumThreadDto)
        {
            return new ForumThreadDto();
        }

        public async Task<ForumCommentDto> CreateForumCommentAsync(ForumCommentDto createForumThreadDto)
        {
            return new ForumCommentDto();
        }

        public async Task DeleteForumCommentAsync(int id)
        {
            return;
        }
    }
}
