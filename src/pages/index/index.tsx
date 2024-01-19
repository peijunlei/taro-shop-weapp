import { View, Button, WebView } from '@tarojs/components'
import cache from '@/constant/cache'
import { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'

import './index.scss'
import { Geocoder, getGaodeLocation, getLocationBrowser } from '@/utils/amp-service'

export default function Index() {
  const [location, setlocation] = useState({ lng: 0, lat: 0 })
  const [city, setCity] = useState('定位中...')
  const [address, setAddress] = useState('未知')

  async function handleClick(type: 1 | 2) {
    const res = type === 1 ? await getGaodeLocation() : await getLocationBrowser()
    const result = await Geocoder(res)
    setlocation(res)
    setCity(result.cityName);
    setAddress(result.formattedAddress);
    Taro.setStorageSync(cache.CURRENT_POSITION, res)
    Taro.setStorageSync(cache.CURRENT_CITY, { cityName: result.cityName, cityCode: result.cityCode })
  }
  useEffect(() => {
  }, [])
  return (
    <View>
      <View>定位：{JSON.stringify(location)}</View>
      <View>城市：{city}</View>
      <View>详细地址：{address}</View>
      <Button onClick={() => handleClick(1)} >高德定位</Button>
      <Button onClick={() => handleClick(2)} >浏览器定位</Button>

      <Button onClick={() => Taro.navigateTo({ url: '/pages/package-A/select-map/index' })} >选择地图</Button>
    </View>
  )
}
