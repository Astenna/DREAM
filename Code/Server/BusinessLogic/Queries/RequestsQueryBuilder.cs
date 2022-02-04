using DataAccess.Entities;

namespace BusinessLogic.Queries
{
    public class RequestsQueryBuilder : IRequestsQueryBuilder
    {
        private IQueryable<HelpRequest> _requestsQuery;

        public IRequestsQueryBuilder With(IQueryable<HelpRequest> query)
        {
            _requestsQuery = query;
            return this;
        }

        public IQueryable<HelpRequest> AsQueryable()
        {
            return _requestsQuery;
        }

        public IRequestsQueryBuilder SearchByTopic(string topic)
        {
            if (!string.IsNullOrEmpty(topic))
            {
                _requestsQuery = _requestsQuery.Where(x => x.Topic.ToLower().Contains(topic.ToLower()));
            }
            return this;
        }

        public IRequestsQueryBuilder SearchByRecipientId(int? recipientUserId)
        {
            if (recipientUserId.HasValue)
            {
                _requestsQuery = _requestsQuery
                    .Where(x => x.FarmersSent.Select(x => x.Id).Contains(recipientUserId.Value)
                                || x.AgronomistsSent.Select(x => x.Id).Contains(recipientUserId.Value));
            }

            return this;
        }

        public IRequestsQueryBuilder SearchByCreatedById(int? createdById)
        {
            if (createdById.HasValue)
            {
                _requestsQuery = _requestsQuery
                    .Where(x => x.CreatedById == createdById.Value);
            }

            return this;
        }
    }
}
