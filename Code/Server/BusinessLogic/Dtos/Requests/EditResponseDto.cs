using FluentValidation;

namespace BusinessLogic.Dtos.Requests
{
    public class EditResponseDto
    {
        public string Message { get; set; }
    }

    public class EditResponseDtoValidator : AbstractValidator<EditResponseDto>
    {
        public EditResponseDtoValidator()
        {
            RuleFor(x => x.Message).NotEmpty();
        }
    }
}
