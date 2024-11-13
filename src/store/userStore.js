import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const StorageKey = "storage-key";

const UserInit = {
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
      user: UserInit,

      setUser: (newUser) => set({ user: newUser }),
      logOut: () => set({ user: UserInit }),
    }))
  ),
  {
    name: StorageKey,
  }
);

export default useUserStore;
