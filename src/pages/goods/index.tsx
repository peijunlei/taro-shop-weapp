import { View, Text } from '@tarojs/components'

import PullDownRefresh from '@/components/pull-down-refresh'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { goodsSkulist } from './webapi'
import useGoodsList from './useGoodsList'
import { shallow } from 'zustand/shallow'
import { GoodsDetailPage } from '@/utils/pages'

export default function Index() {

  const setState = useGoodsList(state => state.setState)
  const setPageNum = useGoodsList(state => state.setPageNum)
  const { goodsList, total, pageNum, pageSize, reload } = useGoodsList(state => ({
    reload: state.reload,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    goodsList: state.goodsList,
    total: state.total
  }), shallow)
  const [refresh, setRefresh] = useState(false)
  async function onPullDownRefresh() {
    setState({
      pageNum: 0,
      reload: !reload
    })
  }
  async function nextPage() {
    if (goodsList.length >= total) return
    setState({
      pageNum: pageNum + 1
    })
  }
  async function getGoodsList() {
    Taro.showLoading()
    const res = await goodsSkulist({ pageNum, pageSize }) as any;
    const list = pageNum === 0 ? res.esGoodsInfoPage.content : goodsList.concat(res.esGoodsInfoPage.content)
    Taro.hideLoading()
    setRefresh(false)
    setState({
      goodsList: list,
      total: res.esGoodsInfoPage.totalElements
    })
  }
  useDidShow(() => {
    getGoodsList()
  })
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
          goodsList.map(v => {
            return (
              <View
                key={v}
                className='goods-item'
                onClick={() => {
                  Taro.navigateTo({
                    url: GoodsDetailPage({ skuId: v.goodsInfo.goodsInfoId })
                  })
                }}
              >
                <View>{v.goodsInfo.goodsInfoName}</View>
              </View>
            )
          })
        }
      </View>
    </PullDownRefresh>

  )
}
