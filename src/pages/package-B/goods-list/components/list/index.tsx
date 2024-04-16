import { ScrollView, View } from "@tarojs/components";
import useGoodsList from "../../useStore";

const Threshold = 20;

import './index.scss';

function List() {
  const { goods, total } = useGoodsList((state) => state);
  function onScrollToUpper() {
    console.log('onScrollToUpper')
  }
  function onScroll() {
    console.log('onScroll')
  }
  return (
    <ScrollView
      className='scrollview'
      scrollY
      scrollWithAnimation
      lowerThreshold={Threshold}
      onScrollToUpper={onScrollToUpper} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
      onScroll={onScroll}
    >

      {
        goods.map((item, index) => {
          const goodsInfo = item.goodsInfos[0];
          return (
            <View key={index} className='goods_item'>
              {goodsInfo.goodsInfoName}
            </View>
          );
        })
      }
    </ScrollView>
  );
}

export default List;