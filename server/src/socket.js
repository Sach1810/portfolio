export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("controllerConnected", (data) => {
      io.to(data.socketId).emit("startJobSearch", data);
    });

    socket.on("updateJobSearch", (data) => {
      console.log("🛠️ updateJobSearch", data);
      io.to(data.socketId).emit("updateJobSearch", data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });
};
