using DataAccess.Entites;
using FluentValidation;

namespace BusinessLogic.Dtos.Farmer
{
    public class CreateFarmerNoteDto
    {
        public Note Note { get; set; }

        public string ProblemTypeName { get; set; }
    }

    public class CreateNoteDtoValidator : AbstractValidator<CreateFarmerNoteDto>
    {
        public CreateNoteDtoValidator()
        {
            RuleFor(x => x.ProblemTypeName).NotEmpty();
        }
    }
}
