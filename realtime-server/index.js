require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
// const fetch = require('node-fetch');

// Base URL for the bot API
const apiUrlBase = process.env.BOT_API_URL || 'localhost:3000';
console.log("Realtime server is using bot API URL:", apiUrlBase);

// Track game rooms and their state
const gameRooms = new Map();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// SOCKET.IO logic
io.on("connection", (socket) => {
  let currentGameId = null;
  let currentUser = null;

  // Join game
  socket.on("join-game", async ({ gameId, user }, callback) => {
    try {
      const game = await prisma.game.findUnique({ 
        where: { id: gameId },
        include: { host: true }
      });

      if (!game) {
        console.error("❌ Game not found:", gameId);
        return callback({ error: "Game not found" });
      }

      // Initialize game room if it doesn't exist
      if (!gameRooms.has(gameId)) {
        gameRooms.set(gameId, {
          users: [],
          chatMessages: [],
          hostId: game.hostId,
          currentCard: 0,
          currentTurn: 5,
          status: game.status || 'WAITING'
        });
      }

      const gameRoom = gameRooms.get(gameId);
      
      // Check if room is full (max 4 players)
      if (gameRoom.users.length >= 4) {
        console.error("❌ Game room is full:", gameId);
        return callback({ error: "Game room is full" });
      }

      // Add user to room
      const userInfo = {
        id: user.id,
        name: user.name,
        isHost: game.hostId === user.id
      };
      
      gameRoom.users.push(userInfo);
      currentGameId = gameId;
      currentUser = userInfo;
      
      // Join socket room
      socket.join(gameId);
      
      // Notify everyone in the room
      io.to(gameId).emit("room-update", {
        users: gameRoom.users,
        chatMessages: gameRoom.chatMessages
      });

      console.log(`✅ User '${user.name}' joined game ${gameId}`);
      callback({ 
        success: true, 
        gameState: {
          ...game,
          users: gameRoom.users,
          chatMessages: gameRoom.chatMessages,
          currentCard: gameRoom.currentCard,
          currentTurn: gameRoom.currentTurn
        }, 
        userInfo 
      });
    } catch (error) {
      console.error("❌ Error joining game:", error);
      callback({ error: "Failed to join game" });
    }
  });

  // Handle chat messages and bot responses
  socket.on("send-message", async ({ gameId, message }) => {
    if (!gameRooms.has(gameId) || !currentUser) return;
    
    const gameRoom = gameRooms.get(gameId);
    const chatMessage = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      message,
      timestamp: new Date(),
      type: 'user'
    };
    
    gameRoom.chatMessages.push(chatMessage);

    console.log(`💬 ${currentUser.name} in game ${gameId}:`, message);

    io.to(gameId).emit("chat-update", chatMessage);

    // Get bot response
    try {
      const response = await fetch(`${apiUrlBase}/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage: message,
          messageHistory: gameRoom.chatMessages
            .filter(msg => msg.type !== 'system')
            .map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.message
            }))
        })
      });

      if (!response.ok) throw new Error('Bot API request failed' + await response.text());
      const data = await response.json();

      // Send bot response to all users in the room
      if (data.result) {
        const botMessage = {
          id: Date.now(),
          userId: 'bot',
          userName: 'Game Master',
          message: data.result,
          timestamp: new Date(),
          type: 'bot'
        };
        
        gameRoom.chatMessages.push(botMessage);
        console.log('🤖 Bot response:', botMessage, gameId);

        io.to(gameId).emit("chat-update", botMessage);
      }
    } catch (error) {
      console.error('❌ Bot response error:', error);
      
      const errorMessage = {
        id: Date.now(),
        userId: 'system',
        userName: 'System',
        message: 'Failed to get bot response' + error.message,
        timestamp: new Date(),
        type: 'system'
      };
      gameRoom.chatMessages.push(errorMessage);
      io.to(gameId).emit("chat-update", errorMessage);
    }
  });

  // Handle card navigation sync
  socket.on("sync-card", ({ gameId, index }) => {
    if (!gameRooms.has(gameId) || !currentUser) return;
    const gameRoom = gameRooms.get(gameId);
    
    // Only host can change cards during the game
    if (gameRoom.status === 'PLAYING' && currentUser.id !== gameRoom.hostId) return;
    
    gameRoom.currentCard = index;

    console.log(`🔄 Card index synced to ${index} for game ${gameId}`);
    socket.to(gameId).emit("sync-card", index);
  });

  // Handle turn timer sync
  socket.on("sync-turn", ({ gameId, turn }) => {
    if (!gameRooms.has(gameId)) return;
    const gameRoom = gameRooms.get(gameId);
    gameRoom.currentTurn = turn;

    console.log(`⏱️ Turn synced to ${turn} for game ${gameId}`);

    socket.to(gameId).emit("sync-turn", turn);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (currentGameId && currentUser) {
      const gameRoom = gameRooms.get(currentGameId);
      if (gameRoom) {
        // Remove user from room
        gameRoom.users = gameRoom.users.filter(u => u.id !== currentUser.id);
        
        console.log(`❌ User '${currentUser.name}' disconnected from game ${currentGameId}`);

        // Notify others
        io.to(currentGameId).emit("room-update", {
          users: gameRoom.users,
          chatMessages: gameRoom.chatMessages
        });

        // Clean up empty rooms
        if (gameRoom.users.length === 0) {
          console.log(`🧹 Game room ${currentGameId} is empty, removing it`);
          gameRooms.delete(currentGameId);
        }
      }
    }
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("✔️  Realtime server running on port", PORT);
});