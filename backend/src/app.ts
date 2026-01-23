import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

export default app;

