import Taro, { useLaunch } from '@tarojs/taro'
import { PropsWithChildren } from 'react'

import './app.scss'
import useGlobalStore from './store/useGlobalStore'

function App({ children }: PropsWithChildren<any>) {
  const setSystemInfo = useGlobalStore(state => state.setSystemInfo)
  useLaunch(() => {
    const res = Taro.getSystemInfoSync()
    setSystemInfo(res)
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
