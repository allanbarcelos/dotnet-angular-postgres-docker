// Controllers/UserController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using System.Linq;

namespace API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IActionResult GetUsers(string? name, DateTime? createdAfter, DateTime? createdBefore)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(name))
                query = query.Where(u => u.Name.Contains(name));

            if (createdAfter.HasValue)
                query = query.Where(u => u.CreatedAt >= createdAfter.Value);

            if (createdBefore.HasValue)
                query = query.Where(u => u.CreatedAt <= createdBefore.Value);

            return Ok(query.ToList());
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetUser(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            // Ensure users can only access their own data unless they are admin
            var currentUserId = Guid.Parse(User.FindFirst("userId").Value);
            if (user.Id != currentUserId && !User.IsInRole("Admin"))
                return Forbid();

            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateUser(Guid id, User updatedUser)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            // Ensure users can only update their own data unless they are admin
            var currentUserId = Guid.Parse(User.FindFirst("userId").Value);
            if (user.Id != currentUserId && !User.IsInRole("Admin"))
                return Forbid();

            user.Name = updatedUser.Name;
            user.Email = updatedUser.Email;
            user.Telefone = updatedUser.Telefone;
            user.Picture = updatedUser.Picture;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteUser(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}