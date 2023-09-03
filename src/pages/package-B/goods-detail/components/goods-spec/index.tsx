


import { View, Text } from "@tarojs/components";
import { shallow } from "zustand/shallow";
import useGoodsDetail from "../../useGoodsDetail";




import './index.scss';
import Cell from "@/components/cell";
import { IGoodsInfo, IGoodsSpecDetailItem,  } from "../../type";
import { useEffect, useMemo } from "react";
import { SpecOpenTypeTypeEnum } from "@/pages/commonComp/spec-modal";



function getSpecName(goodsInfo: Partial<IGoodsInfo>, _goodsSpecDetails?: IGoodsSpecDetailItem[]): string {
  let str = ''
  if (!goodsInfo.mockSpecDetailIds || !_goodsSpecDetails) str = '无';
  goodsInfo.mockSpecDetailIds?.map(item => {
    const specItem = _goodsSpecDetails?.find(v => v.specDetailId === item)
    str += specItem?.detailName + ' '
  })
  return str
}


function GoodsSpec() {
  const setState = useGoodsDetail(state => state.setState)
  const { goodsSpecDetails, goodsInfo } = useGoodsDetail(state => ({
    goodsInfos: state.goodsInfos,
    goodsSpecs: state.goodsSpecs,
    goodsSpecDetails: state.goodsSpecDetails,
    goodsInfo: state.goodsInfo
  }), shallow)
  const specName = useMemo(() => {
    return getSpecName(goodsInfo, goodsSpecDetails)
  }, [goodsSpecDetails, goodsInfo])


  return (
    <View className='goods-detail-spec'>
      <Cell
        title='规格'
        desc={specName}
        onClick={() => {
          setState({ specVisible: true, specType: SpecOpenTypeTypeEnum.GOODS_SPEC })
        }}
      />
    </View>
  )

}
export default GoodsSpec