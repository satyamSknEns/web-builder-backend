import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import connectDatabase from "./config/db";

dotenv.config();

connectDatabase();
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ["http://localhost:5007", "http://localhost:5002"];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const PORT = process.env.PORT || 8002;
server.get("/", (req, res) => {
  res.send(`Server is running locally on Port ${PORT}`);
});

server.use('/api', routes);
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
