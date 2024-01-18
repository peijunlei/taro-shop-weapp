import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

import './index.scss'

export interface NavigationBarProps {
  showBack?: boolean;
  title: string;
  onBack?: () => void;
}

export default function NavigationBar(props: NavigationBarProps) {

  const { showBack = true, title, onBack = back } = props
  const [data, setData] = useState<{ statusBarHeight?: number; paddingRight: number, leftWidth: number; paddingLeft: number; navBarHeight: number }>({
    statusBarHeight: 0,
    paddingRight: 0,
    paddingLeft: 0,
    leftWidth: 0,
    navBarHeight: 0
  })
  const { statusBarHeight, paddingRight, paddingLeft, leftWidth, navBarHeight } = data;
  function back() {
    // 细化逻辑
    Taro.navigateBack()
  }
  useEffect(() => {
    const rect = Taro.getMenuButtonBoundingClientRect()
    Taro.getSystemInfo({
      success: (res) => {
        console.log(res, rect)
        setData({
          // 状态栏高度
          statusBarHeight: res.statusBarHeight,
          // 胶囊按钮宽 + 右侧的间距
          paddingRight: res.windowWidth - rect.left,
          // 左侧的宽度
          leftWidth: res.windowWidth - rect.left,
          // navBar高度
          navBarHeight: rect.bottom + rect.top - (res.statusBarHeight || 0),
          // navBar的左padding
          paddingLeft: res.windowWidth - rect.right
        })
      }
    })
  }, [])
  return (
    <View className='navigation-bar'>
      <View
        className='navigation-bar__inner'
        style={{ paddingTop: statusBarHeight, height: navBarHeight, paddingRight, paddingLeft }}
      >
        <View className='left' style={{ width: leftWidth }}  >
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
