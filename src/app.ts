import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.json('Hello World')
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
