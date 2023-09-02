import { View, ViewProps } from "@tarojs/components";

import cn from 'classnames'


import './index.scss'
import IconFont, { IconFontValueEnum } from "../icon-font";


interface CellProps extends ViewProps {
  title: string;
  desc?: string;
  rightIcon?: IconFontValueEnum
}
function Cell(props: CellProps) {

  const {
    title,
    desc,
    rightIcon = 'gengduo',
    className,
    onClick
  } = props
  return (
    <View className={cn('my-cell', className)} onClick={onClick}>
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