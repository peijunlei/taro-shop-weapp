


import { View, Canvas } from '@tarojs/components'
import Taro, { CanvasContext } from '@tarojs/taro'
import { useRef, useEffect } from 'react'

export default function Login() {
  const canvasRef = useRef<CanvasContext>()
  useEffect(() => {
    canvasRef.current = Taro.createCanvasContext('canvasId')
    canvasRef.current.setLineWidth(10)
    canvasRef.current.setStrokeStyle('#000')
    canvasRef.current.rect(0, 0, 200, 200)
    drawRect(100, 100, 100, 50, 25)

    // context.stroke()

    // // context.setLineWidth(2)
    // context.moveTo(40, 40)
    // context.arc(100, 100, 60, Math.PI, Math.PI * 2.5)
    // // context.moveTo(140, 100)
    // // context.arc(100, 100, 40, 0, Math.PI, false)
    // // context.moveTo(85, 80)
    // // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    // // context.moveTo(125, 80)
    // // context.arc(120, 80, 5, 0, 2 * Math.PI, true)

    // context.draw()
  }, [])


  function drawRect(x: number, y: number, w: number, h: number, r: number, lw: number = 1, color: string = '#000',) {
    const ctx = canvasRef.current!
    ctx.setLineWidth(lw)
    ctx.setStrokeStyle(color)
    //从 长方形的左上角的圆弧开始画起  起点是圆弧的左边
    ctx.moveTo(x - w / 2, y + r - h / 2)
    ctx.arc(x + r - w / 2, y + r - h / 2, r, Math.PI, Math.PI * 1.5)
    ctx.lineTo(x - r + w / 2, y - h / 2)
    ctx.arc(x - r + w / 2, y + r - h / 2, r, 1.5 * Math.PI, 2 * Math.PI)
    ctx.lineTo(x + w / 2, y - r + h / 2)
    ctx.arc(x - r + w / 2, y - r + h / 2, r, 0, 0.5 * Math.PI)
    ctx.lineTo(x + r - w / 2, y + h / 2)
    ctx.arc(x + r - w / 2, y - r + h / 2, r, 0.5 * Math.PI, Math.PI)
    ctx.closePath()
    ctx.stroke()
    ctx.draw()
  }


  return (
    <View className='pages'>
      <Canvas canvasId='canvasId' style={{ width: 200, height: 200 }}></Canvas>
    </View>
  )
}
