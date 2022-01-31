using DataAccess.Entities;

namespace BusinessLogic.Queries
{
    public interface IRequestsQueryBuilder
    {
        IQueryable<HelpRequest> AsQueryable();
        IRequestsQueryBuilder SearchByCreatedById(int? createdById);
        IRequestsQueryBuilder SearchByRecipientId(int? recipientUserId);
        IRequestsQueryBuilder SearchByTopic(string topic);
        IRequestsQueryBuilder With(IQueryable<HelpRequest> query);
    }
}