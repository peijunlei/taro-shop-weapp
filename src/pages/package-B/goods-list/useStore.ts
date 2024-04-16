import { create } from "zustand";
import { GoodsInfoItem } from "./types";

interface GoodsListState {
  loading: boolean;
  filterVisible: boolean;
  requestParams: {
    pageNum: number;
    pageSize: number;
    keywords: string;
  };
  goods: GoodsInfoItem[];
  total: number;
}
interface GoodsListActions {
  setGoods: (val: any) => void;
  setLoading: (val: boolean) => void;
  setTotal: (val: number) => void;
  setFilterVisible: (val: boolean) => void;
  // support ts  setRequestParams({keywords: 'xxx'}) setRequestParams({pageNum: xxx}) setRequestParams({keywords: 'xxx',pageNum:xxx})
  setRequestParams: (val: Partial<GoodsListState['requestParams']>) => void;

}
interface GoodsListStore extends GoodsListState, GoodsListActions { }

export const useGoodsList = create<GoodsListStore>((set) => ({
  goods: [],
  total: 0,
  filterVisible: false,
  requestParams: {
    pageNum: 0,
    pageSize: 10,
    keywords: ''
  },
  loading: false,
  setFilterVisible: (val) => set(() => ({ filterVisible: val })),
  setGoods: (val) => set(() => ({ goods: val })),
  setTotal: (val) => set(() => ({ total: val })),
  setLoading: (val) => set(() => ({ loading: val })),
  setRequestParams: (val) => set((state) => {
    return {
      requestParams: {
        ...state.requestParams,
        ...val
      }
    }
  })
}));

export default useGoodsList;