namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 30;
        public int pageNumber { get; set; }  
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }
        public string Gender { get; set; }
        public string PetType { get; set; }
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 30;
        public string OrderBy { get; set; } = "lastActive";
              
    }
}