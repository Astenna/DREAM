using FluentValidation;

namespace BusinessLogic.Dtos.Account
{
    public class RegisterFarmerDto : RegisterDto
    {
        public string FarmName { get; set; }

        public string FarmAddressLine1 { get; set; }

        public string FarmAddressLine2 { get; set; }

        public string FarmCity { get; set; }

        public string FarmPostalCode { get; set; }

        public string Mandal { get; set; }

        public int WaterIrrigationSystemId { get; set; }

        public int SensorSystemId { get; set; }
    }

    public class RegisterFarmerDtoValidator : AbstractValidator<RegisterFarmerDto>
    {
        public RegisterFarmerDtoValidator()
        {
            Include(new RegisterDtoValidator());
            RuleFor(x => x.FarmName).NotEmpty();
            RuleFor(x => x.FarmAddressLine1).NotEmpty();
            RuleFor(x => x.FarmCity).NotEmpty();
            RuleFor(x => x.FarmPostalCode).NotEmpty();
            RuleFor(x => x.Mandal).NotEmpty();
        }
    }
}
