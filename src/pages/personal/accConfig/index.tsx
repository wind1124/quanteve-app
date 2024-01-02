import { useEffect, useState } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
// import { formatMoney, formatPercent } from '@/utils'
import Taro, { useDidShow } from '@tarojs/taro'
import Popup from '@/components/popup'
import right from '@/assets/images/right.png'
import request from '@/utils/request'

const maskMiddleOfString = str => {
  if (!str || str == null || str == undefined) return ''
  return str.replace(/(\S{4})(\S+)(\S{4})/, '$1****$3')
}

export default () => {
  // '1:Binance;2:OKEx',
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [tradePlatform, setTradePlatform] = useState(false)
  const [tradePlatformVal, setTradePlatformVal] = useState('')
  const [tradePlatformSubmitVisible, setTradePlatformSubmitVisible] =
    useState(false)
  const [rawData, setRawData] = useState<any>({})

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('账户配置')
    })
  }, [])

  useDidShow(() => {
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
      Taro.showLoading({
        title: T('加载中')
      })
      try {
        const data = await request.get('/h5/user/queryUserInfo', {
          userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data)
            .id
        })
        setRawData(data)
        Taro.setStorage({
          key: 'queryUserInfo',
          data: JSON.stringify(data)
        })
        if (!!data.dealPlatform) {
          setTradePlatformVal(data.dealPlatform === 1 ? 'Binance' : 'OKEx')
        }
      } finally {
        Taro.hideLoading()
      }
    })()
  })

  async function handleOut() {
    const res = await Taro.showModal({
      title: T('提示'),
      content: T('确定退出登录') + '？'
    })
    if (res.confirm) {
      await Taro.removeStorage({ key: 'userInfo' })
      await Taro.removeStorage({ key: 'queryUserInfo' })
      // await Taro.removeStorage({ key: 'lang' })
      Taro.reLaunch({
        url: '/pages/login/index'
      })
    }
  }

  function handleUser() {
    Taro.navigateTo({
      url: '/pages/personal/accConfig/userName/index'
    })
  }

  function handleEmail() {
    Taro.navigateTo({
      url: '/pages/personal/accConfig/email/index'
    })
  }

  function handleEditPassWord() {
    Taro.navigateTo({
      url: '/pages/personal/accConfig/editPassword/index'
    })
  }

  function handleTradingPlatformData() {
    if (!tradePlatformVal) {
      return Taro.showToast({
        title: T('请先选择交易平台'),
        icon: 'none'
      })
    }
    Taro.navigateTo({
      url:
        '/pages/personal/accConfig/tradingPlatformData/index?tradePlatformVal=' +
        tradePlatformVal
    })
  }

  function handleBindPayAddress() {
    Taro.navigateTo({
      url: '/pages/personal/accConfig/bindPayAddress/index'
    })
  }

  function handleTradePlatform() {
    if (tradePlatformVal) {
      return Taro.showToast({
        title: T('交易平台已绑定'),
        icon: 'none'
      })
    }
    setTradePlatform(true)
  }

  function handleTradePlatformSubmit() {
    setTradePlatform(false)
    setTradePlatformSubmitVisible(true)
  }

  async function handleTradePlatformChecked(val) {
    if (val === 'OKEx') {
      return Taro.showToast({
        title: T('暂未开放'),
        icon: 'none'
      })
    }
    setTradePlatformVal(val)
  }

  function handleTradePlatformSubmitCancel() {
    if (!rawData.dealPlatform) {
      setTradePlatformVal('')
    }
    setTradePlatformSubmitVisible(false)
  }

  async function handleTradePlatformSubmitOk() {
    await request.post('/h5/user/resetUserConfig', {
      userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data).id,
      dealPlatform: tradePlatformVal === 'Binance' ? 1 : 2
    })
    setTradePlatformSubmitVisible(false)
    Taro.navigateTo({
      url:
        '/pages/personal/accConfig/tradingPlatformData/index?tradePlatformVal=' +
        tradePlatformVal
    })
  }

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfig-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfig-content">
          <View className="personalAccConfig-item" onClick={handleUser}>
            <View className="personalAccConfig-label">{T('用户名')}</View>
            <View className="personalAccConfig-valueFlex">
              <View className="personalAccConfig-value">
                {rawData?.userName}
              </View>
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
          <View className="personalAccConfig-item" onClick={handleEmail}>
            <View className="personalAccConfig-label">{T('邮箱')}</View>
            <View className="personalAccConfig-valueFlex">
              <View className="personalAccConfig-value">
                {rawData?.mailAddress}
              </View>
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
          <View className="personalAccConfig-item" onClick={handleEditPassWord}>
            <View className="personalAccConfig-label">{T('修改密码')}</View>
            <View className="personalAccConfig-valueFlex">
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
          <View
            className="personalAccConfig-item"
            onClick={handleTradePlatform}
          >
            <View className="personalAccConfig-label">{T('交易平台')}</View>
            <View className="personalAccConfig-valueFlex">
              <View className="personalAccConfig-value">
                {tradePlatformVal}
              </View>
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
          <View
            className="personalAccConfig-item"
            onClick={handleTradingPlatformData}
          >
            <View>
              <View className="personalAccConfig-label">
                API Key: {maskMiddleOfString(rawData?.dealApiKey)}
              </View>
              <View className="personalAccConfig-label">
                Secret Key: {maskMiddleOfString(rawData?.dealSecretKey)}
              </View>
            </View>
            <View className="personalAccConfig-valueFlex">
              <View className="personalAccConfig-value">{T('绑定修改')}</View>
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
          <View
            className="personalAccConfig-item"
            onClick={handleBindPayAddress}
          >
            <View className="personalAccConfig-label">{T('您的付款地址')}</View>
            <View className="personalAccConfig-valueFlex">
              <View className="personalAccConfig-value">{T('绑定修改')}</View>
              <Image src={right} className="personalAccConfig-iconRight" />
            </View>
          </View>
        </View>
        <View className="personalAccConfig-btnWrap">
          <LinearGradient
            className="personalAccConfig-linearGradientOut"
            colors={['#D9C187', '#F5EEC4', '#D8C175']}
          >
            <View
              className="personalAccConfig-linearGradientOutText"
              onClick={handleOut}
            >
              {T('退出登录')}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <Popup
        visible={tradePlatform}
        height={500}
        onClose={() => setTradePlatform(false)}
      >
        <LinearGradient
          className="personalAccConfig-linearGradient"
          colors={['#D9C187', '#F5EEC4', '#D8C175']}
        >
          <View className="personalAccConfig-linearGradientHeader">
            <View
              className="personalAccConfig-cannel"
              onClick={() => setTradePlatform(false)}
            >
              {T('取消')}
            </View>
            <View className="personalAccConfig-title">{T('选择交易平台')}</View>
            <View
              className="personalAccConfig-submit"
              onClick={handleTradePlatformSubmit}
            >
              {T('确定')}
            </View>
          </View>
          <View className="personalAccConfig-PopContent">
            <View
              className={`personalAccConfig-langText ${
                tradePlatformVal === 'OKEx' ? 'personalAccConfig-line' : ''
              }`}
              onClick={() => handleTradePlatformChecked('OKEx')}
            >
              OKEx
            </View>
            <View
              className={`personalAccConfig-langText ${
                tradePlatformVal === 'Binance' ? 'personalAccConfig-line' : ''
              }`}
              onClick={() => handleTradePlatformChecked('Binance')}
            >
              Binance
            </View>
          </View>
        </LinearGradient>
      </Popup>
      <Popup
        visible={tradePlatformSubmitVisible}
        height={400}
        // onClose={() => setTradePlatform(false)}
        mode="center"
      >
        <View className="personalAccConfig-tradePlatformSubmitVisibleWrap">
          <View className="personalAccConfig-tradePlatformSubmitVisibleContent">
            {T('交易平台选择后无法更改，请确定选择的交易平台')}。
          </View>
          <View className="personalAccConfig-tradePlatformSubmitVisibleBtnWrap">
            <LinearGradient
              className="personalAccConfig-linearGradienttradePlatformSubmitVisibleBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfig-tradePlatformSubmitVisibleBtn"
                onClick={handleTradePlatformSubmitCancel}
              >
                {T('取消')}
              </View>
            </LinearGradient>
            <LinearGradient
              className="personalAccConfig-linearGradienttradePlatformSubmitVisibleBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfig-tradePlatformSubmitVisibleBtn"
                onClick={handleTradePlatformSubmitOk}
              >
                {T('确定')}
              </View>
            </LinearGradient>
          </View>
        </View>
      </Popup>
    </>
  )
}
