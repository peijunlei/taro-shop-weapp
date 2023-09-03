import { Swiper, SwiperItem, Image, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";
import useGoodsDetail from "./useGoodsDetail";
import GoodsSwiper from "./components/swiper";
import { fetchGoodsDetail, fetchGoodsIsFollow } from "./webapi";
import { PullDownRefresh } from "@/components";
import useGlobalStore from "@/store/useGlobalStore";
import { shallow } from "zustand/shallow";
import { isLogin } from "@/utils";
import GoodsInfo from "./components/goods-info";
import GoodsSpec from "./components/goods-spec";
import './index.scss';
import GoodsAddress from "./components/address";
import SpecModal, { SpecOpenTypeTypeEnum } from "@/pages/commonComp/spec-modal";

function Index() {
  const [refresh, setRefresh] = useState(false)

  const { params } = useRouter<{ skuId: string }>()
  const setState = useGoodsDetail(state => state.setState)
  const initIsFollow = useGoodsDetail(state => state.initIsFollow)
  const { specVisible, goodsInfo } = useGoodsDetail(state => ({
    goodsSpecDetails: state.goodsSpecDetails,
    specVisible: state.specVisible,
    goodsInfo: state.goodsInfo,

  }), shallow)

  function onPullDownRefresh() {
    init()
  }
  async function getGoodsDetail(skuId: string) {
    Taro.showLoading()
    const res = await fetchGoodsDetail(skuId) as any
    setState({
      goods: res.goods,
      goodsSpecs: res.goodsSpecs,
      goodsSpecDetails: res.goodsSpecDetails,
      goodsInfos: res.goodsInfos,
      goodsInfo: res.goodsInfos.find(v => v.goodsInfoId === params.skuId),
      images: (res.images as any[]).length > 0 ? res.images : (res.goodsInfos.map(v => ({ artworkUrl: v.goodsInfoImg })))
    })

    setRefresh(false)
    Taro.hideLoading()
  }
  function init() {
    getGoodsDetail(params.skuId)
    initIsFollow(params.skuId)
  }
  useEffect(() => {
    setState({ skuId: params.skuId })
    init()
  }, [])

  return (
    <>
      <PullDownRefresh
        className='PullDownRefresh'
        trigger={refresh}
        onTriggerChange={(val) => {
          setRefresh(val)
        }}
        onPullDownRefresh={onPullDownRefresh}
      >
        <View className='goods-detail'>
          <View className='goods-detail-top'>
            <GoodsSwiper />
          </View>
          <GoodsInfo />
          <GoodsSpec />
          <GoodsAddress />
        </View>
      </PullDownRefresh>
      <SpecModal
        goodsInfo={goodsInfo}
        visible={specVisible}
        openType={SpecOpenTypeTypeEnum.GOODS_SPEC}
        onClose={() => setState({ specVisible: false })}
      />
    </>
  )
}

export default Index;