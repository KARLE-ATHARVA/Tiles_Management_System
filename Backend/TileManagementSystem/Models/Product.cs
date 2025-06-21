using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TileManagementSystem.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        [Required]
        public string SqCode { get; set; }  // ✅ Added field

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int ApplicationId { get; set; }

        public bool IsBlocked { get; set; }

        public string? ImagePath { get; set; }

        public Category? Category { get; set; }
        public Application? Application { get; set; }
    }
}
