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
    public class ApplicationController : ControllerBase
    {
        private readonly TileDbContext _context;

        public ApplicationController(TileDbContext context)
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
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var query = _context.Applications.AsQueryable();

            if (role == "Client") query = query.Where(a => !a.IsBlocked);
            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Client")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            var role = User.FindFirst(ClaimTypes.Role)?.Value;
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            if (role == "Client" && app.IsBlocked)
                return Forbid("Blocked");

            return app;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Application>> CreateApplication(Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            await LogActivity($"Created application: {application.Name}");
            return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateApplication(int id, Application application)
        {
            if (id != application.Id) return BadRequest("ID mismatch");

            _context.Entry(application).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                await LogActivity($"Updated application: {application.Name}");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Applications.Any(a => a.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpPatch("block/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleBlockApplication(int id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            app.IsBlocked = !app.IsBlocked;
            await _context.SaveChangesAsync();

            await LogActivity($"{(app.IsBlocked ? "Blocked" : "Unblocked")} application: {app.Name}");

            return Ok(new { app.Id, app.IsBlocked });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            _context.Applications.Remove(app);
            await _context.SaveChangesAsync();

            await LogActivity($"Deleted application ID: {id}");

            return NoContent();
        }
    }
}
