


import { View, Text } from "@tarojs/components";
import { shallow } from "zustand/shallow";
import useGoodsDetail from "../../useGoodsDetail";




import './index.scss';
import Cell from "@/components/cell";

function GoodsAddress() {
  const { goodsInfo } = useGoodsDetail(state => ({
    goodsInfo: state.goodsInfo
  }), shallow)
  return (
    <View className='goods-detail-address'>
      <Cell
        title='收货地址'
        desc='无'
        onClick={() => {
          console.log(goodsInfo.goodsInfoId)
        }}
      />
    </View>
  )

}
export default GoodsAddress