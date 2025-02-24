// Models/User.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? Picture { get; set; }
        public string? Name { get; set; } = string.Empty;
        public required string Email { get; set; } = string.Empty;
        public string? Telefone { get; set; } = string.Empty;
        public required string Password { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Role { get; set; } = "User"; // Default role is "User"

        public User() { Email = string.Empty; Password = string.Empty; }

    }
}