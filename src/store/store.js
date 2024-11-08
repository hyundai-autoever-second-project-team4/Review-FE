import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const StorageKey = "storage-key";

const UserInit = {
  userId: null,
  nickName: "",
  profile: null,
  email: "",
};

const useStore = create(
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

export default useStore;
