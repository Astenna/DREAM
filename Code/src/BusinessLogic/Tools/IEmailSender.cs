
namespace BusinessLogic.Tools
{
    internal interface IEmailSender
    {
        Task SendEmailAsync(string recipient, string message);
    }
}