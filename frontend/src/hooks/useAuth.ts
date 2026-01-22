"use client";
import { useState } from "react";

export function useauth() {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null
  );

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout };
}
