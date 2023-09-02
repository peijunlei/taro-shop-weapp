import { createWithEqualityFn } from 'zustand/traditional'
import { IGoodsInfo, IGoodsSpecDetailItem, IGoodsSpecItem } from './type';
import { isLogin } from '@/utils';
import { fetchGoodsIsFollow } from './webapi';

interface GoodsDetailState {

  skuId: string;
  goodsInfos: any[];
  goodsInfo: Partial<IGoodsInfo>;
  goods?: unknown;
  goodsSpecs?: IGoodsSpecItem[],
  goodsSpecDetails?: IGoodsSpecDetailItem[],
  images: any[];
  isFollow: boolean;
}
interface GoodsDetailActions {
  setState: (updates: Partial<GoodsDetailState>) => void;
  initIsFollow: (skuId: string) => Promise<void>
}
const defaultState: GoodsDetailState = {
  skuId: '',
  goodsInfo: {},
  images: [],
  goodsInfos: [],
  isFollow: false
};
const useGoodsDetail = createWithEqualityFn<GoodsDetailState & GoodsDetailActions>()(
  (set) => ({
    ...defaultState,
    setState: (updates) => set((prev) => ({
      ...prev,
      ...updates,
    })),
    initIsFollow: async (skuId) => {
      if (!isLogin()) return
      const res = await fetchGoodsIsFollow(skuId)
      return set({ isFollow: res })
    }
  }),
  Object.is
)

export default useGoodsDetail