import { View, Text, Image } from '@tarojs/components'

import PullDownRefresh from '@/components/pull-down-refresh'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { goodsSkulist } from './webapi'
import useGoodsList from './useGoodsList'
import { shallow } from 'zustand/shallow'
import { GoodsDetailPage } from '@/utils/pages'
import logo from '@/assets/image/common/logo.png'
import { isLogin } from '@/utils'

export default function Index() {
  const [login, setLogin] = useState(isLogin())
  const setState = useGoodsList(state => state.setState)
  const { goodsList, total, pageNum, pageSize, reload, loading } = useGoodsList(state => ({
    loading: state.loading,
    reload: state.reload,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    goodsList: state.goodsList,
    total: state.total
  }), shallow)
  const [refresh, setRefresh] = useState(false)
  async function onPullDownRefresh() {
    _refresh()
  }

  function _refresh() {
    setState({
      pageNum: 0,
      reload: !reload
    })
  }
  async function nextPage() {
    //没有了 正在请求数据
    if (goodsList.length >= total || loading) return
    setState({
      pageNum: pageNum + 1
    })
  }
  async function getGoodsList() {
    setState({ loading: true })
    Taro.showLoading()
    const res = await goodsSkulist({ pageNum, pageSize }) as any;
    const list = pageNum === 0 ? res.esGoodsInfoPage.content : goodsList.concat(res.esGoodsInfoPage.content)
    Taro.hideLoading()
    setRefresh(false)
    setState({
      loading: false,
      goodsList: list,
      total: res.esGoodsInfoPage.totalElements
    })
  }
  useDidShow(() => {
    console.log(isLogin(), login);
    if (isLogin() !== login) {
      setLogin(isLogin())
      _refresh()

    }

  })
  useEffect(() => {
    
  }, [])
  useEffect(() => {
    getGoodsList()
  }, [pageNum, reload])
  return (

    <PullDownRefresh
      trigger={refresh}
      onTriggerChange={setRefresh}
      onPullDownRefresh={onPullDownRefresh}
      onScrollToLower={nextPage}
    >
      <View className='goods-list'>
        {
          goodsList.map((v, index) => {
            const goodsInfo = v.goodsInfo
            return (
              <View
                key={v}
                className='goods-item'
                onClick={() => {
                  Taro.navigateTo({
                    url: GoodsDetailPage({ skuId: goodsInfo.goodsInfoId })
                  })
                }}
              >
                <Image mode='aspectFit' src={goodsInfo.goodsInfoImg || logo} className='img' />
                <View className='name'>{goodsInfo.goodsInfoName}</View>
              </View>
            )
          })
        }
      </View>
    </PullDownRefresh>

  )
}
