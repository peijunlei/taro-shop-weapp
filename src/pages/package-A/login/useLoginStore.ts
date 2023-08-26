import { createWithEqualityFn } from 'zustand/traditional'

interface LoginState {
  phone: string;
  password: string;
  pcLogo: string;
  showPassword: boolean;
}
interface LoginActions {
  setState: (updates: Partial<LoginState>) => void;
}
const defaultState: LoginState = {
  showPassword: false,
  phone: '177246833446',
  password: 'Aa123456@',
  pcLogo: '',
};
const useLoginStore = createWithEqualityFn<LoginState & LoginActions>()(
  (set) => ({
    ...defaultState,
    setState: (updates) => set((prev) => ({
      ...prev,
      ...updates,
    })),
  }),
  Object.is
)

export default useLoginStore