import { useEffect, useState } from "react";
import { fetchGoodsSpuList } from './webapi'
import useGoodsList from "./useStore";


function useData() {
  const {
    setGoods,
    setLoading,
    setTotal,
    requestParams
  } = useGoodsList((state) => state);
  async function getGoodsList() {
    setLoading(true);
    const result = await fetchGoodsSpuList(requestParams)
    console.log('res', result);
    const goods = result.esGoods.content.map(v => {
      const goodsInfo = v.goodsInfos.sort((a, b) => a.marketPrice - b.marketPrice)[0]
      return {
        ...v,
        goodsInfo
      }
    })
    setGoods(goods);
    setTotal(result.esGoods.total);
  }



  function init() {
    getGoodsList();
  }
  useEffect(() => {
    init();
  }, [])

}
export default useData;
