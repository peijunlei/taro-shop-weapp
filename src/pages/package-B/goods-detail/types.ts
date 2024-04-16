import { SetState } from "ahooks/lib/useSetState";


export interface GoodsType {
  goodsName: string;
  goodsSubtitle: string;
  goodsId: string;
  goodsUnit: string;
  goodsLabelList: GoodsLabelItem[];
}

export interface GoodsInfoType {
  marketPrice: number;
  stock: number;
  goodsInfoImg: string;
  goodsInfoId: string;
  mockSpecIds: number[];
  mockSpecDetailIds: number[];
  goodsUnit: string;

}

export interface GoodsLabelItem {
  goodsLabelId: number;
  labelName: string;
  labelVisible: boolean;
}
export interface goodsSpecsType {
  specId: number;
  specName: string;
  specDetailIds: number[];
  specDetails: goodsSpecDetailsType[];
}
export interface goodsSpecDetailsType {
  specDetailId: number;
  specId: number;
  detailName: string;
}
export interface AddressType {
  deliveryAddress: string;
  deliveryAddressId: number;
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName: string;
  areaId: number;
  areaName: string;
  consigneeName: string;
  consigneeNumber: string;
  customerId: string;
  needComplete: boolean;
  isDefaltAddress: 0 | 1;
  longitude: number;
  latitude: number;
  houseNum: string;
}
export interface GoodsDetailsProps {
  showSpec: boolean;
}
export interface GoodsDetailsContextValue {
  state: GoodsDetailsProps;
  setState: SetState<GoodsDetailsProps>
}