import { View, Text } from "@tarojs/components";
import cn from 'classnames';
import './index.scss';

interface PriceProps {
  price: number;
  large?: boolean;
}
function Price(props: PriceProps) {
  const { price,large=false } = props;
  const className = cn('pjl_price_decimal', { 'large':large });
  return (
    <View className='pjl_price'>
      <Text className='pjl_price_unit'>￥</Text>
      <Text className={className}>{price.toFixed(2)}</Text>
    </View>
  );
}

export default Price;