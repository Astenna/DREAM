using AutoMapper;
using BusinessLogic.Dtos.Account;
using DataAccess.Entites.Actors;
using DataAccess.Entites.Farms;

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
            CreateMap<RegisterFarmerDto, User>();
        }
    }
}
