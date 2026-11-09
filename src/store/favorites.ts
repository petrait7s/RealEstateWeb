import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Fav {
  ids: string[];
  toggle: (id: string) => void;
}
export const useFavorites = create<Fav>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set({
          ids: get().ids.includes(id) ? get().ids.filter((x) => x !== id) : [...get().ids, id],
        }),
    }),
    { name: "favorites" },
  ),
);
