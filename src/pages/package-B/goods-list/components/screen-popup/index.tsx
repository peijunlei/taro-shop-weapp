import { Popup } from "@nutui/nutui-react-taro";
import { View, Image } from "@tarojs/components";


import cn from 'classnames';
import down from '@/assets/image/common/down.png';
import './index.scss';
import { useState } from "react";
import { pxTransform } from "@tarojs/taro";

interface ScreenPopupProps {
  visible: boolean;
  setScreenVisible: (val: boolean) => void;
}


function ScreenpPopup(props: ScreenPopupProps) {
  const { visible, setScreenVisible } = props;
  const [brandExpand, setBrandExpand] = useState(false)
  const [cateExpand, setCateExpand] = useState(false)
  const [selectBrand, setSelectBrand] = useState<number[]>([])
  const [selectCate, setSelectCate] = useState<number[]>([])
  return (
    <Popup
      visible={visible}
      position='right'
      onClose={() => {

        setScreenVisible(false)
      }}
      round
      overlayClassName='screen_overlay'
    >
      <View className='screen_popup'>
        <View className='screen_list'>
          <View className='screen_item' >
            <View className='screen_item_header'>
              <View className='screen_item_header_title'>品牌</View>
              <View className='screen_item_header_expand' onClick={() => setBrandExpand(!brandExpand)}>
                {brandExpand ? '收起' : '展开'}
                <Image src={down} className={cn('icon', { active: brandExpand })} />
              </View>
            </View>
            <View className='screen_item_body' style={{ maxHeight: brandExpand ? 'unset' : pxTransform(212) }}>
              {
                Array.from({ length: 20 }).map((_, index) => {
                  return (
                    <View
                      className={cn('screen_item_body_con', { active: selectBrand.includes(index) })}
                      key={index}
                      onClick={() => {
                        if (selectBrand.includes(index)) {
                          setSelectBrand(selectBrand.filter((item) => item !== index))
                        } else {
                          setSelectBrand([...selectBrand, index])
                        }
                      }}
                    >
                      品牌{index}
                    </View>
                  )
                })
              }
            </View>

          </View>
          <View className='screen_item'>
            <View className='screen_item_header'>
              <View className='screen_item_header_title'>分类</View>
              <View className='screen_item_header_expand' onClick={() => setCateExpand(!cateExpand)}>
                {cateExpand ? '收起' : '展开'}
                <Image src={down} className={cn('icon', { active: cateExpand })} />
              </View>
            </View>
            <View className='screen_item_body' style={{ maxHeight: cateExpand ? 'max-content' : pxTransform(212) }}>

              {
                Array.from({ length: 20 }).map((_, index) => {
                  return (
                    <View
                      className={cn('screen_item_body_con', { active: selectCate.includes(index) })}
                      key={index}
                      onClick={() => {
                        if (selectCate.includes(index)) {
                          setSelectCate(selectCate.filter((item) => item !== index))
                        } else {
                          setSelectCate([...selectCate, index])
                        }
                      }}
                    >
                      分类{index}
                    </View>
                  )
                })
              }
            </View>

          </View>
        </View>
        <View className='screen_footer'>
          <View
            className='reset btn'
            onClick={() => {
              setSelectBrand([])
              setSelectCate([])
              setBrandExpand(false)
              setCateExpand(false)
              setScreenVisible(false)
            }}
          >
            重置
          </View>
          <View className='confirm btn' onClick={() => setScreenVisible(false)}>确定</View>
        </View>
      </View>
    </Popup>
  )
}

export default ScreenpPopup;