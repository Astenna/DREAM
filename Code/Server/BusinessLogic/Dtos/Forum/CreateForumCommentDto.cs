using FluentValidation;

namespace BusinessLogic.Dtos.Forum
{
    public class CreateForumCommentDto
    {
        public string Content { get; set; }
    }
    public class CreateForumCommentDtoValidator : AbstractValidator<CreateForumCommentDto>
    {
        public CreateForumCommentDtoValidator()
        {
            RuleFor(x => x.Content).NotEmpty();
        }
    }
}
