using AutoMapper;
using BusinessLogic.Dtos.Account;
using BusinessLogic.Dtos.Forum;
using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;
using DataAccess.Entites.Forum;

namespace BusinessLogic.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterFarmerDto, Farm>()
                .ForMember(dest => dest.AddressLine1, src => src.MapFrom(x => x.FarmAddressLine1))
                .ForMember(dest => dest.AddressLine2, src => src.MapFrom(x => x.FarmAddressLine2))
                .ForMember(dest => dest.City, src => src.MapFrom(x => x.FarmCity))
                .ForMember(dest => dest.PostalCode, src => src.MapFrom(x => x.FarmPostalCode));
            CreateMap<RegisterFarmerDto, Farmer>();
            CreateMap<RegisterPolicyMakerDto, PolicyMaker>();
            CreateMap<RegisterPolicyMakerDto, User>();
            CreateMap<RegisterFarmerDto, User>();

            CreateMap<CreateForumThreadDto, ForumThread>();
            CreateMap<CreateForumCommentDto, ForumComment>();
            CreateMap<ForumComment, ForumCommentDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy)));
            CreateMap<ForumThread, ForumThreadDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy)));
        }

        private string CombineNameAndSurname(Farmer x)
        {
            var name = x?.User?.Name ?? string.Empty;
            var surname = x?.User?.Surname ?? string.Empty;
            return name + " " + surname;
        }
    }
}
