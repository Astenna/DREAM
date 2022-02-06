using FluentValidation;

namespace BusinessLogic.Dtos.Requests
{
    public class EditHelpRequestDto
    {
        public string Topic { get; set; }

        public string Description { get; set; }
    }

    public class EditHelpRequestDtoValidator : AbstractValidator<EditHelpRequestDto>
    {
        public EditHelpRequestDtoValidator()
        {
            RuleFor(x => x.Topic).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}
