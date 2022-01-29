using BusinessLogic.Dtos.Account;
using DataAccess.Entites.Actors;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BusinessLogic.Tools
{
    public class TokenProvider : ITokenProvider
    {
        private readonly IOptions<AuthOptions> _authOptions;

        public TokenProvider(IOptions<AuthOptions> authOptions)
        {
            _authOptions = authOptions;
        }

        public string CreateRefreshToken(User user)
        {
            throw new NotImplementedException();
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim> {
                new Claim("name", user.Name),
                new Claim("surname", user.Surname),
                new Claim("role", user.Role.ToString())
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var credentitals = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authOptions.Value.Key)),
                SecurityAlgorithms.HmacSha256);

            var signedJwt = new JwtSecurityToken(
                null, null, claims,
                expires: DateTime.UtcNow.AddMinutes(_authOptions.Value.AcessTokenLifetime),
                signingCredentials: credentitals);

            return tokenHandler.WriteToken(signedJwt);
        }

        public Task<TokenDto> RefreshTokenAsync(User user, string refreshToken)
        {
            throw new NotImplementedException();
        }
    }

    public class AuthOptions
    {
        public bool Enabled { get; set; }
        public string Key { get; set; }
        public int AcessTokenLifetime { get; set; }
    }
}
