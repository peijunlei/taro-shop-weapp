import { View, Image, Text } from "@tarojs/components";

import search from '@/assets/image/common/search.png';
import cateIcon from '@/assets/image/goods-list/categtory.png';

import bigIcon from '@/assets/image/goods-list/big.png';
import smallIcon from '@/assets/image/goods-list/small.png';

import dianIcon from '@/assets/image/goods-list/dian.png';




import './index.scss';
import { useState } from "react";



function ToolBar() {

  const [big, setBig] = useState(true)

  return (
    <View className='tool_bar'>
      <View className='search_box'>
        <Image src={search} className='search_icon' />
        <View className='search_input'>搜索商品</View>
      </View>
      <View className='tool'>
        <View className='tool_item'>
          <Image src={cateIcon} className='icon' />
          <Text className='text'>分类</Text>
        </View>
        <View className='tool_item' onClick={()=>setBig(!big)}>
          <Image src={big ? bigIcon : smallIcon} className='icon' />
          <Text className='text'>{big ? '大' : '小'}图</Text>
        </View>
        <View className='tool_item'>
          <Image src={dianIcon} className='icon' />
          <Text className='text'>导航</Text>
        </View>
      </View>
    </View>

  );
}

export default ToolBar;