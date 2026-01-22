import prisma from "../utils/prisma";

export const createTask = async (title: string, userId: string) => {
  return prisma.task.create({
    data: { title, userId },
  });
};

export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  search?: string,
  status?: string
) => {
  return prisma.task.findMany({
    where: {
      userId,
      title: search ? { contains: search } : undefined,
      completed:
        status === "completed"
          ? true
          : status === "pending"
          ? false
          : undefined,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
};

export const updateTask = async (
  id: string,
  title: string,
  userId: string
) => {
  return prisma.task.updateMany({
    where: { id, userId },
    data: { title },
  });
};

export const deleteTask = async (id: string, userId: string) => {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
};

export const toggleTask = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) throw new Error("Task not found");

  return prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
};
