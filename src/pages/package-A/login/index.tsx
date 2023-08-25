


import NavigationBar from '@/components/navigation-bar'
import PullDownRefresh from '@/components/pull-down-refresh'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import cn from 'classnames'
import { useState } from 'react'
import './index.scss'







const imageRatio = [
  {
    width: 3,
    height: 4,
    imageRatio: 3 / 4,
  },
  {
    width: 4,
    height: 3,
    imageRatio: 4 / 3,
  },
  {
    width: 1,
    height: 1,
    imageRatio: 1 / 1,
  },
]

const imageList = [
  // 3:4
  [
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr_TJOaxvM0jTWnZCPVx5tYhqZIIAWcwZ-wjkthDNgUPon6gB8cS1-4Gmj9Fa0emByQ',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr5TiaeMo-e_G_0VkoAgrUpJDa0vkq7A-ZqnGdXPqENXxwOpNm6WNaukJzkaNpe2l4g',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr3Vg3QwFEkRrtGVFfuis3HPsfPRAimoR3xrmxA6WqSP6gqLYxpQR70H0Mjd82xRvLg',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr57xPb6otBpyKgqlzjXvSaLKB_SPr5oYFTYCYUbk6bCwyLvvPWUVpsNuYRjVNouuDw',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr8oVdhjDzwpGQWkUNT3VLWmNYEetJXErnWq48jD0zVELo45qmUAdu7jCgFskY6Eh8w',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr1x4v1gTqT3MrC7LtVTjQXb_9hd9vbCf12guLPXiMXd0G7IUnLQXkOa-o1eNyAJ_nA',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr7lTnuuiwGJPwwjxDVYbDolj05sAxd5cOESVZt4_nl1KwzkiDWTvG56LuhE45xAaZA'
  ],
  // 4:3
  [
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr87sFqvqtkPc7qeZdary_8crGWuX_SOb72lupHA7sWx0dti3JrJXdP_lwm0ZtvINXg',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr3vA4i7lSkWNR0BRe_g4A-_lo5MYYlkks8oHLoZzXjqAm_M3RvDAXtn9UUgZuQtVBA',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr5Ifsj1_cRjONPrw-gUgq8g6BNH8sYQ3kBBQas5JAeMN0zsCBY9gmz3D7kj_GOWfHw',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr1IwceePWSJ_EhG4QedvnFKN6v_mNlNuwG2FkAIoOhx_1fyCDEqtHWSktSrPmLvTpw',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihrzz951X66QJWV_Oj4MT6XImEk-wFlNZP6mJE1Vt-ybtD1UK7ARlhOBl9bizrC5KA9g',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihrxFO1zooQxE0ufna7fMaqrU-Pp4Dm2rw5dFcTdBymLTijegIFw3WcVD1rUyLD4XTig',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr6WcfJCajSnCm4CNu5oQ5HPsPqyzWD-vtFVuJDZOhMpcG1iN0tvOsvS8DUgn3qO8UA',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr4HKYTq7-4l-F47z8u2QbvNsjcTEA3Cu5-4wQpBGPeWKCh66Ho5W42fn3naWuN2NJg',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr8PdfZEyicDsJiFPBw8MAjve2UKbzLds_-IZW_Q0EYUbboQk-31FeTkFmzuNzCfLHg'
  ],
  // 1:1
  [
    'https://res.wx.qq.com/op_res/KSWft_GRyQ3WEzVUTCSWs7HaJh0lgdPce6Uon3dhNpZ3R3sTVA3NLrOORpMDGaBl5P8QkzHZCaOErPlma2sAow',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihrwcWdDUeblb42H9kVfv14Eru-W62xBL1bUXbfwZbaJG7_JrKvnAKvdVCQJkS3PX3IQ',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr13IooGqagGNd7x5NTGbtrz4g0NrIVLLJ2KSx-BcYpaGMTpnv-pUB_iexsCzQC4wZg',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihrxD9Yj0ZHr0C5YMm7qYRo2fqji9kH4CS6LUyQf4YXzHzK3BW0FFNZiTQb6AK9bp1WA',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr5yBy6GoASjPro9uFIUZVFdiDIjiJObbopuhr7PUXnsTLQ537ujpIBxyX2Ln2gRu0w',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihrzhx4m_v7j5nYGhkUG5h-dulp3X7FxpQVY8L1QzVqPROJHUcK0mO38isUiclpbae_Q',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr_VrnIzjbAVDL2cmG0wjYsNZv1l_lacmGCshp9OEz3QcPnn9YymbITplyQS5T5C-VA',
    'https://res.wx.qq.com/op_res/BqgN85sXxTbk1kynEEihr0m2rsO-Y1l6Wsz_sFyu7vJj_ZTfI7GABbstLg4GUDTZVeZCKgDADCmsDjmF8rG7dw'
  ]
]

export const generateGridList = (childCount) => {
  const ans = []
  for (let i = 0; i < childCount; i++) {
    const ratioIdx = Math.floor(Math.random() * imageRatio.length)
    const ratio = imageRatio[ratioIdx]
    const img = imageList[ratioIdx][Math.floor(Math.random() * imageList[ratioIdx].length)]
    ans.push({
      src: img,
      ...ratio,
    })
  }
  return ans
}

export default function Login() {

  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [showTop, setShowTop] = useState(false)
  function onPullDownRefresh() {
    Taro.showLoading()
    setTimeout(() => {
      setRefresh(false);
      Taro.hideLoading()

    }, 1500);
  }
  function onScroll(e) {
    const { scrollTop } = e.detail;
    setShowTop(scrollTop > 100);
  }
  useDidShow(() => {
    setList(generateGridList(20))
  })

  return (
    <View className='login'>
      <NavigationBar title='瀑布流' />
      <PullDownRefresh
        className='PullDownRefresh'
        trigger={refresh}
        onTriggerChange={(val) => {
          setRefresh(val)
        }}
        onPullDownRefresh={onPullDownRefresh}
        onScrollToLower={() => {
          console.log('到底了');
        }}
      >
        <View className='list'>
          {
            list.map((v, index) => (
              <View key={index} className='item'>
                <Image src={v.src} mode='aspectFill' className='img' />
              </View>
            ))
          }
        </View>

      </PullDownRefresh>
    </View >
  )
}
