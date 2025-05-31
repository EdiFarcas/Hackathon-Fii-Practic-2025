require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

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

// REST endpoint for health check (optional)
app.get("/", (req, res) => res.send("Socket.IO server is running!"));

// SOCKET.IO logic
io.on("connection", (socket) => {
  // Create lobby
  socket.on("create-lobby", async ({ lobbyName, playerCount, playerName }, callback) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const game = await prisma.game.create({
      data: {
        title: lobbyName,
        maxPlayers: playerCount,
        code,
        status: "WAITING"
      }
    });
    await prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerName
      }
    });
    socket.join(code);
    callback({ code });
    io.to(code).emit("lobby-update", await getLobbyState(game.id));
  });

  // Join lobby
  socket.on("join-lobby", async ({ code, playerName }, callback) => {
    const game = await prisma.game.findUnique({ where: { code } });
    if (!game) return callback({ error: "Lobby not found" });
    const players = await prisma.gamePlayer.count({ where: { gameId: game.id } });
    if (players >= game.maxPlayers) return callback({ error: "Lobby full" });
    await prisma.gamePlayer.create({
      data: {
        gameId: game.id,
        playerName
      }
    });
    socket.join(code);
    callback({ success: true });
    io.to(code).emit("lobby-update", await getLobbyState(game.id));
  });

  // Add more events as needed (chat, start game, etc)
});

async function getLobbyState(gameId) {
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true }
  });
  return {
    title: game.title,
    code: game.code,
    maxPlayers: game.maxPlayers,
    players: game.players.map(p => p.playerName)
  };
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log("Socket.IO server running on port", PORT);
});