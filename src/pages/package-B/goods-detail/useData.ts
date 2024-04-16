import { useEffect, useState } from "react";
import { useRouter } from "@tarojs/taro";
import { fetchAddressList, fetchGoodsDetails, fetchGoodsDetailsProper } from './webapi'
import { GoodsInfoType, GoodsLabelItem, GoodsType, goodsSpecDetailsType } from "./types";
import useGoodsDetails from "./useStore";
import { isLogin } from "@/utils";

function useData() {
  const {
    setGoods,
    setGoodsInfo,
    setGoodsSpecs,
    setGoodsInfos,
    setImages, setLoading,
    setAddress
  } = useGoodsDetails((state) => state);
  const skuId = useRouter().params.skuId as string;
  const [descData, setDescData] = useState<string>('');

  async function getGoodsDetail() {
    setLoading(true);
    const result = await fetchGoodsDetails(skuId)
    // console.log('res', res);
    let goodsInfo = result.goodsInfos.find((item: any) => item.goodsInfoId === skuId) as GoodsInfoType
    if (!goodsInfo) {
      goodsInfo = result.goodsInfos.find((item: any) => item.addedFlag === 1);
    }
    goodsInfo.goodsUnit = result.goods.goodsUnit;

    const images = getImages(goodsInfo, result);

    const goodsSpecs = getGoodsSpecs(result);
    setGoods(result.goods);
    setGoodsInfo(goodsInfo);
    setGoodsSpecs(goodsSpecs);
    setGoodsInfos(result.goodsInfos);
    setImages(images);
    setLoading(false);

  }
  function getGoodsSpecs(data: any) {
    const goodsSpecs = data.goodsSpecs || [];
    const goodsSpecDetails = data.goodsSpecDetails as goodsSpecDetailsType[] || [];
    const list = goodsSpecs.map(v => {
      const specDetails = v.specDetailIds.map((id: any) => {
        return goodsSpecDetails.find((item) => item.specDetailId === id);
      });
      return {
        ...v,
        specDetails,
      }
    })
    return list
  }
  function getImages(goodsInfo: any, result: any) {
    let images: string[] = [];
    if (goodsInfo && goodsInfo.goodsInfoImg) {
      images.push(goodsInfo.goodsInfoImg);
    }
    result.images.forEach((item: any) => {
      images.push(item.artworkUrl);
    });
    return images;
  }
  async function getGoodsDesc() {
    const result = await fetchGoodsDetailsProper(skuId)
    setDescData(result.goodsDetail);
  }

  async function getAddressList() {
    if (isLogin()) {
      const res = await fetchAddressList();
      const address = res.find((item) => item.isDefaltAddress === 1)!;
      setAddress(address);
    }

  }
  function init() {
    getGoodsDetail();
    getGoodsDesc();
    getAddressList();
  }
  useEffect(() => {
    init();
  }, [])
  return {
    descData,
  };
}
export default useData;
