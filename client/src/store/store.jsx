import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
    accessToken: localStorage.getItem("accessToken") || "",
  },
  setUsername: (name) =>
    set((state) => ({ auth: { ...state.auth, username: name } })),
  setAccessToken: (token) =>
    set((state) => ({ auth: { ...state.auth, accessToken: token } })),
}));
