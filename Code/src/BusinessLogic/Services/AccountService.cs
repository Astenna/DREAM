using BusinessLogic.Dtos.Account;

namespace BusinessLogic.Services
{
    public class AccountService : IAccountService
    {
        public async Task RegisterFarmerAsync(RegisterFarmerDto registerFarmerDto)
        {
            return;
        }

        public async Task RegisterAgronomistAsync(RegisterAgronomistDto registerAgronomistDto)
        {
            return;
        }

        public async Task RegisterPolicyMakerAsync(RegisterPolicyMakerDto registerPolicyMakerDto)
        {
            return;
        }

        public async Task<TokenDto> LoginAsync(LoginDto loginDto)
        {
            return new TokenDto();
        }

        public async Task ResetPasswordAsync(int id, LoginDto loginDto)
        {
            return;
        }

        public async Task DeleteAccountAsync(int id, LoginDto loginDto)
        {
            return;
        }
    }
}
