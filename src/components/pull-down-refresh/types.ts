import { SetState } from "@/hooks/useSetState";
import { ScrollViewProps } from "@tarojs/components";
import React, { CSSProperties } from "react";



export interface DataProps {
  showTop: boolean;
  enableToRefresh: boolean;
  scrollTop: number;
  loosing: boolean;
  barHeight: number;
  computedLoadingBarHeight: number;
  refreshStatus: RefreshStatusEnum;
  trigger: boolean

}
export interface PullDownRefreshProps extends React.PropsWithChildren {
  style?: CSSProperties;
  onPullDownRefresh?: () => void;
  enableToRefresh?: boolean;
  /**可下拉的最大距离 */
  maxBarHeight?: number;
  loadingBarHeight?: number;
  trigger: boolean;
  onTriggerChange?: (val: boolean) => void
  onScrollToLower?: () => void
  className?: string
}
export enum RefreshStatusEnum {
  NONE = -1,
  /**下拉刷新 */
  PULL_DOWN = 0,
  /**松手刷新 */
  LOOSE = 1,
  /**loading... */
  LOADING = 2,
  /**刷新完成 */
  COMPLETE = 3

}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
} 