import { View, ViewProps } from "@tarojs/components";

import cn from 'classnames'


import './index.scss'
import IconFont, { IconFontValueEnum } from "../icon-font";


interface CellProps extends ViewProps {
  title: string;
  desc?: string;
  rightIcon?: IconFontValueEnum;
  style?: React.CSSProperties;
}
function Cell(props: CellProps) {

  const {
    title,
    desc,
    rightIcon = 'ellipsis',
    className,
    onClick,
    style
  } = props
  return (
    <View className={cn('pjl-cell', className)} onClick={onClick} style={style}>
      <View className='title'>
        {title}
      </View>
      <View className='desc'>
        {desc}
      </View>
      <View className='right-icon'>
        <IconFont value={rightIcon} />
      </View>
    </View>
  )
}

export default Cell;