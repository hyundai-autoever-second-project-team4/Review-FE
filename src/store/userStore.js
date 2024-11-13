import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const StorageKey = "storage-key";

const UserInit = {
  userId: null,
  name: "",
  profile: null,
  email: "",
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
