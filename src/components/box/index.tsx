import { ITouchEvent, View } from "@tarojs/components";
import Taro, { pxTransform } from "@tarojs/taro";
import cn from 'classnames';

interface ViewBoxProps {
  // TODO
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  borerColor?: string;
  borderRadius?: string | number;
  onClick?: (event: ITouchEvent) => void
}

import './index.scss';

function ViewBox(props: ViewBoxProps) {
  const { children, className, style, borderRadius = 4, borerColor, onClick } = props;
  return (
    <View className={cn('hairBorderBox', className)} style={{ ...style, borderRadius }} onClick={onClick}>
      <View className='content'>
        {children}
      </View>

      <View
        className='hairBorder'
        style={{
          boxShadow: ` 0 0 0 1px ${borerColor} inset`,
          borderRadius,
        }}
      ></View>
    </View>
  );
}

export default ViewBox;