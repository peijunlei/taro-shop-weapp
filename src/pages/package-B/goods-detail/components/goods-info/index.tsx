import { View } from "@tarojs/components";
import { GoodsInfoType, GoodsType } from "../../types";
import Price from "@/components/Price";
import cn from 'classnames';
import './index.scss';
import useGoodsDetails from "../../useStore";

function GoodsInfo() {
  const { goods, goodsInfo,loading } = useGoodsDetails((state) => state);
  let { goodsName, goodsSubtitle, goodsLabelList } = goods;
  const { marketPrice } = goodsInfo;
  goodsLabelList = !loading ? goodsLabelList : Array.from({ length: 5 }, () => ({ labelName: '' })) as GoodsType['goodsLabelList']
  return (
    <View className='goods_info'>
      <View className='row'>
        <Price price={marketPrice} />
      </View>
      <View className='row goods_label_list'>
        {
          goodsLabelList.map((item) => {
            return <View key={item.goodsLabelId} className={cn('goods_label', { line: loading })}>{item.labelName}</View>;
          })
        }
      </View>
      <View className={cn('row', 'goodsName', { line: loading })}>
        {goodsName}
      </View>
      <View className={cn('row', 'goodsSubtitle', { line: loading })}>
        {goodsSubtitle}
      </View>
    </View>
  );
}

export default GoodsInfo;