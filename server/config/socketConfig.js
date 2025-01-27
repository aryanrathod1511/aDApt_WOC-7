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
  console.log("New client connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Export the server and io instance (optional, if needed in other files)
module.exports = { server, io };
