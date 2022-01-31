using DataAccess.Entites.Actors;

namespace BusinessLogic.Tools
{
    public interface IRequestRecipientsProvider
    {
        List<Farmer> GetRecipientsFarmers(int mandalId, int? excludeUserId = null);
    }
}