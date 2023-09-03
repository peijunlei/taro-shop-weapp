import React, { useState, FunctionComponent, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition'
import classNames from 'classnames'
import { View, ITouchEvent } from '@tarojs/components'
import { BasicComponent } from '@/utils/typings'
import './index.scss'

export interface OverlayProps extends BasicComponent {
  zIndex: number
  duration: number
  closeOnOverlayClick: boolean
  visible: boolean
  lockScroll: boolean
  onClick: (event: ITouchEvent) => void
  afterShow: () => void
  afterClose: () => void
}
const Overlay: FunctionComponent<
  Partial<OverlayProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>
> = (props) => {
  const {
    children,
    className,
    closeOnOverlayClick = true,
    visible,
    lockScroll = true,
    style,
    afterShow,
    afterClose,
    onClick,
  } = props

  const [innerVisible, setInnerVisible] = useState(visible)

  const classPrefix = `nut-overlay`

  useEffect(() => {
    if (visible) {
      setInnerVisible(true)
    } else {
      setInnerVisible(false)
    }
    // lock()
  }, [visible])

  useEffect(() => {
    return () => {
      document.body.classList.remove('nut-overflow-hidden')
    }
  }, [])

  const classes = classNames(className, classPrefix)

  const lock = () => {
    if (lockScroll && visible) {
      document.body.classList.add('nut-overflow-hidden')
    } else {
      document.body.classList.remove('nut-overflow-hidden')
    }
  }

  const handleClick = (e: ITouchEvent) => {
    if (closeOnOverlayClick) {
      onClick && onClick(e)
    }
  }

  const onHandleOpened: EnterHandler<HTMLElement | undefined> | undefined = (
    e: HTMLElement
  ) => {
    afterShow && afterShow()
  }

  const onHandleClosed: ExitHandler<HTMLElement | undefined> | undefined = (
    e: HTMLElement
  ) => {
    afterClose && afterClose()
  }

  return (
    <>
      <CSSTransition
        classNames={`${classPrefix}-slide`}
        unmountOnExit
        timeout={300}
        in={innerVisible}
        onEntered={onHandleOpened}
        onExited={onHandleClosed}
      >
        <View
          className={classes}
          style={style}
          catchMove
          onClick={handleClick}
        >
          {children}
        </View>
      </CSSTransition>
    </>
  )
}

export default Overlay

// Overlay.defaultProps = defaultOverlayProps
// Overlay.displayName = 'NutOverlay'
