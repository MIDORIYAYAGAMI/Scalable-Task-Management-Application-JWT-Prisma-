import { Router } from "express";
import {
  addTask,
  listTasks,
  editTask,
  removeTask,
  toggleTaskStatus,
} from "../controllers/task.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", addTask);
router.get("/", listTasks);
router.patch("/:id", editTask);
router.delete("/:id", removeTask);
router.patch("/:id/toggle", toggleTaskStatus);

export default router;
