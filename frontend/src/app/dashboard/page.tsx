"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Dashboard() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    if (!token) return;

    try {
      const data = await api("/tasks", "GET", undefined, token);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    loadTasks();
  }, [token, router]);

  const addTask = async () => {
    if (!title || !token) return;

    await api("/tasks", "POST", { title }, token);
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (id: string) => {
    if (!token) return;

    await api(`/tasks/${id}/toggle`, "PATCH", null, token);
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    if (!token) return;

    await api(`/tasks/${id}`, "DELETE", null, token);
    loadTasks();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl">My Tasks</h1>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="text-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex mb-4">
        <input
          className="flex-1 border p-2"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="ml-2 bg-black text-white px-4"
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center border p-2 mb-2"
        >
          <span
            onClick={() => toggleTask(task.id)}
            className={`cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>

          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
