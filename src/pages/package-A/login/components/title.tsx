import { View } from "@tarojs/components";
import { shallow } from 'zustand/shallow'
import useLoginStore from "../useLoginStore";




function Title() {
  const { pcLogo, setState } = useLoginStore(state => ({
    pcLogo: state.pcLogo,
    setState: state.setState
  }), shallow)
  console.log(pcLogo)
  return (
    <View>
      title
    </View>
  )
}


export default Title