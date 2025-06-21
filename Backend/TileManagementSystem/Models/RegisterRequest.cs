using System.ComponentModel.DataAnnotations;

namespace TileManagementSystem.Models
{
    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }  // "Admin" or "Client"
    }
}
