import { View, Text, Button, Image, ScrollView, ViewProps, GridView } from '@tarojs/components'
import { ComponentType, useEffect, useRef, useState } from 'react'

import { getRandomInt } from '@/utils'
import './index.scss'
import Taro from '@tarojs/taro'

const data = Array.from({ length: 10 })

export default function Index() {
  const [list, setList] = useState(data)
  useEffect(() => {
  }, [list])
  return (
    <View>
      goods
      <Button onClick={
        () => {
          Taro.preload({
            images:[]
          })
          Taro.navigateTo({
            url: '/pages/package-B/goods-detail/index?skuId=402880948ed37541018ed69fe1c10150'
          })
        }
      }
      >跳转</Button>
    </View>

  )
}
