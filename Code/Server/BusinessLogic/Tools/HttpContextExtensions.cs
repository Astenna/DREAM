using DataAccess;
using DataAccess.Entites.Actors;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Tools
{
    public static class HttpContextExtensions
    {
        public static User GetUserUsingClaims(this HttpContext httpContext, DreamDbContext dreamDbContext)
        {
            var emailFromClaims = httpContext.User.FindFirst("email").Value;
            var user = dreamDbContext.Users.SingleOrDefault(x => x.Email.Equals(emailFromClaims));

            if (user is null)
            {
                throw new UnauthorizedAccessException();
            }

            return user;
        }

        public static Farmer GetFarmerUsingClaims(this HttpContext httpContext, DreamDbContext dreamDbContext)
        {
            var farmerIdFromClaims = httpContext.User.FindFirst("farmerId").Value;
            var farmer = dreamDbContext.Farmers
                            .SingleOrDefault(x => x.Id.ToString() == farmerIdFromClaims);

            if (farmer is null)
            {
                throw new UnauthorizedAccessException();
            }

            return farmer;
        }
    }
}
