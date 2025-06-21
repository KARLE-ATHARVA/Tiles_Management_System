using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TileManagementSystem.Data;
using TileManagementSystem.Models;

namespace TileManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class LogsController : ControllerBase
    {
        private readonly TileDbContext _context;

        public LogsController(TileDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivityLog>>> GetLogs()
        {
            return await _context.ActivityLogs
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }
    }
}
