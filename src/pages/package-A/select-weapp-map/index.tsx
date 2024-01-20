import cache from "@/constant/cache";
import { View, Image, ScrollView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { PlaceSearch } from '@/utils/amp-service'
import { debounce } from "lodash";
import locationIcon from '@/assets/image/common/location.png'
import './index.scss'

export default function About() {
  const [data, setData] = useState([])
  const mapRef = useRef<any>(null)

  useEffect(() => {
  }, [])
  return (
    <View className='address'>
      weapp
    </View>
  )
}
