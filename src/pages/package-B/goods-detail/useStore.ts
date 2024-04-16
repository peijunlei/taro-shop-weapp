import { create } from "zustand";
import { AddressType, GoodsInfoType, GoodsType, goodsSpecsType } from "./types";

interface GoodsDetailsState {
  address: Partial<AddressType>;
  loading: boolean;
  images: string[];
  goodsInfos: GoodsInfoType[];
  showSpec: boolean;
  goods: GoodsType;
  goodsInfo: GoodsInfoType;
  goodsSpecs: goodsSpecsType[];
}
interface GoodsDetailsActions {
  setShowSpec: (val: boolean) => void;
  setGoods: (val: GoodsType) => void;
  setGoodsInfo: (val: GoodsInfoType) => void;
  setGoodsSpecs: (val: goodsSpecsType[]) => void;
  setGoodsInfos: (val: GoodsInfoType[]) => void;
  setImages: (val: string[]) => void;
  setLoading: (val: boolean) => void;
  setAddress: (val: AddressType) => void;
}
interface GoodsDetailsStore extends GoodsDetailsState, GoodsDetailsActions { }

const defaultGoodsInfo: GoodsInfoType = {
  marketPrice: 0,
  stock: 0,
  goodsInfoImg: '',
  goodsInfoId: '',
  mockSpecIds: [],
  mockSpecDetailIds: [],
  goodsUnit: '',

}
export const useGoodsDetails = create<GoodsDetailsStore>((set) => ({
  showSpec: false,
  loading: false,
  goodsInfos: [defaultGoodsInfo],
  images: [],
  address: {},
  goods: {
    goodsName: '',
    goodsSubtitle: '',
    goodsUnit: '',
    goodsId: '',
    goodsLabelList: [],
  },
  goodsInfo: defaultGoodsInfo,
  goodsSpecs: [
    {
      specId: 0,
      specName: '',
      specDetailIds: [],
      specDetails: [],
    }
  ],
  setAddress: (val) => set(() => ({ address: val })),
  setLoading: (val) => set(() => ({ loading: val })),
  setShowSpec: (val) => set(() => ({ showSpec: val })),
  setGoods: (val) => set(() => ({ goods: val })),
  setGoodsInfo: (val) => set(() => ({ goodsInfo: val })),
  setGoodsSpecs: (val) => set(() => ({ goodsSpecs: val })),
  setGoodsInfos: (val) => set(() => ({ goodsInfos: val })),
  setImages: (val) => set(() => ({ images: val })),

}));

export default useGoodsDetails;