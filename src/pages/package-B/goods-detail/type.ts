



export interface IGoodsInfo {
  goodsInfoName: string;
  goodsInfoId: string;
  goodsInfoImg: string | null;
  stock: number;
  marketPrice: number;
  mockSpecDetailIds: number[]
  mockSpecDetailName: string
  mockSpecIds: number[]
}


export interface IGoodsSpecItem {
  specDetailIds: number[];
  specName: string;
  specId: number
}


export interface IGoodsSpecDetailItem {
  specDetailId: number;
  detailName: string;
  specId: number
}
