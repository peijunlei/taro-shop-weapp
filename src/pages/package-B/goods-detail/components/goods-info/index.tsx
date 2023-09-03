


import { View, Text } from "@tarojs/components";
import { shallow } from "zustand/shallow";
import useGoodsDetail from "../../useGoodsDetail";




import './index.scss';
import { IconFont } from "@/components";
import { addGoodsFollow, delGoodsFollow } from "../../webapi";
import Taro from "@tarojs/taro";
import Price from "@/pages/commonComp/price";

function GoodsInfo() {
  const setState = useGoodsDetail(state => state.setState,)
  const { goodsInfo, isFollow } = useGoodsDetail(state => ({
    goodsInfo: state.goodsInfo,
    isFollow: state.isFollow
  }), shallow)

  async function toggleGoodsFollow() {
    isFollow ? await delGoodsFollow(goodsInfo.goodsInfoId!) : await addGoodsFollow(goodsInfo.goodsInfoId!)
    setState({ isFollow: !isFollow })
    Taro.showToast({
      title: isFollow ? '取消收藏' : "收藏成功",
      icon: 'none',
      duration: 1000
    })
  }
  return (
    <View className='goods-detail-info'>
      <View style={{
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      >
        <View className='goods-price'>
          <Price price={goodsInfo.marketPrice || 0} />
        </View>
        <View className='goods-follow' onClick={toggleGoodsFollow} >
          <IconFont value={isFollow ? 'no-love' : 'love'} className='icon' size={14} color={isFollow ? '#40a9ff' : '#333'} />
          {isFollow ? '已收藏' : "收藏"}
        </View>
      </View>
      <View className='goods-name'>
        {goodsInfo.goodsInfoName}
      </View>
    </View>
  )

}
export default GoodsInfo