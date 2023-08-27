import { createWithEqualityFn } from 'zustand/traditional'

interface GoodsListState {
  goodsList: any[];
  pageNum: number;
  pageSize: number;
  total: number;
  reload:boolean
}
interface GoodsListActions {
  setState: (updates: Partial<GoodsListState>) => void;
  setPageNum: (pageNum: number) => void;
}
const defaultState: GoodsListState = {
  reload:false,
  pageNum: 0,
  pageSize: 20,
  total: 0,
  goodsList: [],
};
const useGoodsList = createWithEqualityFn<GoodsListState & GoodsListActions>()(
  (set) => ({
    ...defaultState,
    setPageNum: (pageNum) => set({ pageNum }),
    setState: (updates) => set((prev) => ({
      ...prev,
      ...updates,
    })),
  }),
  Object.is
)

export default useGoodsList