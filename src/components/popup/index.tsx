import React, {
  FunctionComponent,
  useState,
  useEffect,
  ReactElement,
  ReactPortal,
  ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition'
import { View, ITouchEvent } from '@tarojs/components'

import Overlay, { OverlayProps } from '@/components/overlay'
import IconFont from '../icon-font'
import './index.scss'

type Teleport = HTMLElement | (() => HTMLElement) | null

export interface PopupProps extends OverlayProps {
  position: 'top' | 'bottom' | 'left' | 'right'
  transition: string
  overlayStyle: React.CSSProperties
  overlayClassName: string
  closeable: boolean
  closeIconPosition: string
  closeIcon: ReactNode
  left?: ReactNode
  title?: ReactNode
  destroyOnClose: boolean
  portal: Teleport
  overlay: boolean
  round: boolean
  onOpen: () => void
  onClose: () => void
  onOverlayClick: (e: ITouchEvent) => boolean | void
  onCloseIconClick: (e: ITouchEvent) => boolean | void
}

const defaultProps = {
  position: 'bottom',
  transition: '',
  overlayStyle: {},
  overlayClassName: '',
  closeable: true,
  closeIconPosition: 'top-right',
  closeIcon: 'close',
  destroyOnClose: false,
  portal: null,
  overlay: true,
  round: true,
  onOpen: () => { },
  onClose: () => { },
  onOverlayClick: (e: ITouchEvent) => true,
  onCloseIconClick: (e: ITouchEvent) => true,
} as PopupProps

let _zIndex = 2000

const Popup: FunctionComponent<
  Partial<PopupProps> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'>
> = (props) => {
  const {
    children,
    visible,
    closeOnOverlayClick,
    overlayStyle,
    overlayClassName,
    zIndex,
    lockScroll,
    duration = 300,
    title,
    style,
    transition,
    round,
    position,
    className,
    portal,
    onOpen,
    onClose,
  } = { ...defaultProps, ...props }

  const [index, setIndex] = useState(zIndex || _zIndex)
  const [innerVisible, setInnerVisible] = useState(visible)

  const classPrefix = 'pjl-popup'
  const baseStyle = {
    zIndex: index,
  }

  const overlayStyles = {
    ...overlayStyle,
    '--nutui-overlay-zIndex': index,
  }

  const popStyles = {
    ...style,
    ...baseStyle,
  }

  const popClassName = classNames({
    round,
    [`${classPrefix}`]: true,
    [`${classPrefix}-${position}`]: true,
    [`${className || ''}`]: true,
  })


  const open = () => {
    if (!innerVisible) {
      setInnerVisible(true)
      setIndex(++_zIndex)
    }
    onOpen && onOpen()
  }

  const close = () => {
    if (innerVisible) {
      setInnerVisible(false)
      onClose && onClose()
    }
  }

  const onHandleClickOverlay = (e: ITouchEvent) => {
    e.stopPropagation()
    close()
  }




  const renderPop = () => {
    return (
      <CSSTransition
        classNames={`${classPrefix}-slide-${position}`}
        unmountOnExit
        timeout={duration}
        in={innerVisible}
        onEntered={null}
        onExited={null}
      >
        <View
          style={popStyles}
          className={popClassName}
          catchMove
        >
          <View className={`${classPrefix}-head`}>
            {
              title && (
                <View className='title'>
                  {title}
                </View>
              )
            }
            <View className='close-icon' onClick={close}>
              <IconFont value='close' />
            </View>
          </View>
          <View className={`${classPrefix}-body`}>
            {children}
          </View>
        </View>
      </CSSTransition>
    )
  }

  useEffect(() => {
    visible && open()
    !visible && close()
  }, [visible])

  return (
    <>
      <Overlay
        style={overlayStyles}
        className={overlayClassName}
        visible={innerVisible}
        closeOnOverlayClick={closeOnOverlayClick}
        lockScroll={lockScroll}
        duration={duration}
        onClick={onHandleClickOverlay}
      />
      {renderPop()}
    </>
  )
}
export default Popup
// Popup.defaultProps = defaultProps
// Popup.displayName = 'NutPopup'
