import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image ,Text} from '@tarojs/components'

import './index.scss'

export default class Index extends Component {
  state = {
    selected: 0,
    color: '#000000',
    selectedColor: '#DC143C',
    list: [
      {
        pagePath: '/pages/index/index',
        selectedIconPath: '../images/gongjijin.png',
        iconPath: '../images/gongjijin_off.png',
        text: '首页'
      },
      {
        pagePath: '/pages/paihang/index',
        selectedIconPath: '../images/paihang.png',
        iconPath: '../images/paihang_off.png',
        text: '排行'
      },
      {
        pagePath: '/pages/cart/index',
        selectedIconPath: '../images/hongbao.png',
        iconPath: '../images/hongbao_off.png',
        text: '红包'
      },
      {
        pagePath: '/pages/guanzhu/index',
        selectedIconPath: '../images/guanzhu.png',
        iconPath: '../images/guanzhu_off.png',
        text: '关注'
      },
      {
        pagePath: '/pages/setting/index',
        selectedIconPath: '../images/shezhi.png',
        iconPath: '../images/shezhi_off.png',
        text: '设置'
      }
    ]
  }

  switchTab(index, url) {
    this.setSelected(index)
    Taro.switchTab({ url })
  }

  setSelected (idx: number) {
    this.setState({
      selected: idx
    })
  }

  render() {
    const { list, selected, color, selectedColor } = this.state
    return (
      <View className='tab-bar'>
        <View className='tab-bar-border'></View>
        {list.map((item, index) => {
          return (
            <View key={index} className={`tab-bar-item ${selected === index?'selected':''}`} onClick={this.switchTab.bind(this, index, item.pagePath)}>
              <Image src={selected === index ? item.selectedIconPath : item.iconPath}  className='icon' />
              <Text style={{ color: selected === index ? selectedColor : color }} className='label'>{item.text}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}