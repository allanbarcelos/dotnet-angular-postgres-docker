using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Collections.Concurrent;
using API.Models;
using System.Security.Claims;
using API.Services;

namespace API.WebSockets
{
    public class WebSocketHandler
    {
        private static ConcurrentDictionary<Guid, WebSocket> _connections = new();
        private static ChatService _chatService;

        public WebSocketHandler(ChatService chatService)
        {
            _chatService = chatService;
        }

        public async Task HandleWebSocketAsync(WebSocket webSocket, ClaimsPrincipal user)
        {
            var userId = Guid.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty);

            _connections.TryAdd(userId, webSocket);
            var buffer = new byte[1024 * 4];

            try
            {
                while (webSocket.State == WebSocketState.Open)
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        _connections.TryRemove(userId, out _);
                        await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed connection", CancellationToken.None);
                    }
                    else
                    {
                        var messageJson = Encoding.UTF8.GetString(buffer, 0, result.Count);
                        var chatMessage = JsonSerializer.Deserialize<ChatMessageDTO>(messageJson);

                        if (chatMessage != null)
                        {
                            await _chatService.SaveMessageAsync(userId, chatMessage.Content, chatMessage.ReceiverId);
                            await SendMessageAsync(userId, chatMessage.ReceiverId, chatMessage.Content);
                        }
                    }
                }
            }
            catch
            {
                _connections.TryRemove(userId, out _);
            }
        }

        private static async Task SendMessageAsync(Guid senderId, Guid? receiverId, string message)
        {
            var messageData = JsonSerializer.Serialize(new
            {
                senderId,
                receiverId,
                message,
                timestamp = DateTime.UtcNow
            });

            var buffer = Encoding.UTF8.GetBytes(messageData);

            if (receiverId.HasValue && _connections.TryGetValue(receiverId.Value, out WebSocket? receiverSocket) && receiverSocket.State == WebSocketState.Open)
            {
                await receiverSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
            
            if (_connections.TryGetValue(senderId, out WebSocket? senderSocket) && senderSocket.State == WebSocketState.Open)
            {
                await senderSocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }

    public class ChatMessageDTO
    {
        public string Content { get; set; } = string.Empty;
        public Guid? ReceiverId { get; set; }
    }
}