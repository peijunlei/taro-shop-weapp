import cache from "@/constant/cache";
import { View, Image, ScrollView, Map, CoverView, CoverImage } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Fragment, useEffect, useRef, useState } from "react";
import { PlaceSearch, getAroundList } from '@/utils/amp-service'
import { debounce } from "lodash";
import locationIcon from '@/assets/image/common/location.png'
import './index.scss'
import { isH5 } from "@/utils";

export default function Index() {
  const [lnglat, setLnglat] = useState<ILocation>({ lng: 0, lat: 0 })
  const [data, setData] = useState<any[]>([])
  const mapRef = useRef<any>(null)

  function initH5() {
    Taro.nextTick(() => {
      const position = Taro.getStorageSync(cache.CURRENT_POSITION)
      mapRef.current = new AMap.Map("address_map", {
        zoom: 16, //地图级别
        center: [position.lng, position.lat], //地图中心点
      });
      async function mapMoveed() {
        const res = mapRef.current?.getCenter().toJSON()
        const center: ILocation = { lng: res[0], lat: res[1] }
        getData(center)
      }
      // mapRef.current.on('moveend', debounce(mapMoveed, 1000))
      mapMoveed()
    })

  }
  function initWeapp() {
    const center = Taro.getStorageSync(cache.CURRENT_POSITION)
    setLnglat(center)
    getData(center)
  }

  function handleClick(item: any) {
    const center = [item.location.lng, item.location.lat]
    mapRef.current?.setZoomAndCenter(16, center, false, 1000)
  }

  async function onMapChange(e) {
    if (e.type === 'end') {
      const center = e.detail.centerLocation
      // getData({ lng: center.longitude, lat: center.latitude })
    }
  }

  async function getData(center: ILocation) {
    Taro.showLoading()
    const res = isH5 ? await PlaceSearch({ lnglat: center, keyword: '' }) : await getAroundList(center) as any
    setData(res)
    Taro.hideLoading()
  }
  useEffect(() => {
    isH5 ? initH5() : initWeapp()

  }, [])
  return (
    <View className='address'>
      {/* <Search></Search> */}
      <View className='map_wrapper'>
        {
          isH5 ? (
            <View id='address_map' />
          ) : (
            <Map
              id='address_map'
              longitude={lnglat.lng}
              latitude={lnglat.lat}
              onRegionChange={onMapChange}
            />
          )
        }
        <Image src={locationIcon} className='icon' />
      </View>
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
