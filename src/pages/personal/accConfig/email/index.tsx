import { useEffect, useState } from 'react'
import { View, Input, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
// import { formatMoney, formatPercent } from '@/utils'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import request from '@/utils/request'

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [oldEmail, setOldEmail] = useState('')
  const [email, setEmail] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [error, setError] = useState({
    email: false,
    password: true,
    smsCode: false
  })
  const [time, setTime] = useState(60)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('修改邮箱')
    })
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
      const { data } = await Taro.getStorage({
        key: 'queryUserInfo'
      })
      setOldEmail(JSON.parse(data).mailAddress)
    })()
  }, [])

  useDidShow(() => {
    if (process.env.TARO_ENV === 'rn') {
      const Keyboard = require('react-native').Keyboard
      Keyboard.addListener('keyboardDidShow', () => {
        setIsFocus(true)
      })

      Keyboard.addListener('keyboardDidHide', () => {
        setIsFocus(false)
      })
    }
  })

  useDidHide(() => {
    if (process.env.TARO_ENV === 'rn') {
      const Keyboard = require('react-native').Keyboard
      Keyboard.removeAllListeners('keyboardDidShow')
    }
  })

  const handleGetSmsCode = async () => {
    if (time !== 60) return
    if (!email) {
      setError({
        ...error,
        email: true
      })
      setIsFocus(true)
      return
    }
    try {
      await request.get('/h5/user/sendMailCode', {
        mailAddress: email,
        type: 'updateEmail'
      })
      await handleCountdown()
    } catch (err) {
      if (err === 1001) {
        await handleCountdown()
      }
    }
  }

  const handleCountdown = () => {
    if (time !== 60) return
    let timer = setInterval(() => {
      setTime(time => {
        if (time === 0) {
          clearInterval(timer)
          return 60
        }
        return time - 1
      })
    }, 1000)
  }

  function handleChange(e, type) {
    if (type === 'email') {
      setEmail(e.detail.value)
    } else if (type === 'smsCode') {
      setSmsCode(e.detail.value)
    }
  }

  async function handleSave() {
    try {
      // 判断mail是否合法
      if (email.indexOf('@') === -1) {
        setError({
          ...error,
          email: true
        })
        return
      }
      if (!email) {
        setError({
          ...error,
          email: true
        })
        return
      }
      if (!smsCode) {
        setError({
          ...error,
          smsCode: true
        })
        return
      }
      await request.post('/h5/user/update', {
        id: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data).id,
        newMailAddress: email,
        mailCode: smsCode
      })
      Taro.showToast({
        title: T('修改成功'),
        icon: 'success'
      })
      Taro.navigateBack()
    } catch (error) {}
  }

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfigEmail-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfigEmail-info">
          <View className="personalAccConfigEmail-oldEmail">
            {T('旧邮箱地址')}: {oldEmail}
          </View>
          <View
            className={
              error.email && !email
                ? 'personalAccConfigEmail-email personalAccConfigEmail-error personalAccConfigEmail-top30'
                : 'personalAccConfigEmail-email personalAccConfigEmail-top30'
            }
          >
            <Input
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              focus={isFocus}
              value={email}
              onInput={e => handleChange(e, 'email')}
              type="text"
              maxlength={50}
              placeholder={T('请输入新邮箱地址')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigEmail-emailPlaceholder"
              className="personalAccConfigEmail-emailInput"
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
            />
            {error.email && !email ? (
              <View className="personalAccConfigEmail-emailError">
                {T('请输入新邮箱地址')}
              </View>
            ) : null}
          </View>
          <View
            className={
              error.smsCode && !smsCode
                ? 'personalAccConfigEmail-smsCode personalAccConfigEmail-error'
                : 'personalAccConfigEmail-smsCode'
            }
          >
            <View className="personalAccConfigEmail-smsCodeRow">
              <Input
                value={smsCode}
                onInput={e => handleChange(e, 'smsCode')}
                className="personalAccConfigEmail-smsCodeInput"
                type="number"
                //password
                maxlength={6}
                placeholder={T('请输入邮箱验证码')}
                placeholderTextColor="#C9C5B7"
                placeholderClass="personalAccConfigEmail-smsCodePlaceholder"
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
              />
              <LinearGradient
                className="personalAccConfigEmail-linearGradientSmsCode"
                colors={['#D9C187', '#F5EEC4', '#D8C175']}
              >
                <View
                  className="personalAccConfigEmail-linearGradientSmsCodeText"
                  onClick={handleGetSmsCode}
                >
                  {time === 60 ? T('获取验证码') : `${time}s`}
                </View>
              </LinearGradient>
            </View>
            {error.smsCode && (
              <View className="personalAccConfigEmail-smsCodeError">
                {T('请输入邮箱验证码')}
              </View>
            )}
          </View>
          <View className="personalAccConfigEmail-btnWrap">
            <LinearGradient
              className="personalAccConfigEmail-linearGradient"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="personalAccConfigEmail-linearGradientText"
                onClick={handleSave}
              >
                {T('保存')}
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </>
  )
}
