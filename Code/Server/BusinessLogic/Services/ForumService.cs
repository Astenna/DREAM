using AutoMapper;
using BusinessLogic.Dtos.Forum;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entites.Forum;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class ForumService : IForumService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IMapper _mapper;

        public ForumService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _mapper = mapper;
        }

        public async Task<List<ForumThreadListItemDto>> GetForumThreadsAsync(ForumThreadsQuery forumThreadsQuery)
        {
            var forumThread = await _dreamDbContext.ForumThreads
                .Include(x => x.CreatedBy.User)
                .Include(x => x.Comments)
                .ToListAsync();
            var forumThreadDto = _mapper.Map<List<ForumThreadListItemDto>>(forumThread);
            return forumThreadDto;
        }

        public ForumThreadDto GetForumThreadById(int id)
        {
            var forumThread = _dreamDbContext.ForumThreads
                .Include(x => x.CreatedBy.User)
                .Include(x => x.Comments)
                .ThenInclude(x => x.CreatedBy.User)
                .SingleOrDefault(x => x.Id == id);
            
            if (forumThread is null)
            {
                throw new ApiException($"Forum thread with id {id} does not exist!", ErrorCode.NotFound);
            }

            var forumThreadDto = _mapper.Map<ForumThreadDto>(forumThread);
            return forumThreadDto;
        }

        public async Task<ForumThreadDto> CreateForumThreadAsync(CreateForumThreadDto createForumThreadDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmer = _dreamDbContext.Farmers.Single(x => x.UserId == user.Id);

            var forumThread = _mapper.Map<ForumThread>(createForumThreadDto);
            forumThread.CreatedBy = farmer;

            await _dreamDbContext.AddAsync(forumThread);
            await _dreamDbContext.SaveChangesAsync();

            var addedForumThreadDto = _mapper.Map<ForumThreadDto>(forumThread);
            return addedForumThreadDto;
        }

        public async Task<ForumCommentDto> CreateForumCommentAsync(int forumThreadId, CreateForumCommentDto createForumCommentDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmer = _dreamDbContext.Farmers.Single(x => x.UserId == user.Id);

            var forumThread = await _dreamDbContext.ForumThreads.SingleOrDefaultAsync(x => x.Id == forumThreadId);
            if (forumThread is null)
            {
                throw new ApiException($"ForumThread with id {forumThreadId} not found!", ErrorCode.NotFound);
            }

            var forumComment = _mapper.Map<ForumComment>(createForumCommentDto);
            forumComment.CreatedBy = farmer;
            forumComment.ForumThread = forumThread;

            await _dreamDbContext.AddAsync(forumComment);
            await _dreamDbContext.SaveChangesAsync();

            var addedForumCommentDto = _mapper.Map<ForumCommentDto>(forumComment);
            return addedForumCommentDto;
        }

        public async Task DeleteForumCommentAsync(int id)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmerId = _httpContext.User.FindFirst("farmerId").Value;
            var forumThread = _dreamDbContext.ForumComments
                .SingleOrDefault(x => x.Id == id);

            if(forumThread is null)
            {
                throw new ApiException($"ForumThread with id {id} not found!", ErrorCode.NotFound);
            }

            if(!int.TryParse(farmerId, out var parsedFarmerId) || forumThread.CreatedById != parsedFarmerId)
            {
                throw new ApiException($"Comments can be deleted only by its authors!",
                    ErrorCode.AuthorizationException);
            }

            _dreamDbContext.ForumComments.Remove(forumThread);
            await _dreamDbContext.SaveChangesAsync();
        }
    }
}
