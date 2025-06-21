using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TileManagementSystem.Data;
using TileManagementSystem.Models;

namespace TileManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly TileDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductController(TileDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        private async Task LogActivity(string action)
        {
            var username = User?.Identity?.Name ?? "Unknown";
            _context.ActivityLogs.Add(new ActivityLog
            {
                Action = action,
                PerformedBy = username,
                Timestamp = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Client")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            var query = _context.Products.Include(p => p.Category).Include(p => p.Application).AsQueryable();

            if (userRole == "Client")
                query = query.Where(p => !p.IsBlocked && !p.Category.IsBlocked && !p.Application.IsBlocked);

            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var product = await _context.Products
                .Include(p => p.Category)
                .Include(p => p.Application)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null) return NotFound();
            if (role == "Client" && (product.IsBlocked || product.Category.IsBlocked || product.Application.IsBlocked)) 
                return Forbid();

            return product;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            await LogActivity($"Created product: {product.Name} (SqCode: {product.SqCode})");
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage([FromForm] int productId, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0) return BadRequest("No file uploaded.");

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound("Product not found.");

            var uploadDir = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads");
            if (!Directory.Exists(uploadDir)) Directory.CreateDirectory(uploadDir);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var path = Path.Combine(uploadDir, fileName);

            using (var stream = new FileStream(path, FileMode.Create))
                await file.CopyToAsync(stream);

            product.ImagePath = "/uploads/" + fileName;
            await _context.SaveChangesAsync();
            await LogActivity($"Uploaded image for product: {product.Name}");

            return Ok(new { fileName = product.ImagePath });
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest("ID mismatch");
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await LogActivity($"Updated product: {product.Name} (SqCode: {product.SqCode})");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(p => p.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var prod = await _context.Products.FindAsync(id);
            if (prod == null) return NotFound();

            _context.Products.Remove(prod);
            await _context.SaveChangesAsync();
            await LogActivity($"Deleted product ID: {id}");

            return NoContent();
        }

        [HttpPatch("block/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleBlockProduct(int id)
        {
            var prod = await _context.Products.FindAsync(id);
            if (prod == null) return NotFound();

            prod.IsBlocked = !prod.IsBlocked;
            await _context.SaveChangesAsync();
            await LogActivity($"{(prod.IsBlocked ? "Blocked" : "Unblocked")} product: {prod.Name}");

            return Ok(new { prod.Id, prod.IsBlocked });
        }
    }
}