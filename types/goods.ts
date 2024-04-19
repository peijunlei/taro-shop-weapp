


export interface GoodsInfoItem {
  goodsInfoName: string;
  marketPrice: number;
  stock: number;
  goodsInfoImg: string;
  goodsInfoId: string;
  mockSpecIds: number[];
  mockSpecDetailIds: number[];
  goodsUnit: string;
}
export interface EsGoodsItem {
  goodsInfo:GoodsInfoItem
}