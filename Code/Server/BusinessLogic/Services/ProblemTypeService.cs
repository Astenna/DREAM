using AutoMapper;
using DataAccess;

namespace BusinessLogic.Services
{
    public class ProblemTypeService : IProblemTypeService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly IMapper _mapper;

        public ProblemTypeService(DreamDbContext dreamDbContext,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _mapper = mapper;
        }

        public List<string> GetProblemTypes()
        {
            // TODO: can be optimized with some kind of cache
            var mandals = _dreamDbContext.ProblemTypes.Select(x => x.Name).ToList();
            return mandals;
        }
    }
}
