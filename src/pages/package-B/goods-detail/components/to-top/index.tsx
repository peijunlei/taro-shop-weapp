import { memo } from "react";
import { View, Image, } from "@tarojs/components";
import Taro from "@tarojs/taro";
import classNames from "classnames";

import topIcon from '@/assets/image/common/top.png';

import './index.scss';

interface ToTopProps {
  showTop: boolean;
}
function ToTop(props: ToTopProps) {
  const { showTop } = props;
  return (
    <View
      className={classNames('to_top', {
        'show': showTop
      })}
      onClick={() => {
        Taro.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        })
      }}
    >
      <Image src={topIcon} className='icon' />
    </View>
  );
}

export default memo(ToTop);