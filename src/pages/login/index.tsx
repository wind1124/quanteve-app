import { View, Image, Input, Radio } from '@tarojs/components'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: false,
    password: false
  })
  const [checked, setChecked] = useState(false)
  const [forgetEmail, setForgetEmail] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [clientHeight, setClientHeight] = useState(
    process.env.TARO_ENV === 'h5' ? document.documentElement.clientHeight : 0
  )

  useDidShow(() => {
    process.env.TARO_ENV === 'h5' && setIsFocus(false)
  })

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('用户登录')
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

  useEffect(() => {
    if (process.env.TARO_ENV === 'h5') {
      window.addEventListener('resize', () => {
        setIsFocus(clientHeight > document.documentElement.clientHeight)
      })
    }

    return () => {
      if (process.env.TARO_ENV === 'h5') {
        window.removeEventListener('resize', () => {})
      }
    }
  }, [])

  useEffect(() => {
    Taro.getStorage({
      key: 'email',
      success: function (res) {
        setEmail(res.data)
        setForgetEmail(true)
      },
      fail: function () {
        setEmail('')
      }
    })
  }, [])

  function handleCreate() {
    Taro.navigateTo({
      url: '/pages/login/create/index'
    })
  }

  function handleForgetPass() {
    Taro.navigateTo({
      url: '/pages/login/forgetPass/index'
    })
  }

  function handleChange(e, type) {
    if (type === 'email') {
      setEmail(e.detail.value)

      if (forgetEmail) {
        Taro.setStorage({
          key: 'email',
          data: e.detail.value
        })
      }
    } else if (type === 'password') {
      setPassword(e.detail.value)
    }
  }

  async function handleLogin() {
    let emailError = false
    let passwordError = false

    if (!email) {
      emailError = true
    }

    if (!password) {
      passwordError = true
    }

    if (emailError || passwordError) {
      setError({
        email: emailError,
        password: passwordError
      })
      return
    }

    if (!checked) {
      Taro.showToast({
        title: T('请先同意用户协议和隐私声明'),
        icon: 'none'
      })
      return
    }

    if (!password.match(/^[a-zA-Z0-9]{6,12}$/)) {
      Taro.showToast({
        title: T('密码格式不正确'),
        icon: 'none'
      })
      return
    }
    Taro.showLoading({
      title: T('加载中'),
      mask: true
    })
    try {
      const data = await request.get('/h5/user/login', {
        loginName: email,
        loginPassword: password
      })
      Taro.setStorage({
        key: 'userInfo',
        data: JSON.stringify(data),
        success: function () {
          setTimeout(() => {
            Taro.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
          }, 300)

          Taro.hideLoading()
          Taro.switchTab({
            url: '/pages/data/index'
          })
        }
      })
    } finally {
      Taro.hideLoading()
    }
  }

  function handleUserProtocol() {
    Taro.navigateTo({
      url: '/pages/login/userAgreement/index'
    })
  }

  function handlePrivacyStatement() {
    Taro.navigateTo({
      url: '/pages/login/privacyStatement/index'
    })
  }

  return (
    <View className="login-wrap" style={wrapStyle}>
      <View className="login-logo">
        <Image src={logo} mode="aspectFill" className="login-logoPx" />
      </View>
      <View className="login-info">
        <View
          className={
            error.email && !email ? 'login-email login-error' : 'login-email'
          }
        >
          <Input
            value={email}
            onInput={e => handleChange(e, 'email')}
            type="text"
            maxlength={50}
            placeholder={T('请输入用户名或邮箱')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="login-emailPlaceholder"
            className="login-emailInput"
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
            <View className="login-emailError">{T('请输入用户名或邮箱')}</View>
          )}
        </View>
        <View
          className={
            error.password && !password
              ? 'login-password login-error'
              : 'login-password'
          }
        >
          <Input
            value={password}
            onInput={e => handleChange(e, 'password')}
            className="login-passwordInput"
            type="text"
            password
            maxlength={20}
            placeholder={T('请输入密码')}
            placeholderTextColor="#C9C5B7"
            placeholderClass="login-passwordPlaceholder"
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
            <View className="login-passwordError">{T('请输入密码')}</View>
          )}
        </View>

        <View className="login-footer">
          <View className="login-footer-radio">
            <View
              className="login-footer-radioClick"
              onClick={() => {
                setForgetEmail(!forgetEmail)

                if (!forgetEmail) {
                  Taro.setStorage({
                    key: 'email',
                    data: email
                  })
                }
              }}
            ></View>
            <Radio checked={forgetEmail} color="#f4dfad" />
            <View className="login-footer-radio-text">{T('记住账号')}</View>
          </View>
          <View className="login-forget" onClick={handleForgetPass}>
            {T('忘记密码')}
          </View>
        </View>

        <LinearGradient
          className="login-linearGradient"
          colors={['#D9C187', '#F5EEC4', '#D8C175']}
        >
          <View className="login-linearGradientText" onClick={handleLogin}>
            {T('登录')}
          </View>
        </LinearGradient>

        <View className="login-footer login-flex-end">
          <View className="login-zhuce login-end" onClick={handleCreate}>
            {T('没有账号')}? {T('立即注册')}
          </View>
        </View>
      </View>

      {process.env.TARO_ENV === 'h5' && !isFocus && (
        <View className="login-radioWrap">
          <View
            className="login-radioClick"
            onClick={() => {
              setChecked(!checked)
            }}
          ></View>
          <Radio checked={checked} color="#f4dfad" />
          <View className="login-xieyiWrap">
            {T('我已阅读并同意')}
            <View className="login-xieyi" onClick={handleUserProtocol}>
              《{T('用户协议')}》
            </View>
            {T('和')}
            <View className="login-yinsi" onClick={handlePrivacyStatement}>
              《{T('隐私声明')}》
            </View>
          </View>
        </View>
      )}

      {process.env.TARO_ENV === 'rn' && (
        <View
          className="login-radioWrap"
          style={{
            position: isFocus ? 'relative' : 'absolute'
          }}
        >
          <View
            className="login-radioClick"
            onClick={() => {
              setChecked(!checked)
            }}
          ></View>
          <Radio checked={checked} color="#f4dfad" />
          <View className="login-xieyiWrap">
            {T('我已阅读并同意')}
            <View className="login-xieyi" onClick={handleUserProtocol}>
              《{T('用户协议')}》
            </View>
            {T('和')}
            <View className="login-yinsi" onClick={handlePrivacyStatement}>
              《{T('隐私声明')}》
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
