

import { View, ButtonProps } from '@tarojs/components'
import cn from 'classnames';



import './index.scss'

interface MyButtonProps extends ButtonProps {

}
function MyButton(props: MyButtonProps) {
  const { className, onClick, children, type = 'default' } = props
  return (
    <View className={cn(className, 'my-button', `my-button-${type}`)} onClick={onClick}  >
      {children}
    </View>
  )
}

export default MyButton;