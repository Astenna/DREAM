using DataAccess;

namespace BusinessLogic.Services
{
    public class MandalService : IMandalService
    {
        private readonly DreamDbContext _dreamDbContext;

        public MandalService(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public List<string> GetMandals()
        {
            // TODO: can be optimized with some kind of cache
            var mandals = _dreamDbContext.Mandals.Select(x => x.Name).ToList();
            return mandals;
        }
    }
}
