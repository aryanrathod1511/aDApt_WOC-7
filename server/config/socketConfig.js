const http = require("http");
const socketIo = require("socket.io");
const express = require("express");

const app = express(); 

const server = http.createServer(app); 
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);


  const userId = socket.handshake.query.userId;
  console.log(`User ID: ${userId}`);


  
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Run WebSocket server on a different port (e.g., 4000)
// server.listen(4000, () => {
//   console.log("WebSocket server running on port 4000");
// });

module.exports = { server, io };
