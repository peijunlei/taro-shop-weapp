
import { View } from '@tarojs/components';
import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import cn from 'classnames';

interface FilterPopupProps {
  activeIndex?: number;
  visible: boolean;
  onChange?: (value:{label:string;value:number}) => void;
  onOverlayClick?: () => void;
}
import './filter-popup.scss'


const options = [
  { label: '综合', value: 0 },
  { label: '最新', value: 6 },
  { label: '评论数', value: 7 },
  { label: '好评', value: 8 },
  { label: '收藏', value: 9 },
]
function FilterPopup(props: FilterPopupProps) {
  const {
    visible,
    onChange,
    onOverlayClick,
    activeIndex
  } = props;
  const [innerVisible, setInnerVisible] = React.useState(visible);
  const [innerVisible2, setInnerVisible2] = React.useState(visible);
  function handleOverlaClick() {
    onOverlayClick?.()
  }

  useEffect(() => {
    setInnerVisible(visible)
    setInnerVisible2(visible)
  }, [visible]);
  return (
    <View className='filter-popup'>
      <CSSTransition
        classNames='filter-popup-overlay-slide'
        unmountOnExit
        timeout={300}
        in={innerVisible}
        onEntered={null}
        onExited={null}
      >
        <View
          className='filter-popup-overlay'
          catchMove
          onClick={handleOverlaClick}
        />
      </CSSTransition>
      <CSSTransition
        classNames='filter-popup-content-slide'
        unmountOnExit
        timeout={300}
        in={innerVisible2}
        onEntered={null}
        onExited={null}
      >
        <View
          className='filter-popup-content'
          catchMove
        >
          <View className='pop'>
            {
              options.map((item, index) => {
                return <View key={index} className={cn('pop_item',{active:activeIndex===item.value})} onClick={() => onChange?.(item)}>{item.label}</View>
              })
            }
          </View>
        </View>
      </CSSTransition>
    </View>

  );
}

export default FilterPopup;