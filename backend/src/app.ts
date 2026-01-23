import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

// ✅ REQUIRED middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// ✅ health check (VERY IMPORTANT)
app.get("/", (_req, res) => {
  res.json({ status: "API is running" });
});

export default app;
