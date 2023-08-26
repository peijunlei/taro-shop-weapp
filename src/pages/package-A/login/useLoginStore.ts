import { createWithEqualityFn } from 'zustand/traditional'

interface LoginState {
  phone: string;
  password: string;
  pcLogo: string;
  showPassword: boolean;
  setState: (val: { key: string, value?: any }) => void;
}

const useLoginStore = createWithEqualityFn<LoginState>()(
  (set) => ({
    showPassword: false,
    phone: '177246833446',
    password: 'Aa123456@',
    pcLogo: '',
    setState: ({ key, value }) => set({ [key]: value }),
  }),
  Object.is
)

export default useLoginStore