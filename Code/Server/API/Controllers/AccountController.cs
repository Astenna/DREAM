using BusinessLogic.Dtos.Account;
using BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("registration/farmer")]
        public async Task<IActionResult> PostFarmerAccountAsync([FromBody] RegisterFarmerDto registerFarmerDto)
        {
            await _accountService.RegisterFarmerAsync(registerFarmerDto);
            return Ok();
        }

        [HttpPost("registration/agronomist")]
        public /*async*/ Task<IActionResult> PostAgronomistAccountAsync([FromBody] RegisterAgronomistDto registerAgronomistDto)
        {
            throw new NotImplementedException();
        }

        [HttpPost("registration/policy-maker")]
        public async Task<IActionResult> PostPolicyMakerAccountAsync([FromBody] RegisterPolicyMakerDto registerPolicyMakerDto)
        {
            await _accountService.RegisterPolicyMakerAsync(registerPolicyMakerDto);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginDto loginDto)
        {
            var tokens = _accountService.Login(loginDto);
            return Ok(tokens);
        }

        [HttpPost("{id}/reset-password")]
        public async Task<IActionResult> ResetPasswordAsync([FromRoute] int id, [FromBody] LoginDto loginDto)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountAsync([FromRoute] int id, [FromBody] LoginDto loginDto)
        {
            await _accountService.DeleteAccountAsync(id, loginDto);
            return Ok();
        }
    }
}
