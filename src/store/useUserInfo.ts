import { create } from "zustand";

interface UserInfoState {
  userInfo?: any;
  setUserInfo: (val: any) => void;
}
const useUserInfo = create<UserInfoState>()(
  (set) => ({
    userInfo: null,
    setUserInfo: (val) => set({ userInfo: val }),
  })
)

export default useUserInfo