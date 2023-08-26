


import NavigationBar from '@/components/navigation-bar'
import PullDownRefresh from '@/components/pull-down-refresh/pull-down-refresh'
import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useDidShow, useError } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import LoginForm from './components/login-form'
import { findBaseConfig } from '@/pages/api/common'
import useLoginStore from './useLoginStore'

import './index.scss'

export default function Login() {
  const setState = useLoginStore(state => state.setState)

  const [refresh, setRefresh] = useState(false)
  function onPullDownRefresh() {
    Taro.showLoading()
    setTimeout(() => {
      setRefresh(false);
      Taro.hideLoading()
    }, 2000);
  }
  async function init() {
    findBaseConfig().then(res => {
      setState({
        pcLogo: res.pcLogo && JSON.parse(res.pcLogo)[0].url
      })
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
