import { useEffect, useState } from 'react'
import { View, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import { formatPercent } from '@/utils'
import request from '@/utils/request'
import dayjs from 'dayjs'
import Taro from '@tarojs/taro'

const QUERY_FINAL_STATE = '/h5/funds/queryFinalStateByUserId'

const fetchFinalState = async data => {
  const response = await request.get(QUERY_FINAL_STATE, data)
  if (!response) return {}
  response.platformIncome = +response.platformIncome
  response.closeTime = dayjs(response.closeTime).format('YYYY-MM-DD')
  return response
}

export default () => {
  const T = useI18n()
  const [rawData, setRawData] = useState<any>({})
  const [wrapStyle, setWrapStyle] = useState({})

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('结算详单')
    })
    ;(async () => {
      const data = await fetchFinalState({
        userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data).id
      })
      setRawData(data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (process.env.TARO_ENV === 'h5') {
        const res = await Taro.getSystemInfo()
        setWrapStyle({
          height: `${
            (res.windowHeight < res.screenHeight
              ? res.screenHeight
              : res.windowHeight) - 10
          }px`
        })
      }
    })()
  }, [])

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="settlementDetail-wrap"
        style={wrapStyle}
      >
        <View className="settlementDetail-hello">{T('您好')}:</View>
        <View className="settlementDetail-box settlementDetail-top20">
          <View className="settlementDetail-text">{T('本期结算详单')}:</View>
          <View className="settlementDetail-text">
            {T('结算周期')}: {rawData?.period}
          </View>
          <View className="settlementDetail-text">
            {T('总收益额')}: {rawData?.totalIncome} {rawData?.asset}
          </View>
          <View className="settlementDetail-text">
            {T('您的收益')}: {rawData?.userIncome} {rawData?.asset}
          </View>
          <View className="settlementDetail-text">
            {T('收益提成')}: {rawData?.platformIncome} {rawData?.asset}
          </View>
          <View className="settlementDetail-text">
            {T('本期待支付')}: {rawData?.platformIncome} {rawData?.asset}
          </View>
        </View>
        <View className="settlementDetail-box settlementDetail-top20">
          <View className="settlementDetail-text">{T('备注')}:</View>
          <View className="settlementDetail-text">
            1. {T('总收益额 = 不分成总收益 + 分成总收益')}
          </View>
          <View className="settlementDetail-text">
            2. {T('您的收益 = 本期总收益 * 50%')}
          </View>
          <View className="settlementDetail-text">
            3. {T('收益提成 = 本期总收益 * 50%')}
          </View>
          <View className="settlementDetail-text">
            4. {T('本期待支付 = 收益提成')}
          </View>
        </View>
        <View className="settlementDetail-top20">
          <View className="settlementDetail-err">{T('注意')}：</View>
          <View className="settlementDetail-err">
            1.{T('请确认是否已绑定付款地址，如未绑定，请绑定后再进行付款；')}
          </View>
          <View className="settlementDetail-err">
            2.
            {T(
              '请您于账单出单日起7日内完成付款，完成付款后3个工作日完成审核，审核完成待支付结算金额为0；'
            )}
          </View>
          <View className="settlementDetail-err">
            3.{T('如未在7日内完成支付，系统将自动停止运行策略。')}
          </View>
        </View>
        <View className="settlementDetail-box settlementDetail-top20">
          <View className="settlementDetail-text">
            {T('结算单')}
            {rawData?.staCode}
            {T('明细')}
          </View>
          <View className="settlementDetail-table-container settlementDetail-top20">
            <View className="settlementDetail-header-row">
              <View className="settlementDetail-header-cell">
                {T('结算单ID')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('结算币种')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('保证金')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('策略编号')}
              </View>
            </View>
            <View className="settlementDetail-row">
              <View className="settlementDetail-cell">{rawData?.userId}</View>
              <View className="settlementDetail-cell">{rawData?.asset}</View>
              <View className="settlementDetail-cell">{rawData?.marginBalance}</View>
              <View className="settlementDetail-cell">
                {rawData?.strategyCode}
              </View>
            </View>
          </View>
          <View className="settlementDetail-table-container settlementDetail-top20">
            <View className="settlementDetail-header-row">
              <View className="settlementDetail-header-cell">
                {T('已平仓收益')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('收益率')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('用户归属收益')}
              </View>
              <View className="settlementDetail-header-cell">
                {T('平台归属收益')}
              </View>
            </View>
            <View className="settlementDetail-row">
              <View className="settlementDetail-cell">
                {rawData?.totalIncome}
              </View>
              <View className="settlementDetail-cell">
                {formatPercent(rawData?.ratio)}
              </View>
              <View className="settlementDetail-cell">
                {rawData?.userIncome}
              </View>
              <View className="settlementDetail-cell">
                {rawData?.platformIncome}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
