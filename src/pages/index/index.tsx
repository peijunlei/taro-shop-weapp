import { View, Button, WebView } from '@tarojs/components'
import cache from '@/constant/cache'
import { useState, useEffect, Fragment } from 'react'
import Taro from '@tarojs/taro'

import './index.scss'
import { CitySearch, Geocoder, getGaodeLocation, getLocationBrowser, getRegeo, getrRegeo } from '@/utils/amp-service'
import { isH5, isWeapp } from '@/utils'

const locationMap = {
  0: getGaodeLocation,
  1: getLocationBrowser,
}
export default function Index() {
  const [location, setlocation] = useState({ lng: 0, lat: 0 })
  const [city, setCity] = useState('定位中...')
  const [address, setAddress] = useState('未知')

  async function handleClick(type: 1 | 0) {
    const res = await locationMap[type]()
    const result = await Geocoder(res)
    setlocation(res)
    setCity(result.cityName);
    setAddress(result.formattedAddress);
    Taro.setStorageSync(cache.CURRENT_POSITION, res)
    Taro.setStorageSync(cache.CURRENT_CITY, { cityName: result.cityName, cityCode: result.cityCode })
  }

  async function getCity() {
    const res = await CitySearch()
    setCity(res.cityName)
    setAddress('')
  }

  function getWeappLocation() {
    Taro.showLoading({ title: '定位中...' })
    Taro.getLocation({
      type: 'gcj02',
      success: async (res) => {
        const center = { lng: res.longitude, lat: res.latitude }
        const result = await getRegeo(center)
        setlocation(center)
        setCity(result.cityName);
        setAddress(result.formattedAddress);
        Taro.setStorageSync(cache.CURRENT_POSITION, { lng: res.longitude, lat: res.latitude })
        Taro.hideLoading()
      },
    })
  }

  function handleSelectMap() {
    const url = isH5 ? '/pages/package-A/select-map/index' : '/pages/package-A/select-map/index'
    Taro.navigateTo({ url })
  }
  useEffect(() => {
  }, [])
  return (
    <View>
      <View>定位：{JSON.stringify(location)}</View>
      <View>城市：{city}</View>
      <View>详细地址：{address}</View>
      {
        isH5 ? (
          <Fragment>
            <Button onClick={() => handleClick(0)} >高德定位</Button>
            <Button onClick={() => handleClick(1)} >浏览器定位</Button>
            <Button onClick={() => getCity()} >城市定位</Button>

          </Fragment>
        ) : (
          <Fragment>
            <Button onClick={getWeappLocation} >小程序定位</Button>
          </Fragment>
        )
      }
      <Button onClick={handleSelectMap} >选择地图</Button>
    </View>
  )
}
