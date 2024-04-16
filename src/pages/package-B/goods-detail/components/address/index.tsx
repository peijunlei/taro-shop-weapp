import Taro, { pxTransform } from '@tarojs/taro'

import Cell from "@/components/cell";
import useGoodsDetails from '../../useStore';




function Address() {
  const address = useGoodsDetails((state) => state.address);
  function handleClick() {
    if (!address.deliveryAddressId) return
    Taro.showModal({
      title: '当前地址',
      // @ts-ignore
      content: address?.deliveryAddress + address?.houseNum,
      confirmText: '切换地址',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
  return (
    <Cell title='地址' desc={address.deliveryAddress} style={{ marginBottom: pxTransform(24) }} onClick={handleClick} />
  );
}

export default Address;