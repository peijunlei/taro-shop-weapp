import api from "@/api";
import { AddressType } from "./types";



interface GoodsListRequest {
  pageNum: number;
  pageSize: number;
  keywords: string;
}

export async function fetchGoodsSpuList(params: GoodsListRequest) {
  const res = await api.post('/goods/spus', params)
  return res.context
}
export async function fetchGoodsSkuList(params: GoodsListRequest) {
  const res = await api.get(`/goods/skus`, params)
  return res.context
}