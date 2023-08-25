import { SetState } from "@/hooks/useSetState";
import { ScrollViewProps } from "@tarojs/components";
import React, { CSSProperties } from "react";



export interface DataProps {
  showTop:boolean;
  enableToRefresh:boolean;
  scrollTop: number;
  loosing: boolean;
  barHeight: number;
  computedLoadingBarHeight: number;
  refreshStatus: number;
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
  className?:string
}
export type MyContextProps = {
  state: DataProps;
  setState: SetState<DataProps>;
} 