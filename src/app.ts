import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import History, { IHistory } from "./models/History";
import connectDB from "./config/dbConn";
import swaggerUi from 'swagger-ui-express'
import router from "./routes/Calculator";
import { swaggerSpec } from "./swagger";
import CalculatorController from './controllers/CalculatorController';
const PORT = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"],
  },
});
app.set("io", io)

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  CalculatorController.getHistory(socket);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/', router);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
