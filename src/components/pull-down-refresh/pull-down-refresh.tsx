import React, { useEffect, useRef } from "react";
import Taro from "@tarojs/taro";
import { ITouchEvent, ScrollView, View } from "@tarojs/components";
import useSetState from "@/hooks/useSetState";
import cn from "classnames";
import { MyContext } from "./context";
import { DataProps, PullDownRefreshProps, RefreshStatusEnum } from "./types";

import './index.scss'

const loadingTexts = ['下拉刷新', '松手刷新', 'loading...', '刷新完成']
function PullDownRefresh(props: PullDownRefreshProps) {
  const {
    trigger,
    onPullDownRefresh,
    onTriggerChange,
    onScrollToLower,
    children,
    loadingBarHeight = 50,
    style,
    className
  } = props;

  const [state, setState] = useSetState<DataProps>({
    showTop: false,
    enableToRefresh: true,
    refreshStatus: RefreshStatusEnum.NONE,
    barHeight: 0,
    scrollTop: 0,
    loosing: false,
    computedLoadingBarHeight: 0,
    trigger: false
  })
  const { scrollTop, loosing, barHeight, refreshStatus } = state
  const startPoint = useRef<{ pageX: number, pageY: number }>()
  const isPulling = useRef<boolean>(false)
  const moveRef = useRef<boolean>(false)
  function onTouchStart(e:ITouchEvent) {
    const { touches } = e;
    if (isPulling.current  || touches.length !== 1) return;
    isPulling.current = true
    const { pageX, pageY } = touches[0];
    setState({ loosing: false });
    startPoint.current = { pageX, pageY }
  }
  function setRefreshBarHeight(barH: number) {
    setState({
      barHeight: barH,
      refreshStatus: barH >= loadingBarHeight ? RefreshStatusEnum.LOOSE : RefreshStatusEnum.PULL_DOWN
    })
  }
  function onTouchMove(e: ITouchEvent) {
    const { touches } = e;
    moveRef.current = true
    if (!startPoint.current || touches.length !== 1) return;
    const { pageY } = touches[0];
    //滑动距离
    let offset = pageY - startPoint.current.pageY;
    if(offset < 0) return isPulling.current = false
    
    if (offset > loadingBarHeight) {
      offset = (offset - loadingBarHeight) / 2 + loadingBarHeight;
      setRefreshBarHeight(offset);
    } else {
      setRefreshBarHeight(offset);
    }
  }
  function onTouchEnd(e:ITouchEvent) {

    const { changedTouches } = e;
    if (!startPoint.current || !moveRef.current || changedTouches.length !== 1) return;
    moveRef.current = false
    const { pageY } = changedTouches[0];
    const offset = pageY - startPoint.current.pageY
    if(offset < 0) return isPulling.current = false
    
    startPoint.current = undefined;
    setState({ loosing: true });
    if (offset > loadingBarHeight) {
      setState({
        barHeight: loadingBarHeight,
        refreshStatus: RefreshStatusEnum.LOADING,
      });
      onTriggerChange?.(true)
      onPullDownRefresh?.()
    }
    else {
      //未触发下拉的关闭
      closeRefresh(true);
    }
  }
  function closeRefresh(bool: boolean = false) {
    setState({
      refreshStatus: bool ? RefreshStatusEnum.NONE : RefreshStatusEnum.COMPLETE,
    });
    setTimeout(() => {
      setState({
        barHeight: 0,
      });
      isPulling.current = false;

    }, bool ? 0 : 500);
  }
  function onScroll(e) {
    // const { scrollTop } = e.detail;
    // setState({
    //   scrollTop: scrollTop,
    //   enableToRefresh: Math.floor(scrollTop) === 0,
    //   showTop: scrollTop >= screenHeight.current
    // });
  }
  useEffect(() => {
    console.log('trigger', trigger);
    if (!trigger) {
      closeRefresh();
    }
  }, [trigger])
  return (
    <MyContext.Provider value={{ state, setState }} >
      <ScrollView
        style={style}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn('pull-down-refresh', className)}
        scrollTop={scrollTop}
        onScroll={onScroll}
        onScrollToLower={onScrollToLower}
        onScrollToUpper={() => { setState({ enableToRefresh: true }) }}
        scrollY
      >
        <View
          className={cn("pull-down-refresh__track", { 'pull-down-refresh__track__loosing': loosing })}
          style={barHeight > 0 ? { transform: `translate3d(0, ${barHeight}px, 0)` } : {}}
        >
          <View className='tips' style={{ height: loadingBarHeight }}>
            {
              refreshStatus !== RefreshStatusEnum.NONE && (
                <View className='text'>
                  {loadingTexts[refreshStatus]}
                </View >
              )
            }
          </View>
          {children}
        </View>
      </ScrollView>
    </MyContext.Provider>
  )
}

export default PullDownRefresh;