using BusinessLogic.Dtos.Account;
using DataAccess.Entites.Actors;

namespace BusinessLogic.Tools
{
    public interface ITokenProvider
    {
        string CreateRefreshToken(User user);
        string CreateToken(User user);
        Task<TokenDto> RefreshTokenAsync(User user, string refreshToken);
    }
}