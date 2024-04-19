import { View, Button } from "@tarojs/components";
import './index.scss';
import useData from "./useData";
import List from "./components/list";
import Filter from "./components/filter";
import ToolBar from "./components/tool-bar";

function Index() {
  useData();
  return (
    <View className='goods_list'>
      <ToolBar />
      <Filter />
      <List />
    </View>

  )
}

export default Index;