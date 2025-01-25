import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import History, { IHistory } from "./models/History";
import connectDB from "./config/dbConn";
const PORT = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("io", io)

// io.on("connection", async (socket) => {
//   console.log(`New client connected: ${socket.id}`);

//   socket.on("load_history", async () => {
//     try {
//       const historyList = await History.find().sort({ timestamp: 1 });
//       socket.emit("history_loaded", historyList);
//     } catch (error) {
//       console.error("Error loading history:", error);
//     }
//   });

//   socket.on("send_history_item", async (historyItem: IHistory) => {
//     try {
//       const newHistoryItem = await History.create({
//         command: historyItem.command,
//         result: historyItem.result,
//         createdAt: historyItem.createdAt,
//       });

//       io.emit("history_item_saved", newHistoryItem);
//     } catch (error) {
//       console.error("Error saving history item:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`Client disconnected: ${socket.id}`);
//   });
// });

app.use("/", (req, res) => {
  res.json("Hello World");
});

// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
