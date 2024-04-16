import api from "@/api";
import { AddressType } from "./types";





export async function fetchGoodsDetails(skuId: string) {
   const res = await api.get(`/goods/spu/${skuId}`, {})
   return res.context
}

export async function fetchGoodsDetailsProper(skuId: string) {
  const res = await api.get(`/goods/goodsDetailProper/${skuId}`, {})
  return res.context
}
/**
 * 获取地址列表
 */
export async function fetchAddressList() {
  const res = await api.get<AddressType[]>(`/customer/addressList`, {})
  return res.context
}