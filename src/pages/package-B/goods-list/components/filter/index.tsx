import { View } from "@tarojs/components";


import './index.scss';
import Popup from "@/components/popup";
import useGoodsList from "../../useStore";
import cn from 'classnames';

function Filter() {
  const { filterVisible, setFilterVisible } = useGoodsList((state) => state)
  function handleClick(index: 0 | 1 | 2 | 3) {
    console.log(index)
    setFilterVisible(!filterVisible)
  }
  return (
    <View className='goods_list_filter'>
      <View className='filter_list'>
        <View className='filter_item' onClick={() => handleClick(0)}>综合</View>
        <View className='filter_item' onClick={() => handleClick(1)}>销量</View>
        <View className='filter_item' onClick={() => handleClick(2)}>价格</View>
        <View className='filter_item' onClick={() => handleClick(3)}>筛选</View>
      </View>
      {
        filterVisible &&(
          <View className={cn('pop_wrapper', {
            'fade-in': filterVisible,
            'fade-out': !filterVisible,
          })}
          >
            {/*   <View className='pop'>
              <View className='pop_item'> 综合 </View>
              <View className='pop_item'> 最新 </View>
              <View className='pop_item'> 评论数</View>
              <View className='pop_item'> 好评</View>
              <View className='pop_item'> 收藏</View>
            </View> */}
          </View>
        )
      }
     

    </View>

  );
}

export default Filter;