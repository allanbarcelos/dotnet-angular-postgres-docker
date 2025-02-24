using System;
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace API.Data.Seeders
{
    public static class UserSeeder
    {
        public static async Task SeedAdminUserAsync(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

                // Verifica se já existe um usuário admin
                var adminExists = await dbContext.Users.AnyAsync(u => u.Role == "Admin");
                if (!adminExists)
                {
                    // Cria o usuário admin
                    var adminUser = new User
                    {
                        Id = Guid.NewGuid(),
                        Name = "Admin",
                        Email = "admin@example.com",
                        Telefone = "123456789",
                        Password = BCrypt.Net.BCrypt.HashPassword("Admin@123"), // Em um cenário real, use hash para a senha
                        Role = "Admin",
                        CreatedAt = DateTime.UtcNow
                    };

                    // Adiciona o usuário ao banco de dados
                    dbContext.Users.Add(adminUser);
                    await dbContext.SaveChangesAsync();
                }
            }
        }
    }
}