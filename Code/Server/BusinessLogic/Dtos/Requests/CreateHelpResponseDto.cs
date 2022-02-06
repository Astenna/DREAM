using FluentValidation;

namespace BusinessLogic.Dtos.Requests
{
    public class CreateHelpResponseDto
    {
        public string Message { get; set; }
    }

    public class CreateHelpResponseDtoValidator : AbstractValidator<CreateHelpResponseDto>
    {
        public CreateHelpResponseDtoValidator()
        {
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
