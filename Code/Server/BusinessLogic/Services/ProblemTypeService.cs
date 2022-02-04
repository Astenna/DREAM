using DataAccess;

namespace BusinessLogic.Services
{
    public class ProblemTypeService : IProblemTypeService
    {
        private readonly DreamDbContext _dreamDbContext;

        public ProblemTypeService(DreamDbContext dreamDbContext)
        {
            _dreamDbContext = dreamDbContext;
        }

        public List<string> GetProblemTypes()
        {
            // TODO: can be optimized with some kind of cache
            var mandals = _dreamDbContext.ProblemTypes.Select(x => x.Name).ToList();
            return mandals;
        }
    }
}
