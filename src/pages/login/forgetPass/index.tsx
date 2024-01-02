import { View, Image, Input, ScrollView } from '@tarojs/components'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
import Taro, { useDidShow, useDidHide } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import useI18n from '@/hooks/useI18n'
import logo from '@/assets/images/logo.png'
import request from '@/utils/request'

export default function Login() {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [error, setError] = useState({
    user: false,
    email: false,
    password: false,
    confirmPassword: false,
    smsCode: false
  })
  const [time, setTime] = useState(60)
  const [scrollTop, setScrollTop] = useState(0)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('忘记密码')
    })
  }, [])

  useEffect(() => {
    ;(async () => {
      if (process.env.TARO_ENV === 'h5') {
        const res = await Taro.getSystemInfo()
        setWrapStyle({
          height: `${
            res.windowHeight < res.screenHeight
              ? res.screenHeight
              : res.windowHeight
          }px`
        })
      }
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
        type: 'resetPassword'
      })
      await handleCountdown()
    } catch (err) {
      if (err.code === 1001) {
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
    if (type === 'user') {
      setUser(e.detail.value)
    } else if (type === 'email') {
      setEmail(e.detail.value)
    } else if (type === 'password') {
      setPassword(e.detail.value)
    } else if (type === 'passwordConfirm') {
      setPasswordConfirm(e.detail.value)
    } else if (type === 'smsCode') {
      setSmsCode(e.detail.value)
    }
  }

  async function handleSubmit() {
    let userError = false
    let emailError = false
    let passwordError = false
    let passwordConfirmError = false
    let smsCodeError = false

    if (!user) {
      userError = true
    }
    if (!email) {
      emailError = true
    }
    if (!password) {
      passwordError = true
    }
    if (!passwordConfirm) {
      passwordConfirmError = true
    }
    if (!smsCode) {
      smsCodeError = true
    }
    if (
      userError ||
      emailError ||
      passwordError ||
      passwordConfirmError ||
      smsCodeError
    ) {
      setError({
        user: userError,
        email: emailError,
        password: passwordError,
        confirmPassword: passwordConfirmError,
        smsCode: smsCodeError
      })
      return
    }
    await request.post('/h5/user/resetPassword', {
      userName: user,
      mailAddress: email,
      loginPassword: password,
      passwordRepeat: passwordConfirm,
      mailCode: smsCode
    })
    Taro.showToast({
      title: T('修改成功'),
      icon: 'success',
      duration: 2000
    })
    Taro.navigateBack()
  }

  function handleFocus() {
    if (process.env.TARO_ENV === 'rn') {
      const Keyboard = require('react-native').Keyboard
      Keyboard.addListener('keyboardDidShow', () => {
        setWrapStyle({
          paddingBottom: Taro.pxTransform(300)
        })
        ;(async () => {
          const res = await Taro.getSystemInfo()
          setScrollTop(res.windowHeight)
        })()
      })

      Keyboard.addListener('keyboardDidHide', () => {
        setWrapStyle({})
      })
    }
  }

  function handleBlur() {
    if (process.env.TARO_ENV === 'rn') {
      const Keyboard = require('react-native').Keyboard
      Keyboard.removeAllListeners('keyboardDidShow')
      setWrapStyle({})
    }
  }

  return (
    <ScrollView
      scrollY
      enableBackToTop
      className="forgetPass-wrap"
      style={wrapStyle}
      scrollTop={scrollTop}
    >
      <View className="forgetPass-logo">
        <Image src={logo} mode="aspectFill" className="forgetPass-logoPx" />
      </View>
      <View className="forgetPass-info">
        <View
          className={
            error.user && !user
              ? 'forgetPass-email forgetPass-error'
              : 'forgetPass-email'
          }
        >
          <Input
            value={user}
            onInput={e => handleChange(e, 'user')}
            type="text"
            maxlength={50}
            placeholder={T('请输入用户名')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="forgetPass-emailPlaceholder"
            className="forgetPass-emailInput"
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
          {error.user && !user && (
            <View className="forgetPass-emailError">{T('请输入用户名')}</View>
          )}
        </View>
        <View
          className={
            error.email && !email
              ? 'forgetPass-password forgetPass-error'
              : 'forgetPass-password'
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
            placeholder={T('请输入绑定邮箱')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="forgetPass-emailPlaceholder"
            className="forgetPass-emailInput"
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
          {error.email && !email && (
            <View className="forgetPass-emailError">{T('请输入绑定邮箱')}</View>
          )}
        </View>
        <View
          className={
            error.password && !password
              ? 'forgetPass-password forgetPass-error'
              : 'forgetPass-password'
          }
        >
          <Input
            value={password}
            onInput={e => handleChange(e, 'password')}
            className="forgetPass-passwordInput"
            type="number"
            password
            maxlength={20}
            placeholder={T('请输入密码')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="forgetPass-passwordPlaceholder"
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
          {error.password && !password && (
            <View className="forgetPass-passwordError">{T('请输入密码')}</View>
          )}
        </View>
        <View
          className={
            error.confirmPassword && !passwordConfirm
              ? 'forgetPass-password forgetPass-error'
              : 'forgetPass-password'
          }
        >
          <Input
            value={passwordConfirm}
            onInput={e => handleChange(e, 'passwordConfirm')}
            className="forgetPass-passwordInput"
            type="number"
            password
            maxlength={20}
            placeholder={T('请再次确认密码')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="forgetPass-passwordPlaceholder"
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
          {error.confirmPassword && !passwordConfirm && (
            <View className="forgetPass-passwordError">
              {T('请再次确认密码')}
            </View>
          )}
        </View>
        <View
          className={
            error.smsCode && !smsCode
              ? 'forgetPass-smsCode forgetPass-error'
              : 'forgetPass-smsCode'
          }
        >
          <View className="forgetPass-smsCodeRow">
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={smsCode}
              onInput={e => handleChange(e, 'smsCode')}
              className="forgetPass-smsCodeInput"
              type="number"
              //password
              maxlength={6}
              placeholder={T('请输入邮箱验证码')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="forgetPass-smsCodePlaceholder"
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
              className="forgetPass-linearGradientSmsCode"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="forgetPass-linearGradientSmsCodeText"
                onClick={handleGetSmsCode}
              >
                {time === 60 ? T('获取验证码') : `${time}s`}
              </View>
            </LinearGradient>
          </View>
          {error.smsCode && !smsCode && (
            <View className="forgetPass-smsCodeError">
              {T('请输入邮箱验证码')}
            </View>
          )}
        </View>

        <LinearGradient
          className="forgetPass-linearGradient"
          colors={['#D9C187', '#F5EEC4', '#D8C175']}
        >
          <View
            className="forgetPass-linearGradientText"
            onClick={handleSubmit}
          >
            {T('提交')}
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  )
}
