import { View, Button, WebView } from '@tarojs/components'
import cache from '@/constant/cache'
import { useState,useEffect } from 'react'
import Taro from '@tarojs/taro'

import './index.scss'

export default function Index() {
  const [location, setlocation] = useState({ lng: 0, lat: 0 })
  function getLocation() {
    return new Promise<ILocation>((resolve, reject) => {
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大

        })
        geolocation.getCurrentPosition(function (status, result) {
          console.log(result);
          if (status == 'complete') {
            resolve({ lng: result.position.lng, lat: result.position.lat })
          } else {
            reject(result)
          }
        });
      })

    })

  }
  function getLocationBrowser() {
    return new Promise<ILocation>((resolve, reject) => {
      function geoShowPosition(position) {
        if (position) {
          const data = { lng: position.coords.longitude, lat: position.coords.latitude };
          resolve(data);
        } else {
          reject()
        }
      }

      function geoShowError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            // 用户拒绝授权
            alert("我们需要您的位置权限来提供更好的服务，请允许使用地理位置信息。");
            break;
          case error.POSITION_UNAVAILABLE:
            // 位置信息不可用
            alert("无法获取您的位置信息，请检查设备设置。");
            break;
          case error.TIMEOUT:
            // 请求超时
            alert("请求地理位置信息超时，请重试。");
            break;
          case error.UNKNOWN_ERROR:
            // 未知错误
            alert("发生未知错误，无法获取您的位置。");
            break;
        }
        reject(error);
      }

      navigator.geolocation.getCurrentPosition(geoShowPosition, geoShowError);
    });


  }
  async function handleClick(type: 1 | 2) {
    const res = type === 1 ? await getLocation() : await getLocationBrowser()
    setlocation(res)
    Taro.setStorageSync(cache.CURRENT_POSITION, res)
  }
  useEffect(()=>{
  },[])
  return (
    <View>
      <View>定位：{JSON.stringify(location)}</View>
      <Button onClick={() => handleClick(1)} >高德定位</Button>
      <Button onClick={() => handleClick(2)} >浏览器定位</Button>

      <Button onClick={() => Taro.navigateTo({ url: '/pages/package-A/select-map/index' })} >选择地图</Button>
    </View>
  )
}
