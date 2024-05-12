"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
// socket
const chatSocket_1 = __importDefault(require("./sockets/chatSocket"));
// Routes
const api_1 = __importDefault(require("./routes/api"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
// initialize socket
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
(0, chatSocket_1.default)(io);
// routes
app.use("/", index_1.default);
app.use("/api", api_1.default);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Route does not exist",
    });
});
exports.default = server;
// "exec": "concurrently \"npx tsc --watch \" \"tsc-node src/index.ts\""
