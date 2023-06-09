using API.DTOs;
using API.Entities;
using API.Helpers;
using Microsoft.Extensions.Localization;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);   
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username, bool isCurrentUser);  
        Task<string> GetPetType(string username);  
        Task<AppUser> GetUserByPhotoId(int photoId); 
    }
}