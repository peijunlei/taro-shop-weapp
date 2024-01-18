import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';

function Index() {
  return (
    <View>
      <Button
        onClick={() => {
          Taro.navigateTo({
            url: '/pages/package-B/goods-detail/index'
          })
        }}
      >
        跳转详情
      </Button>
    </View>

  )
}

export default Index;