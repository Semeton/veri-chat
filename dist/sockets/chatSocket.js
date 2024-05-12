"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectedUsers = new Map();
exports.default = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);
        socket.on("authenticate", (userData) => {
            const { userId } = userData;
            if (connectedUsers.has(userId)) {
                const prevSocket = connectedUsers.get(userId);
                if (prevSocket) {
                    prevSocket.disconnect(true);
                    console.log(`User ${userId} disconnected`);
                }
            }
            // Store the user's socket connection
            connectedUsers.set(userId, socket);
            io.emit("connected", `User ${userId} connected`);
        });
        // Listen for chat messages
        socket.on("chat", (msg, id) => {
            io.emit("chat", msg, id);
            console.log(`User ${socket.id} says: `, msg);
        });
        // Listen for disconnection event
        socket.on("disconnect", () => {
            connectedUsers.forEach((userSocket, userId) => {
                if (userSocket === socket) {
                    connectedUsers.delete(userId);
                    io.emit("disconnected", `User ${userId} disconnected`);
                    console.log(`User ${userId} disconnected`);
                }
            });
        });
    });
};
