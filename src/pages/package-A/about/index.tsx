import { View, WebView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";



export default function About() {

  useEffect(() => {
    Taro.enableAlertBeforeUnload({
      message: '确定要返回吗？',
      success: function (res) {
        console.log('enableAlertBeforeUnload res', res)
      },
      fail: function (res) {
        console.log('enableAlertBeforeUnload fail', res)
      }
    })
    return () => {
      Taro.disableAlertBeforeUnload({
        success: function (res) {
          console.log('disableAlertBeforeUnload res', res)
        },
        fail: function (res) {
          console.log('disableAlertBeforeUnload fail', res)
        }
      })
    }
  }, [])
  return (
    <View>
      1111
    </View>
  )
}
