using System.Security.Claims;
using API.Entities;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace API.Interfaces
{
    public interface ITokenService
    {
       Task<string> CreateToken(AppUser user);
    }
}