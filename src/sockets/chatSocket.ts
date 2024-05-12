import { Server, Socket } from "socket.io";

const connectedUsers: Map<string, Socket> = new Map();

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected: ", socket.id);

    socket.on("authenticate", (userData: any) => {
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
    socket.on("chat", (msg: string, id: number) => {
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
