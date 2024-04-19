import { View, Image, Text } from "@tarojs/components";



import './index.scss';
import { GoodsInfoItem } from "types/goods";
import Price from "@/components/Price";
import { IconFont } from "@/components";

import defaultImg from '@/assets/image/common/goods_none.png';
import Taro from "@tarojs/taro";

interface GoodsItemProps {
  item: GoodsInfoItem,
  showAddCart?: boolean
}
function GoodsItem(props: GoodsItemProps) {
  const { item, showAddCart } = props;
  const { goodsInfoName, marketPrice, goodsInfoImg } = item;
  return (
    <View className='goods_item'>
      <View className='img_box' onClick={()=>{
        Taro.navigateTo({
          url:`/pages/package-B/goods-detail/index?skuId=${item.goodsInfoId}`
        })
      }}
      >
        <Image src={goodsInfoImg || defaultImg} className='goods_img' mode='aspectFill' />
      </View>
      <View className='goods_body'>
        <View className='goods_name'>
          {goodsInfoName}
        </View>
        <Price price={marketPrice} />
        {
          showAddCart && (
            <View className='add_cart'>
              <IconFont value='jiahao' color='var(--theme-color)' size={20} />
            </View>

          )
        }
      </View>
    </View>

  );
}

export default GoodsItem;