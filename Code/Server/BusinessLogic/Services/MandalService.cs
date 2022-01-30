using AutoMapper;
using DataAccess;

namespace BusinessLogic.Services
{
    public class MandalService : IMandalService
    {
        private readonly DreamDbContext _dreamDbContext;
        private readonly IMapper _mapper;

        public MandalService(DreamDbContext dreamDbContext,
            IMapper mapper)
        {
            _dreamDbContext = dreamDbContext;
            _mapper = mapper;
        }

        public List<string> GetMandals()
        {
            // TODO: can be optimized with some kind of cache
            var mandals = _dreamDbContext.Mandals.Select(x => x.Name).ToList();
            return mandals;
        }
    }
}
