import { View, Text } from "@tarojs/components";

import './index.scss';

interface PriceProps {
  price: number;
}
function Price(props: PriceProps) {
  const { price } = props;

  return (
    <View className='pjl_price'>
      <Text className='pjl_price_unit'>￥</Text>
      <Text className='pjl_price_decimal'>{price.toFixed(2)}</Text>
    </View>
  );
}

export default Price;