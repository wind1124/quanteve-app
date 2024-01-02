import { useEffect, useState } from 'react'
import { View, Input, ScrollView, Image } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
// import { formatMoney, formatPercent } from '@/utils'
import Taro from '@tarojs/taro'
import Popup from '@/components/popup'
import request from '@/utils/request'

import eye from '@/assets/images/eye.png'
import eyeClose from '@/assets/images/eyeClose.png'

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const params = Taro.getCurrentInstance().router.params
  const [error, setError] = useState({
    api: false,
    secretKey: false
  })
  const [safetyCertificate, setSafetyCertificate] = useState(false)
  const [toast, setToast] = useState(false)
  const [ip, setIp] = useState('')
  const [api, setApi] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [rawData, setRawData] = useState({})
  const [password, setPassword] = useState('')
  const [eyeStatus, setEyeStatus] = useState(true)
  const [errorText, setErrorText] = useState('')

  const message = {
    Binance: `${T(
      '请在您的交易所Binance账号下对该API密钥进行“限制只对受信任ip的访问”，以确保业务正常运行，IP地址为'
    )}：${ip}。`,
    OKEx: `${T(
      '请在您的交易所OKEx账号下对该API密钥进行“绑定信任的ip访问”，以确保业务正常运行，IP地址为'
    )}：${ip}。`
  }

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('修改API Key/密钥')
    })
  }, [])

  useEffect(() => {
    // taro 获取页面高度
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
      const queryUserInfo = JSON.parse(
        (await Taro.getStorage({ key: 'queryUserInfo' })).data
      )
      const data = await request.get('/h5/funds/queryStrategyIp', {
        userId: queryUserInfo.userId
      })
      setIp(data)
      setApi(queryUserInfo.dealApiKey)
      // setSecretKey(queryUserInfo.dealSecretKey)
      setRawData(queryUserInfo)
    })()
  }, [])

  function handleChange(e, type) {
    if (type === 'api') {
      setApi(e.detail.value)
    } else if (type === 'secretKey') {
      setSecretKey(e.detail.value)
    } else if (type === 'password') {
      setPassword(e.detail.value)
    }
  }

  async function handleSubmit() {
    let apiError = false
    let secretKeyError = false

    if (!api) {
      apiError = true
    }
    if (!secretKey) {
      secretKeyError = true
    }

    if (apiError || secretKeyError) {
      setError({
        api: apiError,
        secretKey: secretKeyError
      })
      return
    }
    if (!ip) {
      return Taro.showToast({
        title: T('请先获取IP'),
        icon: 'none'
      })
    }
    Taro.showLoading({
      title: T('加载中')
    })
    setError({
      api: false,
      secretKey: false
    })
    try {
      await request.post('/h5/user/checkUserKey', {
        userId: rawData.userId,
        dealApiKey: api,
        dealSecretKey: secretKey,
        serviceIp: ip,
        dealPlatform: params?.tradePlatformVal === 'Binance' ? 1 : 2
      })
      setSafetyCertificate(true)
    } catch (err) {
      setErrorText(T(err.message))
    } finally {
      Taro.hideLoading()
    }
  }

  function handleSafetyCertificateSubmitCannel() {
    setSafetyCertificate(false)
    setPassword('')
  }

  async function handleSafetyCertificateSubmitOk() {
    if (!password) {
      return Taro.showToast({
        title: T('请输入登录密码'),
        icon: 'none'
      })
    }
    Taro.showLoading({
      title: T('加载中')
    })
    try {
      await request.post('/h5/user/chkLoginPass', {
        loginPass: password,
        userId: rawData.userId
      })
      await request.post('/h5/user/resetUserConfig', {
        userId: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data)
          .id,
        dealApiKey: api,
        dealSecretKey: secretKey,
        serviceIp: ip

      })
      setSafetyCertificate(false)
      // setToast(true)
      setPassword('')
      setTimeout(() => {
        Taro.showToast({
          title: T('更新成功'),
          icon: 'success',
          duration: 2000
        })
      }, 300)
      Taro.navigateBack()
    } finally {
      Taro.hideLoading()
    }
  }

  function handleToastSubmitOk() {
    setToast(false)
    Taro.navigateBack()
  }

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfigTradingPlatformData-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfigTradingPlatformData-info">
          <View className="personalAccConfigTradingPlatformData-item">
            <View className="personalAccConfigTradingPlatformData-label">
              API Key
            </View>
            <View
              className={`${
                error.api
                  ? 'personalAccConfigTradingPlatformData-email personalAccConfigTradingPlatformData-error'
                  : 'personalAccConfigTradingPlatformData-email'
              } personalAccConfigTradingPlatformData-top30`}
            >
              <Input
                value={api}
                type="text"
                placeholder="API Key"
                placeholderTextColor="#C9C5B7"
                placeholderClass="personalAccConfigTradingPlatformData-emailPlaceholder"
                className="personalAccConfigTradingPlatformData-emailInput"
                style={{
                  color: '#f4dfad',
                  height:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(100)
                      : Taro.pxTransform(120),
                  padding: 0,
                  margin: 0,
                  fontSize:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(30)
                      : Taro.pxTransform(32)
                }}
                onInput={e => handleChange(e, 'api')}
              />
              {error.api && (
                <View className="personalAccConfigTradingPlatformData-emailError">
                  API Key
                </View>
              )}
            </View>
          </View>
          <View className="personalAccConfigTradingPlatformData-item personalAccConfigTradingPlatformData-top30">
            <View className="personalAccConfigTradingPlatformData-label">
              Secret Key
            </View>
            <View
              className={`${
                error.secretKey
                  ? 'personalAccConfigTradingPlatformData-email personalAccConfigTradingPlatformData-error'
                  : 'personalAccConfigTradingPlatformData-email'
              }`}
            >
              <Input
                type="text"
                password={eyeStatus}
                placeholder="Secret Key"
                placeholderTextColor="#C9C5B7"
                placeholderClass="personalAccConfigTradingPlatformData-emailPlaceholder"
                className="personalAccConfigTradingPlatformData-emailInput personalAccConfigTradingPlatformData-secretKey"
                style={{
                  color: '#f4dfad',
                  height:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(100)
                      : Taro.pxTransform(120),
                  padding: 0,
                  margin: 0,
                  fontSize:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(30)
                      : Taro.pxTransform(32)
                }}
                onInput={e => handleChange(e, 'secretKey')}
              />
              {error.secretKey && (
                <View className="personalAccConfigTradingPlatformData-emailError">
                  Secret Key
                </View>
              )}
              <Image
                onClick={() => setEyeStatus(!eyeStatus)}
                src={eyeStatus ? eyeClose : eye}
                className="personalAccConfigTradingPlatformData-eye"
              />
            </View>
          </View>
          {/* {params.tradePlatformVal === 'OKEx'? (
        <View className="item top30">
          <View className="label">Passphrase</View>
          <View
            className={`${error.email? 'email error' : 'email'}`}
          >
            <Input
              type="text"
              maxlength={50}
              placeholder="Passphrase"
              placeholderTextColor="#C9C5B7"
              placeholderClass="emailPlaceholder"
              className="emailInput"
              style={{
                color: '#f4dfad',
                height: Taro.pxTransform(120),
                padding: 0,
                margin: 0,
                fontSize: Taro.pxTransform(30)
              }}
            />
            {error.email && (
              <View className="emailError">Secret Key</View>
            )}
          </View>
        </View>
      ) : null} */}
          <View className="personalAccConfigTradingPlatformData-message">
            {!!errorText && (
              <View className="personalAccConfigTradingPlatformData-messageText">
                {errorText}
              </View>
            )}
            <View className="personalAccConfigTradingPlatformData-messageText">
              {message[params?.tradePlatformVal]}
            </View>
          </View>
          <View className="personalAccConfigTradingPlatformData-btnWrap">
            <LinearGradient
              className="personalAccConfigTradingPlatformData-linearGradient"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="personalAccConfigTradingPlatformData-linearGradientText"
                onClick={handleSubmit}
              >
                {T('保存')}
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <Popup
        visible={safetyCertificate}
        height={400}
        // onClose={() => setTradePlatform(false)}
        mode="center"
      >
        <View className="personalAccConfigTradingPlatformData-safetyCertificateWrap">
          <View className="personalAccConfigTradingPlatformData-safetyCertificateContent">
            <View className="personalAccConfigTradingPlatformData-safetyCertificateContentHeader">
              {T('安全验证')}
            </View>
            <LinearGradient
              className="personalAccConfigTradingPlatformData-safetyCertificateContentPassword"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <Input
                type="text"
                password
                maxlength={20}
                placeholder={T('请输入登录密码')}
                placeholderTextColor="#4d3813"
                placeholderClass="personalAccConfigTradingPlatformData-passwordPlaceholder"
                className="personalAccConfigTradingPlatformData-emailInput"
                style={{
                  color: '#4d3813',
                  height:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(100)
                      : Taro.pxTransform(120),
                  padding: 0,
                  margin: 0,
                  fontSize:
                    process.env.TARO_ENV === 'h5'
                      ? Taro.pxTransform(30)
                      : Taro.pxTransform(32),
                  backgroundColor: 'transparent'
                }}
                onInput={e => handleChange(e, 'password')}
              />
            </LinearGradient>
            <View className="personalAccConfigTradingPlatformData-safetyCertificateContentRecord">
              {T('服务器将以独立的私钥保存敏感数据, 不用担心数据被泄漏。')}
            </View>
          </View>
          <View className="personalAccConfigTradingPlatformData-safetyCertificateBtnWrap">
            <LinearGradient
              className="personalAccConfigTradingPlatformData-linearGradientsafetyCertificateBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfigTradingPlatformData-safetyCertificateBtn"
                onClick={handleSafetyCertificateSubmitCannel}
              >
                {T('关闭')}
              </View>
            </LinearGradient>
            <LinearGradient
              className="personalAccConfigTradingPlatformData-linearGradientsafetyCertificateBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfigTradingPlatformData-safetyCertificateBtn"
                onClick={handleSafetyCertificateSubmitOk}
              >
                {T('安全验证')}
              </View>
            </LinearGradient>
          </View>
        </View>
      </Popup>
      <Popup
        visible={toast}
        height={200}
        onClose={() => setToast(false)}
        mode="center"
      >
        <View className="personalAccConfigTradingPlatformData-toastWrap">
          <View className="personalAccConfigTradingPlatformData-toastTitle">
            {T('更新成功')}
          </View>
          <View className="personalAccConfigTradingPlatformData-toastBtnWrap">
            <LinearGradient
              className="personalAccConfigTradingPlatformData-toastBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfigTradingPlatformData-toastBtnText"
                onClick={handleToastSubmitOk}
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
