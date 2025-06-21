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
    public class CategoryController : ControllerBase
    {
        private readonly TileDbContext _context;

        public CategoryController(TileDbContext context)
        {
            _context = context;
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
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var query = _context.Categories.AsQueryable();

            if (role == "Client") query = query.Where(c => !c.IsBlocked);
            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var cat = await _context.Categories.FindAsync(id);
            if (cat == null) return NotFound();

            if (role == "Client" && cat.IsBlocked)
                return Forbid("Blocked");

            return cat;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            await LogActivity($"Created category: {category.Name}");
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            if (id != category.Id) return BadRequest("ID mismatch");

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await LogActivity($"Updated category: {category.Name}");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Categories.Any(c => c.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpPatch("block/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleBlockCategory(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if (cat == null) return NotFound();

            cat.IsBlocked = !cat.IsBlocked;
            await _context.SaveChangesAsync();

            await LogActivity($"{(cat.IsBlocked ? "Blocked" : "Unblocked")} category: {cat.Name}");

            return Ok(new { cat.Id, cat.IsBlocked });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if (cat == null) return NotFound();

            _context.Categories.Remove(cat);
            await _context.SaveChangesAsync();

            await LogActivity($"Deleted category ID: {id}");

            return NoContent();
        }
    }
}
