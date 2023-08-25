import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

import './index.scss'

export interface NavigationBarProps {
  showBack?: boolean;
  title: string;
  onBack?: () => void;
}

function NavigationBar(props: NavigationBarProps) {

  const { showBack = true, title, onBack = back } = props
  const [data, setData] = useState<{ statusBarHeight?: number; paddingRight: number, leftWidth: number; navBarHeight: number }>({
    statusBarHeight: 0,
    paddingRight: 0,
    leftWidth: 0,
    navBarHeight: 0
  })
  const { statusBarHeight, paddingRight, leftWidth, navBarHeight } = data;
  function back() {
    Taro.navigateBack()
  }
  useEffect(() => {
    const rect = Taro.getMenuButtonBoundingClientRect()
    Taro.getSystemInfo({
      success: (res) => {
        setData({
          statusBarHeight: res.statusBarHeight,
          paddingRight: res.windowWidth - rect.left,
          leftWidth: res.windowWidth - rect.left,
          navBarHeight: rect.bottom + rect.top - (res.statusBarHeight || 0),
        })
      }
    })
  }, [])
  return (
    <View className='navigation-bar'>
      <View
        className='navigation-bar__inner'
        style={{ paddingTop: statusBarHeight, height: navBarHeight, paddingRight }}
      >
        <View
          className='left'
          style={{ width: leftWidth }}
        >
          {
            showBack && <View className='back' onClick={onBack} />
          }
        </View>

        <View className='center'>
          <Text>{title}</Text>
        </View>

      </View>
    </View >
  )
}

export default NavigationBar;