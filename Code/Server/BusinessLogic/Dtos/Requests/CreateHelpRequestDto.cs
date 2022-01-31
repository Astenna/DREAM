using FluentValidation;

namespace BusinessLogic.Dtos.Requests
{
    public class CreateHelpRequestDto
    {
        public string Topic { get; set; }

        public string Description { get; set; }
    }

    public class CreateHelpRequestDtoValidator : AbstractValidator<CreateHelpRequestDto>
    {
        public CreateHelpRequestDtoValidator()
        {
            RuleFor(x => x.Topic).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}
