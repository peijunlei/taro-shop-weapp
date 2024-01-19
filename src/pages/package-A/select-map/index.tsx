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

  function init() {
    Taro.nextTick(() => {
      const position = Taro.getStorageSync(cache.CURRENT_POSITION)
      mapRef.current = new AMap.Map("address_map", {
        zoom: 16, //地图级别
        center: [position.lng, position.lat], //地图中心点
      });
      async function mapMoveed() {
        Taro.showLoading()
        const res = mapRef.current?.getCenter().toJSON()
        const center: ILocation = { lng: res[0], lat: res[1] }
        const result = await PlaceSearch({ lnglat: center, keyword: '' }) as any
        console.log(result);
        Taro.hideLoading()
        setData(result)
      }
      // mapRef.current.on('moveend', debounce(mapMoveed, 1000))
      mapMoveed()
    })

  }


  function handleClick(item: any) {
    const center = [item.location.lng, item.location.lat]
    mapRef.current?.setZoomAndCenter(16, center, false, 1000)
  }
  useEffect(() => {
    init()
  }, [])
  return (
    <View className='address'>
      {/* <Search></Search> */}
      <View id='address_map' />
      <Image src={locationIcon} className='icon' />
      <ScrollView scrollY className='address_list'>
        {
          data.map((item, index) => (
            <View key={index} className='item' onClick={() => handleClick(item)}>
              <View className='item_name'>{item.name}</View>
              <View className='item_address'>{item.address}</View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}
