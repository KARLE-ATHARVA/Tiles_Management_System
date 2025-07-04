using System.ComponentModel.DataAnnotations;

namespace TileManagementSystem.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } // "Admin" or "Client"
    }
}
