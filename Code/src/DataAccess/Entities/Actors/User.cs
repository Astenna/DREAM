using DataAccess.Entities.Actors;

namespace DataAccess.Entites.Actors
{
    public class User
    {
        public int Id { get; set; }

        public Role Role { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
