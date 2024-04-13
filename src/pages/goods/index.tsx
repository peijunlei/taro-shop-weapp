import { View, Text, Button, Image, ScrollView, ViewProps, GridView } from '@tarojs/components'
import { ComponentType, useEffect, useRef, useState } from 'react'

import { getRandomInt } from '@/utils'
import './index.scss'
import { NavigationBar } from '@/components'
import Taro from '@tarojs/taro'

const data = Array.from({ length: 10 })

export default function Index() {
  const [list, setList] = useState(data)
  useEffect(() => {
  }, [list])
  return (
    <View>
      goods
    </View>

  )
}
