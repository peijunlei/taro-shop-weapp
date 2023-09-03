import Popup from "@/components/popup"
import { ScrollView, View, Image } from "@tarojs/components";
import logo from '@/assets/image/common/logo.png'

import './index.scss'
import Price from "../price";
import { IGoodsInfo } from "@/pages/package-B/goods-detail/type";

export enum SpecOpenTypeTypeEnum {
  /**规格 */
  GOODS_SPEC = 0,
  /**商品详情底部 */
  GOODS_BOTTOM = 1,
}
interface SpecModalProps {
  goodsInfo: Partial<IGoodsInfo>
  openType: SpecOpenTypeTypeEnum
  visible: boolean;
  onClose: () => void
}
function SpecModal(props: SpecModalProps) {
  const {
    visible,
    onClose,
    openType,
    goodsInfo
  } = props
  return (
    <Popup
      visible={visible}
      style={{ height: '60vh' }}
      onClose={onClose}
    >
      <ScrollView className='spec-modal' scrollY>
        <View className='spec-top'>
          <Image src={goodsInfo.goodsInfoImg || logo} className='img' mode='aspectFit' />
          <Price price={goodsInfo.marketPrice || 0} style={{ marginBottom: 10 }} />
        </View>
      </ScrollView>
    </Popup>
  )
}


export default SpecModal