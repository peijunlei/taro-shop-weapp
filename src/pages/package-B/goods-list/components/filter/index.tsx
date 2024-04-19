import { View, Image } from "@tarojs/components";

import { useState } from "react";
import cn from "classnames";
import useGoodsList from "../../useStore";
import FilterPopup from "./filter-popup";
import icon1 from '@/assets/image/goods-list/filter_down.png'
import icon2 from '@/assets/image/goods-list/filter_up.png'

// 价格排序
import icon3 from '@/assets/image/goods-list/filter_group_down.png'
import icon4 from '@/assets/image/goods-list/filter_group_up.png'
import icon5 from '@/assets/image/goods-list/filter_group.png'

// 筛选
import icon6 from '@/assets/image/goods-list/filter.png'
import './index.scss';
import ScreenpPopup from "../screen-popup";

type PriceIndexType = 0 | 1 | null

const list = [
  { label: '综合', value: 0 },
  { label: '销量', value: 1 },
  { label: '价格', value: 2 },
  { label: '筛选', value: 3 },
]
function Filter() {
  const { filterVisible, setFilterVisible } = useGoodsList((state) => state)
  const [screenVisible, setScreenVisible] = useState(false)
  const [options, setOptions] = useState(list)
  const [activeIndex, setActiveIndex] = useState(0)
  const [priceActiveIndex, setPriceActiveIndex] = useState<PriceIndexType>(0)
  function handleClick(index: number) {
    const value = options[index].value
    setActiveIndex(value)
    if (index === 0) {
      setFilterVisible(!filterVisible)
    } else {
      setFilterVisible(false)
    }
    if (index === 2) {
      setPriceActiveIndex(priceActiveIndex === 0 ? 1 : 0)
    } else {
      setPriceActiveIndex(0)
    }
    if (index === 3) {
      setScreenVisible(true)
    }
  }
  return (
    <View className='goods_list_filter'>
      <View className='filter_list'>
        {
          options.map((item, index) => {
            return (
              <View
                className={cn('filter_item', {
                  active: index === 3 ? false : item.value === activeIndex
                })}
                key={item.value}
                onClick={() => handleClick(index)}

              >
                {item.label}
                {
                  index === 0 &&
                  <Image
                    src={item.value === activeIndex ? icon1 : icon2}
                    className={cn('filter_icon icon1', {
                      active: filterVisible
                    })}
                  />
                }
                {
                  index === 2 &&
                  <Image
                    src={item.value === activeIndex ? (priceActiveIndex === 0 ? icon3 : icon4) : icon5}
                    className='filter_icon icon1'
                  />
                }
                {
                  index === 3 &&
                  <Image
                    src={item.value === activeIndex ? icon6 : icon6}
                    className='filter_icon icon1'
                  />
                }
              </View>
            )
          })
        }
      </View>
      <FilterPopup
        activeIndex={activeIndex}
        onOverlayClick={() => setFilterVisible(false)}
        visible={filterVisible}
        onChange={(item) => {
          setOptions([
            item,
            ...options.slice(1, 4)
          ])
          setActiveIndex(item.value)
          setFilterVisible(false)
        }}
      />
      <ScreenpPopup
        visible={screenVisible}
        setScreenVisible={setScreenVisible}
      />

    </View>
  );
}

export default Filter;