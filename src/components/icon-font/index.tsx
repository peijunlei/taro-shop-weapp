import React, { CSSProperties, PureComponent } from 'react'
import Taro from '@tarojs/taro'
import { Text } from '@tarojs/components'
import cn from 'classnames'
import './index.scss'

interface IIconProps {
  value: string;
  onClick?: () => void;
  className?: string;
  color?: string;
  size?: number;
  style?: CSSProperties;
  prefixClass?: string;
}

function IconFont(props: IIconProps) {

  const { className, prefixClass = 'iconfont', value, size = 16, color, onClick, style } = props
  const rootStyle = {
    ...style,
    fontSize: size,
    color,
  }
  const iconName = value ? `icon-${value}` : ''
  return (
    <Text
      className={cn(prefixClass, iconName, className)}
      style={rootStyle}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    />
  )
}
export default IconFont