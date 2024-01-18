import cache from "@/constant/cache";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useRef } from "react";

import './index.scss'
import { debounce } from "lodash";

export default function About() {
  const mapRef = useRef<any>(null)
  useEffect(() => {
    Taro.nextTick(() => {
      const position = Taro.getStorageSync(cache.CURRENT_POSITION)
      const center = [position.lng, position.lat]
      mapRef.current = new AMap.Map("map", {
        zoom: 16, //地图级别
        center: center, //地图中心点
      });
      const marker = new AMap.Marker({
        position: new AMap.LngLat(position.lng, position.lat), //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "定位位置",
      });
      //将创建的点标记添加到已有的地图实例：
      mapRef.current.add(marker);
      function mapMoveed(e) {
        const res = mapRef.current?.getCenter().toJSON()
        console.log(res);
      }
      mapRef.current.on('moveend', debounce(mapMoveed, 1000))
    })

  }, [])
  return (
    <View>
      <View id='map'></View>
      <Button onClick={() => {
        const position = Taro.getStorageSync(cache.CURRENT_POSITION)
        const center = [position.lng, position.lat]
        mapRef.current?.setZoomAndCenter(16,center, false, 1000)
      }}
      >回到当前位置</Button>
    </View>
  )
}
