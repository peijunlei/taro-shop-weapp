import { View, Image } from "@tarojs/components";
import Taro, { useDidShow, useRouter, usePageScroll } from "@tarojs/taro";
import './index.scss';
import { useEffect, useState } from "react";
import SliderImages from "./components/slider-images";
import useData from "./useData";
import GoodsInfo from "./components/goods-info";
import Specifications from "./components/specifications";
import Address from "./components/address";
import Evaluation from "./components/evaluation";
import GoodsDetailProper from "./components/goods-detail-proper";
import ToTop from "./components/to-top";
import GoodsDetailsContext from "./context";
import { useSetState } from "ahooks";
import { GoodsDetailsProps } from "./types";
import GoodsSpecsPopup from "./components/goods-specs-popup";
import useGoodsDetails from "./useStore";


function Index() {
  const {
    goodsInfo,
    goodsSpecs,
    showSpec,
    goodsInfos,
    images
  } = useGoodsDetails((state) => state);
  const setShowSpec = useGoodsDetails((state) => state.setShowSpec);
  const setGoodsInfo = useGoodsDetails((state) => state.setGoodsInfo);
  const setImages = useGoodsDetails((state) => state.setImages);

  const [state, setState] = useSetState<GoodsDetailsProps>({
    showSpec: false,
  })
  const [showTop, setShowTop] = useState<boolean>(false);

  const { descData } = useData()
  // preloadData 
  useEffect(() => {
    console.log('preloadData', process.env.TARO_APP_API);
  }, [])
  function onScroll(e: any) {
    setShowTop(e.scrollTop >= 300)
  }
  usePageScroll(onScroll)
  useDidShow(() => {

  })
  return (
    <GoodsDetailsContext.Provider value={{ state, setState }}>
      <View className='goods_details' style={{ overflow: showSpec ? 'hidden' : 'unset' }}>
        <SliderImages />
        <GoodsInfo />
        <Specifications />
        <Address />
        <Evaluation />
        <GoodsDetailProper desc={descData} />
        <ToTop showTop={showTop} />
        <GoodsSpecsPopup
          onChangeSku={(specIds, specDetailIds) => {
            //console.log('specId', specIds, specDetailIds)
            const goodsInfo = goodsInfos.find((item) => {
              return item.mockSpecIds.join(',') === specIds.join(',') && item.mockSpecDetailIds.join(',') === specDetailIds.join(',')
            })
            console.log('goodsInfo', goodsInfo)
            if (!goodsInfo) return
            const newImages= [goodsInfo.goodsInfoImg, ...images.slice(1)]
            setImages(newImages)
            setGoodsInfo(goodsInfo)
          }}
          goodsInfo={goodsInfo}
          goodsSpecs={goodsSpecs}
          onAddcart={() => {
            Taro.showToast({
              title: '加入购物车成功',
              icon: 'success',
              duration: 2000
            })
            setShowSpec(false)
          }}
          onBuyNow={() => {
            Taro.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000
            })
            setShowSpec(false)
          }}

        />
      </View>
    </GoodsDetailsContext.Provider>

  )
}

export default Index;