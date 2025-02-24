using API.Data; // Substitua pelo namespace correto do seu DbContext
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ChatService
    {
        private readonly AppDbContext _context;

        public ChatService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SaveMessageAsync(Guid senderId, string content, Guid? receiverId = null)
        {
            var message = new ChatMessage
            {
                SenderId = senderId,
                Content = content,
                ReceiverId = receiverId
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ChatMessage>> GetMessagesAsync(Guid userId, Guid? receiverId = null)
        {
            return await _context.ChatMessages
                .Where(m => (m.SenderId == userId && m.ReceiverId == receiverId) ||
                            (m.SenderId == receiverId && m.ReceiverId == userId) ||
                            (receiverId == null)) // Se receiverId for null, retorna mensagens públicas
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
        }
    }
}