namespace API.Helpers
{
    public class UserParams : PaginationParams
    {

        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public string PetType { get; set; }
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 30;
        public string OrderBy { get; set; } = "lastActive";
              
    }
}