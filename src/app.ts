import Taro, { useLaunch } from '@tarojs/taro'
import { PropsWithChildren } from 'react'
import useGlobalStore from './store/useGlobalStore'

import './app.scss'

function App({ children }: PropsWithChildren<any>) {
  const setSystemInfo = useGlobalStore(state => state.setSystemInfo)
  useLaunch((options) => {
    const res = Taro.getSystemInfoSync()
    setSystemInfo(res)
  })
  // children 是将要会渲染的页面
  return children
}

export default App
