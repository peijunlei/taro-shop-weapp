import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';
import useData from "./useData";
import List from "./components/list";
import Filter from "./components/filter";

function Index() {
  useData();
  return (
    <View className='goods_list'>
      <Filter />
      <List />
    </View>

  )
}

export default Index;