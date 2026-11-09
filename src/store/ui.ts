import { create } from "zustand";

export type CursorState = "default" | "view" | "drag" | "explore" | "hidden";

interface UIState {
  cursor: CursorState;
  setCursor: (c: CursorState) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  loaded: boolean;
  setLoaded: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  cursor: "default",
  setCursor: (cursor) => set({ cursor }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));
