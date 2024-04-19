
import React, { useMemo } from "react";
import { pxTransform } from '@tarojs/taro'
import Cell from "@/components/cell";
import useGoodsDetails from "../../useStore";


function Specifications() {
  const { goodsInfo, goodsSpecs } = useGoodsDetails((state) => state);
  const { setShowSpec } = useGoodsDetails((state) => state);

  const str = useMemo(() => {
    return goodsSpecs.reduce((acc: string[], cur) => {
      const str = cur.specDetails.find((item) => goodsInfo.mockSpecDetailIds.includes(item.specDetailId))?.detailName
      if (str) {
        acc.push(str)
      }
      return acc
    }, []).join(' ')
  }, [goodsSpecs, goodsInfo])

  function hancleClick() {
    setShowSpec(true)
  }
  return (
    <Cell title='规格' desc={str||'无'} style={{ marginBottom: pxTransform(24) }} onClick={hancleClick} />
  );
}

export default Specifications;