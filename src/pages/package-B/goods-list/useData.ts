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
    setGoods(result.esGoods.content);
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
