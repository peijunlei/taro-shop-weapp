import { createWithEqualityFn } from 'zustand/traditional'

interface UserCenterState {
  customer: any;
}
interface UserCenterActions {
  setState: (updates: Partial<UserCenterState>) => void;
}
const defaultState: UserCenterState = {
  customer: {},
};
const useUserCenterStore = createWithEqualityFn<UserCenterState & UserCenterActions>()(
  (set) => ({
    ...defaultState,
    setState: (updates) => set((prev) => ({
      ...prev,
      ...updates,
    })),
  }),
  Object.is
)

export default useUserCenterStore