using FluentValidation;

namespace BusinessLogic.Dtos.Account
{
    public class RegisterDto
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
    }

    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.Name.Length > 3);
            RuleFor(x => x.Surname.Length > 3);
            RuleFor(x => x.Password.Length > 3);
            RuleFor(x => x.Email).NotEmpty();
        }
    }
}
