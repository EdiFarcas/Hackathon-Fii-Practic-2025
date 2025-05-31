import { Server } from "socket.io";

const io = new Server(3001, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-game", ({ gameId, userId }) => {
    socket.join(gameId);
    io.to(gameId).emit("player-joined", { userId });
  });

  socket.on("player-action", ({ gameId, action }) => {
    io.to(gameId).emit("action-update", action);
  });

  socket.on("leave-game", ({ gameId, userId }) => {
    socket.leave(gameId);
    io.to(gameId).emit("player-left", { userId });
  });
});

console.log("Socket.IO server running on port 3001");
