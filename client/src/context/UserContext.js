import { create } from "zustand";

const storedUserData =
  typeof window !== "undefined"
    ? window.localStorage.getItem("userPower")
    : null;
const initialUserState = storedUserData ? JSON.parse(storedUserData) : null;

export const userStore = create((set) => ({
  user: initialUserState,
  updateUser: (newUser) => {
    set({ user: newUser });
    if (typeof window !== "undefined") {
      if (newUser) {
        window.localStorage.setItem("userPower", JSON.stringify(newUser));
      } else {
        window.localStorage.removeItem("userPower");
      }
    }
  },
}));

const programeData =
  typeof window !== "undefined"
    ? window.localStorage.getItem("userPrograme")
    : null;
const initialprograme = programeData ? JSON.parse(programeData) : null;

export const programeStore = create((set) => ({
  programe: initialprograme,
  updatePrograme: (newUser) => {
    set({ programe: newUser });
    if (typeof window !== "undefined") {
      if (newUser) {
        window.localStorage.setItem("userPrograme", JSON.stringify(newUser));
      } else {
        window.localStorage.removeItem("userPrograme");
      }
    }
  },
}));
