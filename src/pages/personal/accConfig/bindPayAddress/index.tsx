import { useEffect, useState } from 'react'
import { View, Input, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
// import { formatMoney, formatPercent } from '@/utils'
import Taro from '@tarojs/taro'
import request from '@/utils/request'
import Popup from '@/components/popup'

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [error, setError] = useState({
    dealAddress: false
  })
  const [dealAddress, setDealAddress] = useState('')
  const [safetyCertificate, setSafetyCertificate] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('绑定付款地址')
    })
  }, [])

  useEffect(() => {
    // taro 获取页面高度
    ;(async () => {
      if (process.env.TARO_ENV === 'h5') {
        const res = await Taro.getSystemInfo()
        setWrapStyle({
          height: `${res.windowHeight - 10}px`
        })
      }
      const queryUserInfo = JSON.parse(
        (await Taro.getStorage({ key: 'queryUserInfo' })).data
      )
      setDealAddress(queryUserInfo.dealAddress)
    })()
  }, [])

  function handleChange(e, type) {
    if (type === 'dealAddress') {
      setDealAddress(e.detail.value)
    } else if (type === 'password') {
      setPassword(e.detail.value)
    }
  }

  async function handleSubmit() {
    let dealAddressError = false

    if (!dealAddress) {
      dealAddressError = true
    }

    if (dealAddressError) {
      setError({
        dealAddress: dealAddressError
      })
      return
    }

    setError({
      dealAddress: false
    })

    setSafetyCertificate(true)
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
        userId: JSON.parse(
          (
            await Taro.getStorage({ key: 'queryUserInfo' })
          ).data
        ).userId
      })
      await request.post('/h5/user/modifyUserDealAddress', {
        userId: JSON.parse(
          (
            await Taro.getStorage({ key: 'queryUserInfo' })
          ).data
        ).userId,
        dealAddress
      })
      setSafetyCertificate(false)
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

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfigBindPayAddress-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfigBindPayAddress-info">
          <View
            className={`${
              error.dealAddress
                ? 'personalAccConfigBindPayAddress-user personalAccConfigBindPayAddress-error'
                : 'personalAccConfigBindPayAddress-user'
            }`}
          >
            <Input
              type="text"
              maxlength={50}
              placeholder={T('请绑定付款地址')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigBindPayAddress-userPlaceholder"
              className="personalAccConfigBindPayAddress-userInput"
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
              value={dealAddress}
              onInput={e => handleChange(e, 'dealAddress')}
            />
            {error.dealAddress && (
              <View className="personalAccConfigBindPayAddress-userError">
                {T('请绑定付款地址')}
              </View>
            )}
          </View>
          <View className="personalAccConfigBindPayAddress-btnWrap">
            <LinearGradient
              className="personalAccConfigBindPayAddress-linearGradient"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="personalAccConfigBindPayAddress-linearGradientText"
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
        <View className="personalAccConfigBindPayAddress-safetyCertificateWrap">
          <View className="personalAccConfigBindPayAddress-safetyCertificateContent">
            <View className="personalAccConfigBindPayAddress-safetyCertificateContentHeader">
              {T('安全验证')}
            </View>
            <LinearGradient
              className="personalAccConfigBindPayAddress-safetyCertificateContentPassword"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <Input
                type="text"
                password
                maxlength={20}
                placeholder={T('请输入登录密码')}
                placeholderTextColor="#4d3813"
                placeholderClass="personalAccConfigBindPayAddress-passwordPlaceholder"
                className="personalAccConfigBindPayAddress-emailInput"
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
            <View className="personalAccConfigBindPayAddress-safetyCertificateContentRecord">
              {T('服务器将以独立的私钥保存敏感数据, 不用担心数据被泄漏。')}
            </View>
          </View>
          <View className="personalAccConfigBindPayAddress-safetyCertificateBtnWrap">
            <LinearGradient
              className="personalAccConfigBindPayAddress-linearGradientsafetyCertificateBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfigBindPayAddress-safetyCertificateBtn"
                onClick={handleSafetyCertificateSubmitCannel}
              >
                {T('关闭')}
              </View>
            </LinearGradient>
            <LinearGradient
              className="personalAccConfigBindPayAddress-linearGradientsafetyCertificateBtn"
              colors={['#FAF2E0', '#EDE9D1', '#EFE1B4']}
            >
              <View
                className="personalAccConfigBindPayAddress-safetyCertificateBtn"
                onClick={handleSafetyCertificateSubmitOk}
              >
                {T('安全验证')}
              </View>
            </LinearGradient>
          </View>
        </View>
      </Popup>
    </>
  )
}
