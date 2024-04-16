import { View, Image } from "@tarojs/components";


interface EmptyProps {
  icon?: React.ReactNode | string;
  desc?: string
}
import defaultIcon from '@/assets/image/common/empty.png'
import './index.scss'

function Empty(props: EmptyProps) {
  const { desc = '暂无数据', icon = defaultIcon } = props;
  return (
    <View className='pjl_empty'>
      <Image src={icon} className='icon' />
      <View className='text'>{desc}</View>
    </View>
  );
}

export default Empty;