using DataAccess;
using DataAccess.Entites;
using DataAccess.Entites.Actors;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Tools
{
    public class RequestRecipientsProvider : IRequestRecipientsProvider
    {
        private readonly DreamDbContext _dreamDbContext;

        public RequestRecipientsProvider(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public List<Farmer> GetRecipientsFarmers(int mandalId, int? excludeFarmerId = null)
        {
            var farmers = _dreamDbContext.Farmers
                .Include(x => x.User)
                .Include(x => x.Notes)
                .Where(x => x.Farm.MandalId == mandalId)
                .ToList();

            // Latest note must be positive
            var farmerNotes = farmers
                .Where(x => x.Notes.Any() &&
                            x.Notes.OrderByDescending(x => x.Date.Ticks)
                                   .First().Note == Note.Positive);

            return farmerNotes.Where(x => x.Id != excludeFarmerId).ToList();
        }
    }
}
