import express, { Express, Application, Request, Response } from "express";
import http, { Server } from "http";
import cors from "cors";
import { Server as SocketSever } from "socket.io";
import WebSocket from "ws";
import dotenv from "dotenv";

// socket
import chatSocket from "./sockets/chatSocket";

// Routes
import apiRouter from "./routes/api";
import webRouter from "./routes/index";

dotenv.config();
export const PORT: any | undefined = process.env.PORT || 8000;

const app: Application = express();

app.use(cors());

const server: http.Server = http.createServer(app);

// initialize socket
const io: SocketSever = new SocketSever(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

chatSocket(io);

// routes
app.use("/", webRouter);
app.use("/api", apiRouter);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "Route does not exist",
  });
});

export default server;

// "exec": "concurrently \"npx tsc --watch \" \"tsc-node src/index.ts\""
