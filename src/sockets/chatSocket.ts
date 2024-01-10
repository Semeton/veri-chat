import { Server, Socket } from "socket.io";

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected: ", socket.id);
    io.emit("connected", `User ${socket.id} connected`);

    socket.on("chat", (msg: string) => {
      io.emit("chat", `User ${socket.id} says: ${msg}`);
      console.log(`User ${socket.id} says: `, msg);
    });

    socket.on("disconnected", () => {
      io.emit("disconnected", `User ${socket.id} disconnected`);
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
