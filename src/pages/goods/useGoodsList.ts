import { createWithEqualityFn } from 'zustand/traditional'

interface GoodsListState {
  loading:boolean;
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
  loading:false,
  reload:false,
  pageNum: 0,
  pageSize: 10,
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