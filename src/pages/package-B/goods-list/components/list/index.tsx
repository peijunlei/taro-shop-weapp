import { ScrollView, View } from "@tarojs/components";
import useGoodsList from "../../useStore";

const Threshold = 20;

import './index.scss';
import { useEffect, useMemo, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import GoodsItem from "./goods-item";

const data = Array.from({ length: 20 }).map((_, index) => {
  return {
    id: index,
    goodsInfoName: `商品${index}`,
    marketPrice: (100 + Math.random() * 100),
    goodsInfoImg: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    addCart: Math.random() > 0.5,
  }
})

function List() {
  const { goods, total } = useGoodsList((state) => state);
  function onScrollToUpper() {
    console.log('onScrollToUpper')
  }
  function onScroll() {
    console.log('onScroll')
  }
  const leftList = useMemo(() => {
    return goods.filter((_, index) => index % 2 === 0)
  } , [goods])
  const rightList = useMemo(() => {
    return goods.filter((_, index) => index % 2 === 1)
  } , [goods])
  return (
    <ScrollView
      className='scrollview'
      scrollY
      scrollWithAnimation
      lowerThreshold={Threshold}
      onScrollToUpper={onScrollToUpper}
      onScroll={onScroll}
      enableFlex
    >
      <View className='list'>
        <View className='left_list'>
          {
            leftList.map((item, index) => {
              return (
                <GoodsItem key={index} item={item.goodsInfo} />
              );
            })
          }
        </View>
        <View className='right_list'>
          {
            rightList.map((item, index) => {
              return (
                <GoodsItem key={index} item={item.goodsInfo} />

              );
            })
          }
        </View>
      </View>
    </ScrollView>
  );
}

export default List;