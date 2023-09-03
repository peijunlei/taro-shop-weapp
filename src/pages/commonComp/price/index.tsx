

import { View, Text } from '@tarojs/components'
import './index.scss'
import { BasicComponent } from '@/utils/typings';

interface PriceProps extends BasicComponent {
  price: number;
}
function Price(props: PriceProps) {

  const { price, style } = props

  return (
    <View className='my-price' style={style}>
      <Text className='unit'>￥</Text>
      <Text className='money'>{price.toFixed(2)}</Text>
    </View>
  )
}

export default Price
