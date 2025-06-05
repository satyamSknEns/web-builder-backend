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

server.use(cors());

const PORT = process.env.PORT || 8002;
server.get("/", (req, res) => {
  res.send(`Server is running locally on Port ${PORT}`);
});

server.use(routes);
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
