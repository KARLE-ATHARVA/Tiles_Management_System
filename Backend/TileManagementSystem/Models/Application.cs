using System.ComponentModel.DataAnnotations;

namespace TileManagementSystem.Models
{
    public class Application
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsBlocked { get; set; }
    }
}
