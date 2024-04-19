import Taro, { useLaunch } from '@tarojs/taro'
import { PropsWithChildren } from 'react'
import useGlobalStore from './store/useGlobalStore'
import cache  from './constant/cache'
import './app.css'

function App({ children }: PropsWithChildren<any>) {
  const setSystemInfo = useGlobalStore(state => state.setSystemInfo)
  useLaunch((options) => {
    const res = Taro.getSystemInfoSync()
    setSystemInfo(res)
    Taro.setStorageSync(cache.TOKEN, 'eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqEkc1qwzAQhN9FZzdIsmxLuRV6KZSeejQYRVq3IvoxkhwKIe_edSCUtoTuaWG-nRmkMynrgewJGwYuetm2oicNcbqSPRtYSylnvWyIWUtNAfKzRVZQLiVVQh5YZ5XoKMNtaI3sOaM45Jt_NCatsf4JuOmvOsBd8Qmqdv6_SIWJbOu8bEaK77Dwju74VgN9MmwGD6whFXJwUfu3dISIbDcLzqzUZpglM1IpKy3r9dBK2RscvJ9dLvUlvTvkZ-0LNOSk_QqTthbsVCCfnIGCZucRlTJlMCkEiJtWq4vvI9mPxLqiDx5G0oykfrhsp8XrOqccplNargjEe4R38YhZQXv_m9wSHSw_sm7yBevD53L9xq5TAl_l8gUAAP__.oTkhvmEb8-Tm5UUYJIdqKYuCX4Dv7pY0P5Z0EecLkik')
  })
  // children 是将要会渲染的页面
  return children
}

export default App
