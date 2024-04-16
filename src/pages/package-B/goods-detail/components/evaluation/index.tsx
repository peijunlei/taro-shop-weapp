import { IconFont } from "@/components";
import { View } from "@tarojs/components";

import './index.scss';
import Empty from "@/components/empty";

function Evaluation() {
  return (
    <View className='goods_evaluation'>
      <View className='goods_evaluation_header'>
        <View className='title'> 评价</View>
        <IconFont value='right' />
      </View>
      <View className='goods_evaluation_list'>
        <View className='no_data'>
          <Empty />
        </View>
      </View>
    </View>
  );
}

export default Evaluation;