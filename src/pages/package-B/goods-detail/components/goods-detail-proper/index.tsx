import { View, RichText } from "@tarojs/components";

import './index.scss';
import Empty from "@/components/empty";
import { useMemo } from "react";


interface GoodsDetailProperProps {
  desc: string;
}
function GoodsDetailProper(props: GoodsDetailProperProps) {
  const { desc } = props;
  const data = useMemo(() => {
    const str = desc.replace(/<img/g, '<img style="max-width:100%;height:auto";vertical-align:bottom;')
    return str
  } , [desc])
  return (
    <View className='goods_detail_proper'>
      <View className='title'> ———— 商品详情 ————  </View>
      <View className='con'>
        {
          desc ? (
            <RichText nodes={data} />
          ) : (
            <Empty desc='暂无图文' />
          )
        }
      </View>

    </View>
  )
}

export default GoodsDetailProper;