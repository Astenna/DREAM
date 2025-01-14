﻿using AutoMapper;
using BusinessLogic.Dtos.Account;
using BusinessLogic.Dtos.Farmer;
using BusinessLogic.Dtos.Forum;
using BusinessLogic.Dtos.Requests;
using DataAccess.Entites;
using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;
using DataAccess.Entites.Forum;
using DataAccess.Entities;

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
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)))
                .ForMember(dest => dest.CreatedByFarmerId, src => src.MapFrom(x => x.CreatedById));
            CreateMap<ForumThread, ForumThreadDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)));
            CreateMap<ForumThread, ForumThreadListItemDto>()
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)))
                .ForMember(dest => dest.CommentsCount, src => src.MapFrom(x => x.Comments.Count));

            CreateMap<CreateFarmerNoteDto, FarmerNote>()
                .ForMember(dest => dest.ProblemType, src => src.Ignore())
                .ForMember(dest => dest.Note, src => src.MapFrom(x => GetEnumNoteEnumValue(x.Note)));
            CreateMap<FarmerNote, FarmerNoteDto>()
                .ForMember(dest => dest.ProblemTypeName, src => src.MapFrom(x => x.ProblemType.Name))
                .ForMember(dest => dest.Farmer, src => src.MapFrom(x => CombineNameAndSurname(x.Farmer.User)))
                .ForMember(dest => dest.PolicyMaker, src => src.MapFrom(x => CombineNameAndSurname(x.PolicyMaker.User)));

            CreateMap<CreateHelpRequestDto, HelpRequest>();
            CreateMap<HelpRequest, HelpRequestDto>()
                .ForMember(dest => dest.CreatedBy, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)));
            CreateMap<HelpRequest, HelpRequestListItemDto>()
                .ForMember(dest => dest.CreatedBy, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedBy.User)))
                .ForMember(dest => dest.HelpResponsesCount, src => src.MapFrom(x => x.HelpResponses.Count));
            CreateMap<CreateHelpResponseDto, HelpResponse>();
            CreateMap<HelpResponse, HelpResponseDto>()
                .ForMember(dest => dest.CreatedByAgronomist, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedByAgronomist.User)))
                .ForMember(dest => dest.CreatedByFarmer, src => src.MapFrom(x => CombineNameAndSurname(x.CreatedByFarmer.User)));

            CreateMap<CreateFarmProductionDto, FarmProduction>()
                .ForMember(dest => dest.ProductionType, src => src.Ignore());
            CreateMap<FarmProduction, FarmProductionDataDto>()
                .ForMember(dest => dest.ProductionType, src => src.MapFrom(x => x.ProductionType.Name));


            CreateMap<Farmer, FarmerDto>()
                .ForMember(dest => dest.FarmerEmail, src => src.MapFrom(x => x.User.Email))
                .ForMember(dest => dest.FarmerNameAndSurname, src => src.MapFrom(x => CombineNameAndSurname(x.User)))
                .ForMember(dest => dest.FarmMandalName, src => src.MapFrom(x => x.Farm.Mandal.Name))
                .ForMember(dest => dest.FarmAddressLine1, src => src.MapFrom(x => x.Farm.AddressLine1))
                .ForMember(dest => dest.FarmAddressLine2, src => src.MapFrom(x => x.Farm.AddressLine2))
                .ForMember(dest => dest.FarmCity, src => src.MapFrom(x => x.Farm.City))
                .ForMember(dest => dest.FarmPostalCode, src => src.MapFrom(x => x.Farm.PostalCode))
                .ForMember(dest => dest.HelpRequestsCount, src => src.MapFrom(x => x.CreatedHelpRequests.Count))
                .ForMember(dest => dest.CurrentNote, src => src.Ignore());
        }

        private Note GetEnumNoteEnumValue(string note)
        {
            return Enum.TryParse(note, out Note parsedNote) ? parsedNote : Note.Neutral;
        }

        private static string CombineNameAndSurname(User x)
        {
            var name = x?.Name ?? string.Empty;
            var surname = x?.Surname ?? string.Empty;
            return name + " " + surname;
        }
    }
}
