import { create } from "zustand";

interface GlobalState {
  systemInfo: Taro.getSystemInfoSync.Result | null;
  setSystemInfo: (val: any) => void;
}
const useGlobalStore = create<GlobalState>()(
  (set) => ({
    systemInfo: null,
    setSystemInfo: (val: Taro.getSystemInfoSync.Result) => set({ systemInfo: val }),
  })
)

export default useGlobalStore