using BusinessLogic.Dtos.Account;

namespace BusinessLogic.Services
{
    public interface IAccountService
    {
        Task DeleteAccountAsync(int id, LoginDto loginDto);
        Task<TokenDto> LoginAsync(LoginDto loginDto);
        Task RegisterAgronomistAsync(RegisterAgronomistDto registerAgronomistDto);
        Task RegisterFarmerAsync(RegisterFarmerDto registerFarmerDto);
        Task RegisterPolicyMakerAsync(RegisterPolicyMakerDto registerPolicyMakerDto);
        Task ResetPasswordAsync(int id, LoginDto loginDto);
    }
}