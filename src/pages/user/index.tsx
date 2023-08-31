import { View, Text, Button, Image } from '@tarojs/components'
import Taro, { eventCenter, useDidShow } from '@tarojs/taro'
import useUserInfo from '@/store/useUserInfo'


import { LoginPage } from '@/utils/pages'
import useUserCenterStore from './useUserCenterStore'
import { useEffect } from 'react'
import { findCustomerCenterInfo } from './webapi'
import './index.scss'
import defaultAvatar from '@/assets/image/common/default-avatar.png'
import { isLogin } from '@/utils'
import { Cache } from '@/constant/cache'

export default function Index() {
  const customer = useUserCenterStore(state => state.customer)
  const setState = useUserCenterStore(state => state.setState)
  async function init() {
    if (isLogin()) {
      Taro.showLoading()
      const res = await findCustomerCenterInfo()
      Taro.hideLoading()
      setState({ customer: res })
    } else {
      setState({ customer: {} })
    }
  }
  // useEffect(() => {
  //   eventCenter.on('userCenterRefresh', () => {
  //     init()
  //   })
  //   init()
  // }, [])
  useDidShow(()=>{
    init()
  })

  return (
    <View className='user-center'>
      <View className='user-center-top'>
        <View className='user-info'>
          <View className='user-img-box'>
            <Image className='user-img' src={customer.headImg || defaultAvatar} />
          </View>
          <View
            className='user-account-box'
            onClick={() => {
              if (!isLogin()) {
                Taro.navigateTo({ url: LoginPage() })
              }else{
                Taro.removeStorageSync(Cache.TOKEN)
                Taro.removeStorageSync(Cache.LOGIN_DATA)
                init()

              }
            }}
          >
            <Text className='user-name'>{isLogin() ? customer.customerName : "登录"}</Text>
          </View>
        </View>
      </View>
    </View>

  )
}
