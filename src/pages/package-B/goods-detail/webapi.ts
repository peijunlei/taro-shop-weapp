import api from "@/pages/api";


export async function fetchGoodsDetail(skuId: string) {
  let result = await api.get<unknown>(`/goods/unLogin/spu/${skuId}/null/null`, {});
  return result.context;
}

export async function fetchGoodsIsFollow(goodsInfoId: string) {
  let result = await api.post<boolean>(`/goods/goodsFollows`, { goodsInfoId }) as any;
  return Boolean(result.context.goodsInfos?.total);
}


export async function addGoodsFollow(goodsInfoId: string) {
  let result = await api.post<boolean>(`/goods/goodsFollow`, { goodsInfoId }) as any;
  return result.context
}
export async function delGoodsFollow(goodsInfoId: string) {
  let result = await api.del<boolean>(`/goods/goodsFollow`, { goodsInfoIds:[goodsInfoId] }) as any;
  return result.context
}
