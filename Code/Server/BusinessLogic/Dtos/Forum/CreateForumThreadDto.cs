using FluentValidation;

namespace BusinessLogic.Dtos.Forum
{
    public class CreateForumThreadDto
    {
        public string Topic { get; set; }

        public string Description { get; set; }
    }
    public class CreateForumThreadDtoValidator : AbstractValidator<CreateForumThreadDto>
    {
        public CreateForumThreadDtoValidator()
        {
            RuleFor(x => x.Topic).NotEmpty();
        }
    }
}
