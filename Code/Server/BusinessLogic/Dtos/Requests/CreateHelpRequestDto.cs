using FluentValidation;

namespace BusinessLogic.Dtos.Requests
{
    public class CreateHelpRequestDto
    {
        public string Message { get; set; }
    }

    public class CreateHelpRequestDtoValidator : AbstractValidator<CreateHelpRequestDto>
    {
        public CreateHelpRequestDtoValidator()
        {
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
