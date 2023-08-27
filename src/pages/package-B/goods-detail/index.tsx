import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";





function Index(){
  const {params} = useRouter<{skuId:string}>()
  
  return (
    <View className='goods-detail'>
      {params.skuId}
    </View>
  )
}

export default Index;