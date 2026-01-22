import { Request, Response } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTask,
} from "../services/task.service";

export const addTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = (req as any).userId;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await createTask(title, userId);
  res.status(201).json(task);
};

export const listTasks = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;

  const status =
    typeof req.query.status === "string" ? req.query.status : undefined;

  const tasks = await getTasks(userId, page, limit, search, status);
  res.json(tasks);
};

export const editTask = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const { title } = req.body;
  const userId = (req as any).userId;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  await updateTask(id, title, userId);
  res.json({ message: "Task updated" });
};

export const removeTask = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const userId = (req as any).userId;

  await deleteTask(id, userId);
  res.json({ message: "Task deleted" });
};

export const toggleTaskStatus = async (req: Request, res: Response) => {
  const id = String(req.params.id);
  const userId = (req as any).userId;

  const task = await toggleTask(id, userId);
  res.json(task);
};
