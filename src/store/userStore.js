import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const StorageKey = "storage-key";

const userInit = {
  id: null,
  email: null,
  name: null,
  profileImage: null,
  social: null,
  badge: null,
  tier: null,
};

const useUserStore = create(
  persist(
    devtools((set) => ({
      user: userInit,

      setUser: (newUser) => set({ user: newUser }),
      logOut: () => set({ user: userInit }),
    }))
  ),
  {
    name: StorageKey,
  }
);

export default useUserStore;
