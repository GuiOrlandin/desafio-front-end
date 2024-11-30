import { create } from "zustand";
import { persist } from "zustand/middleware";

const USER_STORAGE = "@user:user-1.0.0";

export interface User {
  id: string;
  email: string;
  accessToken: string;
  isAdmin: boolean;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        accessToken: "",
        email: "",
        isAdmin: false,
        id: "",
      },
      setUser: (user: User) => set({ user }),
      removeUser: () =>
        set({
          user: {
            accessToken: "",
            email: "",
            id: "",
            isAdmin: false,
          },
        }),
    }),
    {
      name: USER_STORAGE,
    }
  )
);
