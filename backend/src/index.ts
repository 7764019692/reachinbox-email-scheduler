import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import emailRoutes from "./routes/email.routes";
import "./workers/email.worker";
import emailRoutes from "./routes/email.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/emails", emailRoutes);

app.get("/", (req, res) => {
  res.send("ReachInbox Backend Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
