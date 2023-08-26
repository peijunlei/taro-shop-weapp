
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const myMiddlewares = (f) => immer(devtools(f))



