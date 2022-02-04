using DataAccess.Entites;
using FluentValidation;
using System.Text;

namespace BusinessLogic.Dtos.Farmer
{
    public class CreateFarmerNoteDto
    {
        public string Note { get; set; }

        public string ProblemTypeName { get; set; }
    }

    public class CreateFarmerNoteDtoValidator : AbstractValidator<CreateFarmerNoteDto>
    {
        public CreateFarmerNoteDtoValidator()
        {
            RuleFor(x => x.Note).Must(x => IsDefined(x))
                .WithMessage(x => $"{x.Note} is not a valid note, choose from: {GetValuesOfNotes()}");
        }

        private bool IsDefined(string value)
        {
            try
            {
                _ = (Note)Enum.Parse(typeof(Note), value);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        private string GetValuesOfNotes()
        {
            StringBuilder result = new StringBuilder();

            foreach (var value in Enum.GetValues(typeof(Note)))
            {
                result.Append(value);
                result.Append(" ");
            }

            return result.ToString();
        }
    }
}
