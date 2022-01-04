using BusinessLogic.Dtos.Account;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost("registration/farmer")]
        public async Task<IActionResult> PostFarmerAccountAsync([FromBody] RegisterFarmerDto registerFarmerDto)
        {
            return Ok();
        }

        [HttpPost("registration/agronomist")]
        public async Task<IActionResult> PostAgronomistAccountAsync([FromBody] RegisterAgronomistDto registerAgronomistDto)
        {
            return Ok();
        }

        [HttpPost("registration/policy-maker")]
        public async Task<IActionResult> PostPolicyMakerAccountAsync([FromBody] RegisterPolicyMakerDto registerPolicyMakerDto)
        {
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginDto loginDto)
        {
            return Ok();
        }

        [HttpPost("{id}/reset-password")]
        public async Task<IActionResult> ResetPasswordAsync([FromRoute] int id, [FromBody] LoginDto loginDto)
        {
            return Ok();
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteAccountAsync([FromRoute] int id, [FromBody] LoginDto loginDto)
        {
            return Ok();
        }
    }
}
