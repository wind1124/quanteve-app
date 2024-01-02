import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import { formatMoney, formatPercent } from '@/utils'
import Taro, { useDidShow } from '@tarojs/taro'
import Popup from '@/components/popup'
import QrCode from '@/components/qrcode'
import LinearGradient from 'linear-gradient-taro'
import request from '@/utils/request'
import dayjs from 'dayjs'

import ETH from '@/assets/images/1.png'
import BTC from '@/assets/images/4.png'
import USDT from '@/assets/images/3.png'

const QUERY_PLATFORM_INFO = '/h5/funds/queryPlatformInfo?symbol='
const QUERY_FINAL_STATE = '/h5/funds/queryFinalStateByUserId'

const fetchPlatformInfo = async symbol => {
  const response = await request.get(`${QUERY_PLATFORM_INFO}${symbol}`)
  return response.platformReceiveAddress
}

const maskMiddleOfString = str => {
  if (!str || str == null || str == undefined) return ''
  return str.replace(/(\S{8})(\S+)(\S{8})/, '$1****$3')
}

const fetchFinalState = async data => {
  const response = await request.get(QUERY_FINAL_STATE, data)
  if (!response) return {}
  response.platformIncome = +response.platformIncome
  response.closeTime = dayjs(response.closeTime).format('YYYY-MM-DD')
  return response
}

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [popupData, setPopupData] = useState({ visible: false })
  const [rawData, setRawData] = useState({})
  const [strUsdt, setStrUsdt] = useState('')
  const [strEth, setStrEth] = useState('')
  const [strBtc, setStrBtc] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      Taro.showLoading({
        title: T('加载中')
      })
      try {
        const [data, USDT, ETH, BTC] = await Promise.all([
          fetchFinalState({
            userId: JSON.parse(
              (
                await Taro.getStorage({ key: 'userInfo' })
              ).data
            ).id
          }),
          fetchPlatformInfo('USDT'),
          fetchPlatformInfo('ETH'),
          fetchPlatformInfo('BTC')
        ])
        setRawData(data)
        setStrUsdt(USDT)
        setStrEth(ETH)
        setStrBtc(BTC)
      } catch (error) {
        console.error(error)
      } finally {
        Taro.hideLoading()
      }
    }
    fetchData()
  }, [])

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: T('结算中心')
    })
    const fetchPageHeight = async () => {
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
    }
    fetchPageHeight()
  })

  const handleClick = item => {
    setPopupData({ visible: true, ...item })
  }

  const handleCopy = () => {
    Taro.setClipboardData({
      data: popupData.address,
      success: function () {
        Taro.getClipboardData({
          success: function () {
            Taro.showToast({ title: T('复制成功') })
            setPopupData({ visible: false })
          }
        })
      }
    })
  }

  const handleDetail = () => {
    Taro.navigateTo({ url: '/pages/settlement/detail/index' })
  }
  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="settlement-wrap"
        style={wrapStyle}
      >
        <View className="settlement-title">{T('待支付结算账单')}</View>
        <View className="settlement-totlaPriceWrap">
          <View className="settlement-priceWrap">
            <View className="settlement-price">
              {formatMoney(rawData?.platformIncome)}
            </View>
            <View className="settlement-priceName">USDT{T('待支付')}</View>
          </View>
          <View className="settlement-priceWrap">
            <View className="settlement-price">{formatMoney(0)}</View>
            <View className="settlement-priceName">ETH{T('待支付')}</View>
          </View>
          <View className="settlement-priceWrap">
            <View className="settlement-price">{formatMoney(0)}</View>
            <View className="settlement-priceName">BTC{T('待支付')}</View>
          </View>
        </View>
        <View className="settlement-title settlement-top20">
          {T('结算收款地址')}
        </View>
        <View className="settlement-list">
          <View
            className="settlement-item"
            onClick={() => {
              if (!strEth) return
              handleClick({
                title: 'ETH',
                address: strEth
              })
            }}
          >
            <View className="settlement-header">
              <Image src={ETH} className="settlement-headerImg" />
              ETH
            </View>
            <View className="settlement-bankInfo">
              <View className="settlement-bank">
                {maskMiddleOfString(strEth)}
              </View>
              <View className="settlement-check">{T('查看')}</View>
            </View>
          </View>
          <View
            className="settlement-item settlement-top20"
            onClick={() => {
              if (!strBtc) return
              handleClick({
                title: 'BTC',
                address: strBtc
              })
            }}
          >
            <View className="settlement-header">
              <Image src={BTC} className="settlement-headerImg" />
              BTC
            </View>
            <View className="settlement-bankInfo">
              <View className="settlement-bank">
                {maskMiddleOfString(strBtc)}
              </View>
              <View className="settlement-check">{T('查看')}</View>
            </View>
          </View>
          <View
            className="settlement-item settlement-top20"
            onClick={() => {
              if (!strUsdt) return
              handleClick({
                title: 'USDT',
                address: strUsdt
              })
            }}
          >
            <View className="settlement-header">
              <Image src={USDT} className="settlement-headerImg" />
              USDT
            </View>
            <View className="settlement-bankInfo">
              <View className="settlement-bank">
                {maskMiddleOfString(strUsdt)}
              </View>
              <View className="settlement-check">{T('查看')}</View>
            </View>
          </View>
        </View>
        <View className="settlement-title settlement-top20">
          {T('结算明细')}
        </View>
        <View className="settlement-list">
          <View className="settlement-item settlement-p0 settlement-border0">
            <View className="settlement-table-container">
              <View className="settlement-header-row">
                <View className="settlement-header-cell">{T('结算单ID')}</View>
                <View className="settlement-header-cell">{T('结算周期')}</View>
                <View className="settlement-header-cell">{T('币种')}</View>
                <View className="settlement-header-cell">
                  {T('已实现盈亏')}
                </View>
                <View className="settlement-header-cell">{T('结算详情')}</View>
              </View>
              {rawData?.userId && (
                <View className="settlement-row">
                  <View className="settlement-cell">{rawData?.userId}</View>
                  <View className="settlement-cell">{rawData?.period}</View>
                  <View className="settlement-cell">{rawData?.asset}</View>
                  <View className="settlement-cell">
                    {formatPercent(rawData.ratio)}
                  </View>
                  <View className="settlement-cell" onClick={handleDetail}>
                    {T('详情')}
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <Popup
        mode="center"
        visible={popupData.visible}
        onClose={() =>
          setPopupData({
            visible: false
          })
        }
      >
        <View className="settlement-qrcode">
          <View className="settlement-title">
            {popupData.title}
            {T('地址')}(ERC-20)
          </View>
          <QrCode value={popupData.address} size={200} />
          <View className="settlement-address">
            {maskMiddleOfString(popupData.address)}
          </View>
          <LinearGradient
            className="settlement-linearGradient"
            colors={['#D9C187', '#F5EEC4', '#D8C175']}
          >
            <View
              className="settlement-linearGradientText"
              onClick={handleCopy}
            >
              {T('复制')}
            </View>
          </LinearGradient>
        </View>
      </Popup>
    </>
  )
}
