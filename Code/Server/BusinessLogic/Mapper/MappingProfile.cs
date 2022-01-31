using AutoMapper;
using BusinessLogic.Dtos.Account;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Dtos.Forum;
using BusinessLogic.Dtos.Requests;
using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;
using DataAccess.Entites.Forum;
using DataAccess.Entities;
using DataAccess.Entities.Farms;

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
                .ForMember(dest => dest.PostalCode, src => src.MapFrom(x => x.FarmPostalCode))
                .ForMember(dest => dest.Mandal, src => src.Ignore());
            CreateMap<RegisterFarmerDto, Farmer>();
            CreateMap<RegisterPolicyMakerDto, PolicyMaker>();
            CreateMap<RegisterPolicyMakerDto, User>();
            CreateMap<RegisterFarmerDto, User>();

            CreateMap<CreateForumThreadDto, ForumThread>();
            CreateMap<CreateForumCommentDto, ForumComment>();
            CreateMap<ForumComment, ForumCommentDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)));
            CreateMap<ForumThread, ForumThreadDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)));

            CreateMap<CreateFarmerNoteDto, FarmerNote>()
                .ForMember(dest => dest.ProblemType, src => src.Ignore());
            CreateMap<FarmerNote, FarmerNoteDto>()
                .ForMember(dest => dest.ProblemTypeName, src => src.MapFrom(x => x.ProblemType.Name))
                .ForMember(dest => dest.Farmer, src => src.MapFrom(x => CombineNameAndSurname(x.Farmer.User)))
                .ForMember(dest => dest.PolicyMaker, src => src.MapFrom(x => CombineNameAndSurname(x.PolicyMaker.User)));

            CreateMap<CreateHelpRequestDto, HelpRequest>();
            CreateMap<HelpRequest, HelpRequestDto>()
                .ForMember(dest => dest.CreatedBy, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)));
            CreateMap<CreateHelpResponseDto, HelpResponse>();
            CreateMap<HelpResponse, HelpResponseDto>()
                .ForMember(dest => dest.CreatedByAgronomist, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedByAgronomist.User)))
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedByFarmer.User)));
        }

        private static string CombineNameAndSurname(User x)
        {
            var name = x?.Name ?? string.Empty;
            var surname = x?.Surname ?? string.Empty;
            return name + " " + surname;
        }
    }
}
