import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import useUserInfo from '@/store/useUserInfo'


import './index.scss'

export default function Index() {
  const userInfo = useUserInfo(state => state.userInfo)
  console.log( process.env.TARO_APP_ID)
  return (
    <View>
      <Button onClick={() => {
        Taro.navigateTo({
          url: '/pages/package-A/login/index'
        })
      }}
      >登录</Button>
    </View>
  )
}
