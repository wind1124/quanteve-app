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
  const [smsCode, setSmsCode] = useState('')
  const [error, setError] = useState({
    user: false,
    email: false,
    password: false,
    smsCode: false
  })
  const [time, setTime] = useState(60)
  const [scrollTop, setScrollTop] = useState(0)
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('用户注册')
    })
  }, [])

  useEffect(() => {
    // taro 获取页面高度
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

    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      Taro.showToast({
        title: T('邮箱格式不正确'),
        icon: 'none'
      })
      return
    }

    try {
      await request.get('/h5/user/sendMailCode', {
        mailAddress: email,
        type: 'register'
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
    } else if (type === 'smsCode') {
      setSmsCode(e.detail.value)
    }
  }

  async function handleCreate() {
    let userError = false
    let emailError = false
    let passwordError = false
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
    if (!smsCode) {
      smsCodeError = true
    }
    if (userError || emailError || passwordError || smsCodeError) {
      setError({
        user: userError,
        email: emailError,
        password: passwordError,
        smsCode: smsCodeError
      })
      return
    }

    if (!email.match(/^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
      Taro.showToast({
        title: T('邮箱格式不正确'),
        icon: 'none'
      })
      return
    }
    if (!password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)) {
      Taro.showToast({
        title: T('密码格式不正确'),
        icon: 'none'
      })
      return
    }
    await request.post('/h5/user/register', {
      userName: user,
      mailAddress: email,
      loginPassword: password,
      mailCode: smsCode
    })
    Taro.showToast({
      title: T('注册成功'),
      icon: 'success',
      duration: 2000
    })
    Taro.navigateBack()
  }

  function handleLogin() {
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
      className="loginCreate-wrap"
      style={wrapStyle}
      scrollTop={scrollTop}
    >
      <View className="loginCreate-logo">
        <Image src={logo} mode="aspectFill" className="loginCreate-logoPx" />
      </View>
      <View className="loginCreate-info">
        <View
          className={
            error.user && !user
              ? 'loginCreate-user loginCreate-error'
              : 'loginCreate-user'
          }
        >
          <Input
            value={user}
            onInput={e => handleChange(e, 'user')}
            type="text"
            maxlength={50}
            placeholder={T('请输入用户名')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="loginCreate-userPlaceholder"
            className="loginCreate-userInput"
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
            <View className="loginCreate-userError">{T('请输入用户名')}</View>
          )}
        </View>
        <View
          className={
            error.email && !email
              ? 'loginCreate-email loginCreate-error'
              : 'loginCreate-email'
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
            placeholderClass="loginCreate-emailPlaceholder"
            className="loginCreate-emailInput"
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
            <View className="loginCreate-emailError">
              {T('请输入绑定邮箱')}
            </View>
          )}
        </View>
        <View
          className={
            error.password && !password
              ? 'loginCreate-password loginCreate-error'
              : 'loginCreate-password'
          }
        >
          <Input
            value={password}
            onInput={e => handleChange(e, 'password')}
            className="loginCreate-passwordInput"
            type="text"
            password
            maxlength={20}
            placeholder={T('请输入密码')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="loginCreate-passwordPlaceholder"
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
            <View className="loginCreate-passwordError">{T('请输入密码')}</View>
          )}
        </View>
        <View
          className={
            error.smsCode && !smsCode
              ? 'loginCreate-smsCode loginCreate-error'
              : 'loginCreate-smsCode'
          }
        >
          <View className="loginCreate-smsCodeRow">
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={smsCode}
              onInput={e => handleChange(e, 'smsCode')}
              className="loginCreate-smsCodeInput"
              type="number"
              maxlength={6}
              placeholder={T('请输入邮箱验证码')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="loginCreate-smsCodePlaceholder"
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
              className="loginCreate-linearGradientSmsCode"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="loginCreate-linearGradientSmsCodeText"
                onClick={handleGetSmsCode}
              >
                {time === 60 ? T('获取验证码') : `${time}s`}
              </View>
            </LinearGradient>
          </View>
          {error.smsCode && !smsCode && (
            <View className="loginCreate-smsCodeError">
              {T('请输入邮箱验证码')}
            </View>
          )}
        </View>

        <LinearGradient
          className="loginCreate-linearGradient"
          colors={['#D9C187', '#F5EEC4', '#D8C175']}
        >
          <View
            className="loginCreate-linearGradientText"
            onClick={handleCreate}
          >
            {T('注册')}
          </View>
        </LinearGradient>

        <View className="loginCreate-footer loginCreate-flex-end">
          <View
            className="loginCreate-zhuce loginCreate-end"
            onClick={handleLogin}
          >
            {T('已有帐户')}? {T('立即登录')}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
