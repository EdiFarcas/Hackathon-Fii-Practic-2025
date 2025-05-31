/* eslint-disable @typescript-eslint/no-require-imports */
const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("client-update", ({ roomId, data }) => {
    socket.to(roomId).emit("server-update", data);
  });
});

console.log("Socket.IO server running on port 3001");
