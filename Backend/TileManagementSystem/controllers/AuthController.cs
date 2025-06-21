using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TileManagementSystem.Data;
using TileManagementSystem.Models;

namespace TileManagementSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TileDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(TileDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ===== Helper: Log activity to ActivityLogs =====
        private void LogActivity(string action, string performedBy)
        {
            _context.ActivityLogs.Add(new ActivityLog
            {
                Action = action,
                PerformedBy = performedBy,
                Timestamp = DateTime.UtcNow
            });
            _context.SaveChanges();
        }

        // ========================= SIGNUP =========================
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] RegisterRequest request)
        {
            if (_context.Users.Any(u => u.Username == request.Username))
            {
                return BadRequest("Username already exists");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var user = new User
            {
                Username = request.Username,
                PasswordHash = hashedPassword,
                Role = string.IsNullOrEmpty(request.Role) ? "Client" : request.Role
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            // ✅ Log the signup action
            LogActivity($"Signed up as {user.Role}", user.Username);

            return Ok("User registered successfully");
        }

        // ========================= LOGIN =========================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == request.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid username or password");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            // ✅ Log the login action
            LogActivity($"Logged in as {user.Role}", user.Username);

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                role = user.Role
            });
        }
    }
}
