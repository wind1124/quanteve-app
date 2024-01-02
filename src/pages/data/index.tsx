import { useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import { formatMoney, formatPercent } from '@/utils'
import LinearGradient from 'linear-gradient-taro'
import Taro, { useDidShow } from '@tarojs/taro'
import Chart from '@/components/echarts'
import request from '@/utils/request'
import dayjs from 'dayjs'

import ETH from '@/assets/images/1.png'
import BTC from '@/assets/images/4.png'
import USDT from '@/assets/images/3.png'

export default () => {
  const T = useI18n()
  const [checked, setChecked] = useState(1)
  const [tab, setTab] = useState(1)
  const [option, setOption] = useState({} as any)
  const [rawData, setRawData] = useState([] as any)
  const [isUpdate, setIsUpdate] = useState(false)
  const [wrapStyle, setWrapStyle] = useState({})
  // 单独存储数据
  const [storeData, setStoreData] = useState({} as any)

  async function handleChecked(type) {
    setChecked(type)

    if (type === 1) {
      const data = await request.get('/h5/funds/pnlDailyByUserId', {
        userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data)
          .id,
        startTime: dayjs().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      if (data.length === 0) return
      setOption(getOption(data))
    } else if (type === 2) {
      const data = await request.get('/h5/funds/pnlDailyByUserId', {
        userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data)
          .id,
        startTime: dayjs().subtract(365, 'day').format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      if (data.length === 0) return
      setOption(getOption(data))
    }
  }

  function handleTabs(type) {
    setTab(type)

    if (type === 1) {
      setStoreData(rawData)
    }
    if (type === 2) {
      setStoreData({})
    }
    if (type === 3) {
      setStoreData({})
    }
  }

  useEffect(() => {
    ;(async () => {
      if (process.env.TARO_ENV === 'h5') {
        const res = await Taro.getSystemInfo()
        setWrapStyle({
          height: `${
            (res.windowHeight < res.screenHeight
              ? res.screenHeight
              : res.windowHeight) - 60
          }px`
        })
      }
    })()
  }, [])

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: T('数据中心')
    })
    ;(async () => {
      Promise.all([
        await Taro.setTabBarItem({
          index: 0,
          text: T('数据中心')
        }),
        await Taro.setTabBarItem({
          index: 1,
          text: T('结算中心')
        }),
        await Taro.setTabBarItem({
          index: 2,
          text: T('个人中心')
        })
      ])

      Taro.showLoading({
        title: T('加载中')
      })
      try {
        const [response1, response2] = await Promise.all([
          request.get('/h5/funds/dataCenterByUserId', {
            userId: JSON.parse(
              (
                await Taro.getStorage({ key: 'userInfo' })
              ).data
            ).id
          }),
          request.get('/h5/funds/pnlDailyByUserId', {
            userId: JSON.parse(
              (
                await Taro.getStorage({ key: 'userInfo' })
              ).data
            ).id,
            startTime: dayjs()
              .subtract(30, 'day')
              .format('YYYY-MM-DD HH:mm:ss'),
            endTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
          })
        ])
        // asset  用户的资产类型
        response1 && setRawData(response1)
        response1 && setStoreData(response1)
        if (response2.length === 0) return
        setOption(getOption(response2))
        process.env.TARO_ENV === 'rn' && setIsUpdate(!isUpdate)
      } catch (error) {
        if (error.errMsg === 'getStorage:fail data not found') {
          Taro.redirectTo({
            url: '/pages/login/index'
          })
          return
        }
      } finally {
        Taro.hideLoading()
      }
    })()
  })

  const getOption = _rawData => {
    return {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return ['20%', '15%']
        },
        extraCssText:
          'z-index: 9999; background: linear-gradient(180deg, #D9C187 0%, #F5EEC4 50%, #D8C175 100%); border-color: #D9C187; '
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        nameLocation: 'middle',
        boundaryGap: false,
        data: _rawData.map(item => dayjs(item.incomeDate).format('YYYY-MM-DD'))
      },
      yAxis: {
        type: 'value',
        name: ''
      },
      textStyle: {
        color: '#f4dfad'
      },
      series: [
        {
          name: T('总盈利'),
          type: 'line',
          showSymbol: false,
          data: _rawData.map(item => item.realizedPnl),
          itemStyle: {
            color: '#71c1f6'
          }
        },
        {
          name: T('用户盈利'),
          type: 'line',
          showSymbol: false,
          data: _rawData.map(item => item.userIncome),
          itemStyle: {
            color: '#f55d55'
          }
        }
      ]
    }
  }

  return (
    <ScrollView
      scrollY
      enableBackToTop
      className={'dataCenter-wrap'}
      style={wrapStyle}
    >
      <View className={'dataCenter-totlaPriceWrap'}>
        <View className={'dataCenter-priceWrap'}>
          <View className={'dataCenter-price'}>
            {formatMoney(rawData.totalFunds)}
          </View>
          <View className={'dataCenter-priceName'}>{T('总投入金额')}</View>
        </View>
        <View className={'dataCenter-priceWrap'}>
          <View
            className={`dataCenter-price ${
              rawData?.totalProfit
                ? rawData?.totalProfit >= 0
                ? 'dataCenter-red'
                : 'dataCenter-green'
                : ''
            }`}
          >
            {formatMoney(rawData.totalProfit)}
          </View>
          <View className={'dataCenter-priceName'}>{T('总盈利')}</View>
        </View>
        <View className={'dataCenter-priceWrap'}>
          <View
            className={`dataCenter-price ${
              rawData?.totalProfit
                ? rawData?.totalProfit >= 0
                ? 'dataCenter-red'
                : 'dataCenter-green'
                : ''
            }`}
          >
            {formatPercent(rawData.totalProfitRatio)}
          </View>
          <View className={'dataCenter-priceName'}>{T('总盈利比例')}</View>
        </View>
      </View>
      <View
        className={
          'dataCenter-totlaPriceWrap dataCenter-mt dataCenter-chartHeight'
        }
      >
        <View className={'dataCenter-dataTrend'}>
          <View className={'dataCenter-dataTrendTitle'}>{T('数据趋势')}</View>
          <View className={'dataCenter-checked'}>
            <LinearGradient
              key={checked === 1 ? 1 : 'a'}
              className={'dataCenter-linearGradient'}
              colors={
                checked === 1
                  ? ['#D9C187', '#F5EEC4', '#D8C175']
                  : ['#ffffff00', '#ffffff00']
              }
            >
              <View
                className={'dataCenter-linearGradientText'}
                onClick={() => handleChecked(1)}
                style={{
                  color: checked === 1 ? '#4d3813' : '#C9C5B7'
                }}
              >
                30{T('天')}
              </View>
            </LinearGradient>
            <LinearGradient
              key={checked === 2 ? 2 : 'b'}
              className={'dataCenter-linearGradient'}
              colors={
                checked === 2
                  ? ['#D9C187', '#F5EEC4', '#D8C175']
                  : ['#ffffff00', '#ffffff00']
              }
            >
              <View
                className={'dataCenter-linearGradientText'}
                onClick={() => handleChecked(2)}
                style={{
                  color: checked === 2 ? '#4d3813' : '#C9C5B7'
                }}
              >
                {T('所有时间')}
              </View>
            </LinearGradient>
          </View>
        </View>

        <View className={'dataCenter-chart'}>
          <Chart option={option} key={~isUpdate} />
        </View>
      </View>

      <View className={'dataCenter-totlaPriceWrap dataCenter-mt'}>
        <View className={'dataCenter-tabs'}>
          <View className={'dataCenter-checked'}>
            <LinearGradient
              key={tab === 1 ? 1 : 'c'}
              className={'dataCenter-linearGradient'}
              colors={
                tab === 1
                  ? ['#D9C187', '#F5EEC4', '#D8C175']
                  : ['#ffffff00', '#ffffff00']
              }
            >
              <View
                className={'dataCenter-linearGradientText'}
                onClick={() => handleTabs(1)}
                style={{
                  color: tab === 1 ? '#4d3813' : '#C9C5B7'
                }}
              >
                <Image src={USDT} className={'dataCenter-linearGradientImg'} />
                USDT
              </View>
            </LinearGradient>
            <LinearGradient
              key={tab === 2 ? 2 : 'd'}
              className={'dataCenter-linearGradient'}
              colors={
                tab === 2
                  ? ['#D9C187', '#F5EEC4', '#D8C175']
                  : ['#ffffff00', '#ffffff00']
              }
            >
              <View
                className={'dataCenter-linearGradientText'}
                onClick={() => handleTabs(2)}
                style={{
                  color: tab === 2 ? '#4d3813' : '#C9C5B7'
                }}
              >
                <Image src={ETH} className={'dataCenter-linearGradientImg'} />
                ETH
              </View>
            </LinearGradient>
            <LinearGradient
              key={tab === 3 ? 3 : 'e'}
              className={'dataCenter-linearGradient'}
              colors={
                tab === 3
                  ? ['#D9C187', '#F5EEC4', '#D8C175']
                  : ['#ffffff00', '#ffffff00']
              }
            >
              <View
                className={'dataCenter-linearGradientText'}
                onClick={() => handleTabs(3)}
                style={{
                  color: tab === 3 ? '#4d3813' : '#C9C5B7'
                }}
              >
                <Image src={BTC} className={'dataCenter-linearGradientImg'} />
                BTC
              </View>
            </LinearGradient>
          </View>
        </View>
        <View className={'dataCenter-totlaPriceWrap dataCenter-mb'}>
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatMoney(storeData?.totalFunds)}
            </View>
            <View className={'dataCenter-priceName'}>{T('总投入金额')}</View>
          </View>
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatMoney(storeData?.totalProfit)}
            </View>
            <View className={'dataCenter-priceName'}>{T('总盈利')}</View>
          </View>
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatPercent(storeData?.totalProfitRatio)}
            </View>
            <View className={'dataCenter-priceName'}>{T('总盈利比例')}</View>
          </View>
        </View>
      </View>

      <View className={'dataCenter-realTime'}>
        {T('实时账户情况')}({T('每月1号起算')})
      </View>

      <View className={'dataCenter-totlaPriceWrap'}>
        <View className={'dataCenter-priceWrap'}>
          <View className={'dataCenter-price'}>{rawData.closeTask ?? 0}</View>
          <View className={'dataCenter-priceName'}>{T('已平仓任务')}</View>
        </View>
        <View className={'dataCenter-priceWrap'}>
          <View className={'dataCenter-price'}>
            {formatMoney(rawData.currentProfit)}
          </View>
          <View className={'dataCenter-priceName'}>{T('已平仓收益')}</View>
        </View>
        <View className={'dataCenter-priceWrap'}>
          <View className={'dataCenter-price'}>
            {formatPercent(rawData.currentProfitRatio)}
          </View>
          <View className={'dataCenter-priceName'}>{T('已平仓收益率')}</View>
        </View>
        <View className={'dataCenter-priceWrap'}>
          <View className={'dataCenter-price'}>
            {formatPercent(rawData.winRate)}
          </View>
          <View className={'dataCenter-priceName'}>{T('交易胜率')}</View>
        </View>
      </View>

      <View className={'dataCenter-flex'}>
        <View
          className={
            'dataCenter-totlaPriceWrap dataCenter-top20 dataCenter-mr0'
          }
        >
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatPercent(rawData.actualProfitRatio)}
            </View>
            <View className={'dataCenter-priceName'}>
              {T('实时月化收益率')}
            </View>
          </View>
        </View>
        <View className={'dataCenter-totlaPriceWrap dataCenter-top20'}>
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatPercent(rawData.predictProfitRatio)}
            </View>
            <View className={'dataCenter-priceName'}>
              {T('预计月化收益率')}
            </View>
          </View>
        </View>
      </View>

      <View className={'dataCenter-flex dataCenter-pd'}>
        <View
          className={
            'dataCenter-totlaPriceWrap dataCenter-top20 dataCenter-mr0'
          }
        >
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatPercent(rawData.yearProfitRatio)}
            </View>
            <View className={'dataCenter-priceName'}>
              {T('实时年化收益率')}
            </View>
          </View>
        </View>
        <View className={'dataCenter-totlaPriceWrap dataCenter-top20'}>
          <View className={'dataCenter-priceWrap'}>
            <View className={'dataCenter-price'}>
              {formatPercent(rawData.predictYearProfitRatio)}
            </View>
            <View className={'dataCenter-priceName'}>
              {T('预计年化收益率')}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
