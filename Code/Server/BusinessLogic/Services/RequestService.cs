using AutoMapper;
using BusinessLogic.Dtos.Requests;
using BusinessLogic.Exceptions;
using BusinessLogic.Queries;
using BusinessLogic.Tools;
using DataAccess;
using DataAccess.Entities;
using DataAccess.Entities.Actors;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Services
{
    public class RequestService : IRequestService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly HttpContext _httpContext;
        private readonly IRequestsQueryBuilder _requestsQueryBuilder;
        private readonly IRequestRecipientsProvider _requestRecipientsProvider;
        private readonly IMapper _mapper;

        public RequestService(DreamDbContext dreamDbContext,
            IHttpContextAccessor httpContextAccessor,
            IRequestsQueryBuilder requestsQueryBuilder,
            IRequestRecipientsProvider requestRecipientsProvider,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _httpContext = httpContextAccessor.HttpContext;
            _requestsQueryBuilder = requestsQueryBuilder;
            _requestRecipientsProvider = requestRecipientsProvider;
            _mapper = mapper;
        }

        public async Task<List<HelpRequestListItemDto>> GetRequestsAsync(RequestsQuery requestsQuery)
        {
            var requests = _dreamDbContext.HelpRequests
                .Include(x => x.CreatedBy.User)
                .Include(x => x.FarmersSent)
                .ThenInclude(x => x.User)
                .Include(x => x.AgronomistsSent)
                .ThenInclude(x => x.User)
                .Include(x => x.HelpResponses);
            var results = await _requestsQueryBuilder
                .With(requests)
                .SearchByTopic(requestsQuery.Topic)
                .SearchByRecipientId(requestsQuery.RecipientUserId)
                .SearchByCreatedById(requestsQuery.RequestCreatedById)
                .AsQueryable()
                .ToListAsync();

            return _mapper.Map<List<HelpRequestListItemDto>>(results);
        }

        public async Task<HelpRequestDto> GetRequestByIdAsync(int id)
        {
            var request = await _dreamDbContext.HelpRequests
                .Include(x => x.HelpResponses)
                .ThenInclude(x => x.CreatedByFarmer.User)
                .Include(x => x.HelpResponses)
                .ThenInclude(x => x.CreatedByAgronomist.User)
                .Include(x => x.CreatedBy.User)
                .SingleOrDefaultAsync(x => x.Id == id);

            if (request is null)
            {
                throw new ApiException($"Request with id {id} does not exist!", ErrorCode.NotFound);
            }

            return _mapper.Map<HelpRequestDto>(request);
        }

        public async Task<HelpRequestDto> CreateRequestAsync(CreateHelpRequestDto createRequestDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role != Role.Farmer)
            {
                throw new ApiException("Only users with role Farmer can create requests for help!", ErrorCode.AuthorizationException);
            }
            var farmer = _dreamDbContext.Farmers
                .Include(x => x.Farm)
                .Single(x => x.UserId == user.Id);

            var helpRequest = _mapper.Map<HelpRequest>(createRequestDto);
            helpRequest.CreatedBy = farmer;
            helpRequest.FarmersSent = _requestRecipientsProvider.GetRecipientsFarmers(farmer.Farm.MandalId, farmer.Id);

            await _dreamDbContext.AddAsync(helpRequest);
            await _dreamDbContext.SaveChangesAsync();

            var addedHelpRequestDto = _mapper.Map<HelpRequestDto>(helpRequest);
            return addedHelpRequestDto;
        }

        public async Task<HelpResponseDto> CreateResponseAsync(int requestId, CreateHelpResponseDto createResponse)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role == Role.PolicyMaker)
            {
                throw new ApiException("Only users with role Farmer or Agronomist can create responses!", ErrorCode.AuthorizationException);
            }

            var request = await _dreamDbContext.HelpRequests.SingleOrDefaultAsync(x => x.Id == requestId);
            if (request is null)
            {
                throw new ApiException($"Request with id {requestId} does not exist!", ErrorCode.NotFound);
            }

            var domainHelpResponse = _mapper.Map<HelpResponse>(createResponse);
            domainHelpResponse.HelpRequest = request;
            if (user.Role == Role.Farmer)
            {
                var farmer = _dreamDbContext.Farmers
                    .Single(x => x.UserId == user.Id);
                domainHelpResponse.CreatedByFarmer = farmer;
            }
            else
            {
                var agronomist = _dreamDbContext.Agronomists
                    .Single(x => x.UserId == user.Id);
                domainHelpResponse.CreatedByAgronomist = agronomist;
            }

            await _dreamDbContext.AddAsync(domainHelpResponse);
            await _dreamDbContext.SaveChangesAsync();

            var addedHelpResponseDto = _mapper.Map<HelpResponseDto>(domainHelpResponse);
            return addedHelpResponseDto;
        }

        public async Task<HelpRequestDto> EditRequestAsync(int requestId, EditHelpRequestDto editRequestDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role != Role.Farmer)
            {
                throw new ApiException("Only users with role Farmer can edit and create requests!", ErrorCode.AuthorizationException);
            }

            var request = await _dreamDbContext.HelpRequests.SingleOrDefaultAsync(x => x.Id == requestId);
            if (request is null)
            {
                throw new ApiException($"Request with id {requestId} does not exist!", ErrorCode.NotFound);
            }

            var farmer = _dreamDbContext.Farmers
                .Single(x => x.UserId == user.Id);
            if (farmer.Id != request.CreatedById)
            {
                throw new ApiException("Response can be only modified by its author!", ErrorCode.AuthorizationException);
            }

            request.Topic = editRequestDto.Topic;
            request.Description = editRequestDto.Description;
            _dreamDbContext.Update(request);
            await _dreamDbContext.SaveChangesAsync();

            var editedHelpRequestDto = _mapper.Map<HelpRequestDto>(request);
            return editedHelpRequestDto;
        }

        public async Task<HelpResponseDto> EditResponseAsync(int responseId, EditResponseDto editRequestDto)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            if (user.Role == Role.PolicyMaker)
            {
                throw new ApiException("Only users with role Farmer or Agronomist can edit and create responses!", ErrorCode.AuthorizationException);
            }

            var response = await _dreamDbContext.HelpResponses.SingleOrDefaultAsync(x => x.Id == responseId);
            if (response is null)
            {
                throw new ApiException($"Reponse with id {responseId} does not exist!", ErrorCode.NotFound);
            }

            if (user.Role == Role.Farmer)
            {
                var farmer = _dreamDbContext.Farmers
                    .Single(x => x.UserId == user.Id);
                if (farmer.Id != response.CreatedByFarmerId)
                {
                    throw new ApiException("Response can be only modified by its author!", ErrorCode.AuthorizationException);
                }
            }
            else
            {
                var agronomist = _dreamDbContext.Agronomists
                    .Single(x => x.UserId == user.Id);
                if (agronomist.Id != response.CreatedByAgronomistId)
                {
                    throw new ApiException("Response can be only modified by its author!", ErrorCode.AuthorizationException);
                }
            }

            response.Message = editRequestDto.Message;
            _dreamDbContext.Update(response);
            await _dreamDbContext.SaveChangesAsync();

            var editedHelpResponseDto = _mapper.Map<HelpResponseDto>(response);
            return editedHelpResponseDto;
        }

        public async Task DeleteRequestAsync(int id)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmer = _dreamDbContext.Farmers.Single(x => x.UserId == user.Id);
            var requestToDelete = await _dreamDbContext.HelpRequests
                                            .SingleOrDefaultAsync(x => x.Id == id);

            if (requestToDelete is null)
            {
                throw new ApiException($"Request with id {id} not found!", ErrorCode.NotFound);
            }

            if (requestToDelete.CreatedById != farmer.Id)
            {
                throw new ApiException($"Only the author of the request can delete the request!", ErrorCode.AuthorizationException);
            }

            _dreamDbContext.Remove(requestToDelete);
            await _dreamDbContext.SaveChangesAsync();
            return;
        }

        public async Task DeleteResponseAsync(int id)
        {
            var user = _httpContext.GetUserUsingClaims(_dreamDbContext);
            var farmer = _dreamDbContext.Farmers.Single(x => x.UserId == user.Id);
            var responseToDelete = await _dreamDbContext.HelpResponses
                                            .SingleOrDefaultAsync(x => x.Id == id);

            if (responseToDelete is null)
            {
                throw new ApiException($"Request with id {id} not found!", ErrorCode.NotFound);
            }

            if (responseToDelete.CreatedByFarmerId != farmer.Id)
            {
                throw new ApiException($"Only the author of the request reponse can delete the response!", ErrorCode.AuthorizationException);
            }

            _dreamDbContext.Remove(responseToDelete);
            await _dreamDbContext.SaveChangesAsync();
            return;
        }
    }
}
