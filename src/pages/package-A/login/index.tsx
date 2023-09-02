


import NavigationBar from '@/components/navigation-bar'
import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useDidShow, useError } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import LoginForm from './components/login-form'
import { findBaseConfig } from '@/pages/api/common'
import useLoginStore from './useLoginStore'
import { PullDownRefresh } from '@/components'

import './index.scss'

export default function Login() {
  const setState = useLoginStore(state => state.setState)

  const [refresh, setRefresh] = useState(false)
  function onPullDownRefresh() {
    init()
  }
  async function init() {
    Taro.showLoading()
    findBaseConfig().then(res => {
      setRefresh(false);
      setState({
        pcLogo: res.pcLogo && JSON.parse(res.pcLogo)[0].url
      })
      Taro.hideLoading()
    })
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <View className='page'>
      <NavigationBar title='登录' />
      <PullDownRefresh
        className='PullDownRefresh'
        trigger={refresh}
        onTriggerChange={(val) => {
          setRefresh(val)
        }}
        onPullDownRefresh={onPullDownRefresh}
      >
        <View className='login'>
          <LoginForm />
        </View>
      </PullDownRefresh>
    </View >
  )
}
