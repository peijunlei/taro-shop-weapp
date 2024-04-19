import { memo, useMemo } from "react";
import Popup from "@/components/popup";
import useGoodsDetails from "../../useStore";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import Price from "@/components/Price";
import cn from 'classnames';


import './index.scss';
import InputNumber from "@/components/input-number";
import ViewBox from "@/components/box";
import { GoodsInfoType, goodsSpecsType } from "../../types";
import Taro from "@tarojs/taro";
import defaultImg from '@/assets/image/common/goods_none.png'

interface GoodsSpecsPopupProps {
  goodsInfo: GoodsInfoType;
  goodsSpecs: goodsSpecsType[];
  onAddcart?: () => void;
  onBuyNow?: () => void;
  onChangeSku: (specIds: number[], specDetailIds: number[]) => void;
}
function GoodsSpecsPopup(props: GoodsSpecsPopupProps) {

  const { onAddcart, onBuyNow, goodsInfo, goodsSpecs, onChangeSku } = props;
  const { showSpec, setShowSpec } = useGoodsDetails((state) => state);
  function handlePreview() {
    Taro.previewImage({
      current: goodsInfo.goodsInfoImg, // 当前显示图片的http链接
      urls: [goodsInfo.goodsInfoImg] // 需要预览的图片http链接列表
    })
  }


  if (!goodsInfo) return null;
  return (
    <Popup visible={showSpec} onClose={() => setShowSpec(false)} >
      <View className='goods_specs_popup'>
        <View className='up_body'>
          <View className='row info'>
            <Image src={goodsInfo.goodsInfoImg||defaultImg} className='img' onClick={handlePreview} />
            <Price price={goodsInfo.marketPrice} />
          </View>
          <ScrollView className='row specs' scrollY>
            {
              goodsSpecs.map((item) => {
                return (
                  <View className='spec_item' key={item.specId}>
                    <View className='spec_name'>{item.specName}</View>
                    <View className='spec_detail'>
                      {
                        item.specDetails.map((detail) => {
                          const active = goodsInfo.mockSpecIds.includes(item.specId) && goodsInfo.mockSpecDetailIds.includes(detail.specDetailId);
                          return (
                            <ViewBox
                              onClick={() => {
                                const mockSpecDetailIds = goodsInfo.mockSpecDetailIds
                                const arr = mockSpecDetailIds.filter(
                                  (id) => !item.specDetails.some((detail) => detail.specDetailId === id)
                                )
                                const newSpecDetailIds = arr.concat(detail.specDetailId).sort()
                                onChangeSku(goodsInfo.mockSpecIds, newSpecDetailIds)
                              }}
                              className={cn('spec_detail_item', { active: active })}
                              key={detail.specDetailId}
                              borerColor={active ? '#f2270c' : '#f2f2f2'}
                              borderRadius={28}
                            >
                              {detail.detailName}
                            </ViewBox>
                          )
                          //return <View className={cn('spec_detail_item', { active: true })} key={detail.specDetailId}>{detail.detailName}</View>
                        })
                      }
                    </View>
                  </View>

                )
              })
            }
          </ScrollView>
          <View className='row purchase'>
            <View>
              数量
              <Text className='stock'>{`库存${goodsInfo.stock}${goodsInfo.goodsUnit}`}</Text>
            </View>
            <InputNumber
              value={1}
              onChange={(value) => {
                console.log('onChange', value)
              }}
            />
          </View>
        </View>
        <View className='row bottoms'>
          <View className='bottom_item add_cart' onClick={onAddcart}>加入购物车</View>
          <View className='bottom_item buy_now' onClick={onBuyNow}>立即购买</View>
        </View>
      </View>

    </Popup>
  );
}

export default memo(GoodsSpecsPopup);