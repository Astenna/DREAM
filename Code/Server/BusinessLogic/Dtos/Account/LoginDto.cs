using FluentValidation;

namespace BusinessLogic.Dtos.Account
{
    public class LoginDto
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    public class LoginDtoValidator : AbstractValidator<LoginDto>
    {
        public LoginDtoValidator()
        {
            RuleFor(x => x.Password.Length > 3);
            RuleFor(x => x.Email).NotEmpty();
        }
    }
}
