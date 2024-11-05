import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const StorageKey = "storage-key";

const useStore = create(
  persist(
    devtools((set) => ({
      count: 0,
      selectedButton: null,

      setSelectedButton: (button) => set({ selectedButton: button }),
      incrementCount: () => set((state) => ({ count: state.count + 10 })),
      minusCount: () => set((state) => ({ count: state.count - 7 })),
      removeCount: () => set({ count: 0 }),
    }))
  ),
  {
    name: StorageKey,
  }
);

export default useStore;
