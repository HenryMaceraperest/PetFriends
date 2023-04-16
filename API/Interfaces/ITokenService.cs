using System.Security.Claims;
using API.Entities;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace API.Interfaces
{
    public interface ITokenService
    {
       string CreateToken(AppUser user)
       {
            throw new NotImplementedException();        
       }
    }
}