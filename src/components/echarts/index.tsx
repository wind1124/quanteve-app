import { useEffect, useRef } from 'react'
import { View } from '@tarojs/components'
import * as echarts from 'echarts'

function Echarts(props) {
  useEffect(() => {
    let chart
    const height = 220
    const width = window.innerWidth - 30
    chart = echarts.init(ref.current, 'light', {
      renderer: 'svg',
      width,
      height
    })
    chart.setOption(props.option)
    return () => chart?.dispose()
  }, [props.option])
  const ref = useRef(null)
  return <View ref={ref} style={{ width: '100%', height: '100%' }} />
}

export default Echarts
