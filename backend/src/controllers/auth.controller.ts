import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  res.status(201).json({
    message: "User registered",
    email,
  });
};

export const login = async (req: Request, res: Response) => {
  res.json({ token: "dummy-token" });
};
