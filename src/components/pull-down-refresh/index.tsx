import useSetState from "@/hooks/useSetState";
import { ScrollView, View } from "@tarojs/components";
import cn from "classnames";
import React, { useEffect, useRef } from "react";
import { MyContext } from "./context";
import { DataProps, PullDownRefreshProps } from "./types";

import './index.scss'
import Taro from "@tarojs/taro";

const loadingTexts = ['下拉刷新', '松手刷新', '正在刷新', '刷新完成']
function PullDownRefresh(props: PullDownRefreshProps) {
  const {
    trigger,
    onPullDownRefresh,
    onTriggerChange,
    onScrollToLower,
    children,
    maxBarHeight = 100,
    loadingBarHeight = 50,
    style,
    className
  } = props;

  const [state, setState] = useSetState<DataProps>({
    showTop: false,
    enableToRefresh: true,
    refreshStatus: -1,
    barHeight: 0,
    scrollTop: 0,
    loosing: false,
    computedLoadingBarHeight: 0,
    trigger: false
  })
  const { scrollTop, loosing, barHeight, refreshStatus, enableToRefresh, showTop } = state
  const startPoint = useRef<any>(null)
  const isPulling = useRef<boolean>(false)
  const screenHeight = useRef<number>(0)
  const closingAnimateTimeFlag = useRef<any>(null)
  function onTouchStart(e) {
    const { touches } = e;
    if (isPulling.current || !enableToRefresh) return;
    if (touches.length !== 1) return;
    console.log('start');
    const { pageX, pageY } = touches[0];
    setState({ loosing: false });
    startPoint.current = { pageX, pageY }
    isPulling.current = true


  }
  function setRefreshBarHeight(barHeight) {
    let refreshStatus = -1
    if (barHeight >= loadingBarHeight) {
      refreshStatus = 1;
    }
    else {
      refreshStatus = 0;
    }
    setState({ barHeight, refreshStatus })
  }
  function onTouchMove(e: any) {
    const { touches } = e;
    if (!startPoint.current) return;
    if (touches.length !== 1) return;
    console.log('move');

    const { pageY } = touches[0];
    const offset = pageY - startPoint.current.pageY;
    const _barHeight = offset
    if (_barHeight > 0) {
      if (_barHeight > maxBarHeight) {
        setRefreshBarHeight(maxBarHeight);
      }
      else {
        setRefreshBarHeight(_barHeight);
      }
    }
  }
  function onTouchEnd(e) {
    const { changedTouches } = e;
    if (!startPoint.current) return;
    if (changedTouches.length !== 1) return;
    console.log('end');

    const { pageY } = changedTouches[0];
    const barHeight = pageY - startPoint.current.pageY
    startPoint.current = null;
    setState({ loosing: true });
    if (barHeight > loadingBarHeight) {
      setState({
        barHeight: loadingBarHeight,
        refreshStatus: 2,
        trigger: true
      });
      onTriggerChange?.(true)
      onPullDownRefresh?.()
    }
    else {
      close();
    }
  }
  function close() {
    setState({ barHeight: 0, trigger: false });
    onTriggerChange?.(false)
    closingAnimateTimeFlag.current = setTimeout(() => {
      closingAnimateTimeFlag.current = null;
      setState({ refreshStatus: -1 });
      isPulling.current = false;
    }, 240);
  }
  function onScroll(e) {
    const { scrollTop } = e.detail;
    setState({
      scrollTop: scrollTop,
      enableToRefresh: Math.floor(scrollTop) === 0,
      showTop: scrollTop >= screenHeight.current
    });
  }
  useEffect(() => {
    Taro.getSystemInfo({
      success(res) {
        screenHeight.current = res.screenHeight
      }
    })
  }, [])
  useEffect(() => {

    if (!trigger) {
      setState({ refreshStatus: 3 });
      close();
    }
  }, [trigger])
  return (
    <MyContext.Provider value={{ state, setState }} >
      <ScrollView
        style={style}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={cn('t-pull-down-trigger', className)}
        scrollTop={scrollTop}
        onScroll={onScroll}
        onScrollToLower={onScrollToLower}
        onScrollToUpper={() => { setState({ enableToRefresh: true }) }}
        scrollY
      >
        <View
          className={cn("t-pull-down-refresh__track", { 't-pull-down-refresh__track--loosing': loosing })}
          style={barHeight > 0 ? { transform: `translate3d(0, ${barHeight}px, 0)` } : {}}
        >
          <View className='tips' style={{ height: loadingBarHeight }}>
            {
              refreshStatus === 2 && (
                <View className='loading'>
                  loading...
                </View >
              )
            }
            {
              refreshStatus >= 0 && (
                <View className='text'>
                  {loadingTexts[refreshStatus]}
                </View >
              )
            }
          </View>
          {children}
        </View>
        {
          showTop && (
            <View className='toTop' onClick={() => {
              setState({ scrollTop: 0 })
            }}
            >
              👆
            </View>
          )
        }
      </ScrollView>
    </MyContext.Provider>
  )
}

export default PullDownRefresh;