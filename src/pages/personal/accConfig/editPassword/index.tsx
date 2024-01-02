import { useEffect, useState } from 'react'
import { View, Input, ScrollView } from '@tarojs/components'
import useI18n from '@/hooks/useI18n'
import './index.scss'
import LinearGradient from 'linear-gradient-taro'
// import { formatMoney, formatPercent } from '@/utils'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const [error, setError] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false
  })
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('修改密码')
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
      setUser(JSON.parse(data).userName)
      setEmail(JSON.parse(data).mailAddress)
    })()
  }, [])

  async function handleSave() {
    try {
      let passwordError = false
      let newPasswordError = false
      let confirmPasswordError = false

      if (!password || password.length < 6) {
        passwordError = true
      }

      if (!newPassword || newPassword.length < 6) {
        newPasswordError = true
      }

      if (!confirmPassword || confirmPassword.length < 6) {
        confirmPasswordError = true
      }

      if (passwordError || newPasswordError || confirmPasswordError) {
        setError({
          ...error,
          password: passwordError,
          newPassword: newPasswordError,
          confirmPassword: confirmPasswordError
        })
        return
      }

      if (!newPassword.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/)) {
        Taro.showToast({
          title: T('新密码格式不正确'),
          icon: 'none'
        })
        return
      }

      if(newPassword !=confirmPassword){
        Taro.showToast({
          title: T('两次密码输入不一致,请确认!'),
          icon: 'none'
        })
        return
      }

      await request.post('/h5/user/modifyPassword', {
        id: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data).id,
        userName: user,
        mailAddress: email,
        oldPassword: password,
        newPassword: newPassword,
        passwordRepeat: confirmPassword
      })
      setTimeout(() => {
        Taro.showToast({
          title: T('修改成功'),
          icon: 'success'
        })
      }, 300)
      Taro.navigateBack()
    } catch (error) {}
  }

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfigEditPassword-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfigEditPassword-info">
          <View className="personalAccConfigEditPassword-oldEmail">
            {T('用户名')}: {user}
          </View>
          <View className="personalAccConfigEditPassword-top20 personalAccConfigEditPassword-oldEmail">
            {T('绑定邮箱')}: {email}
          </View>
          <View
            className={
              error.password
                ? 'personalAccConfigEditPassword-password personalAccConfigEditPassword-error personalAccConfigEditPassword-top20'
                : 'personalAccConfigEditPassword-password personalAccConfigEditPassword-top20'
            }
          >
            <Input
              className="personalAccConfigEditPassword-passwordInput"
              type="text"
              password
              maxlength={20}
              placeholder={T('请输入旧密码')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigEditPassword-passwordPlaceholder"
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
              onInput={e => {
                const val = e.detail.value
                setError({
                  ...error,
                  password: val.length ? false : true
                })
                setPassword(val)
              }}
            />
            {error.password && (
              <View className="personalAccConfigEditPassword-passwordError">
                {T('请输入旧密码')}
              </View>
            )}
          </View>
          <View
            className={
              error.newPassword
                ? 'personalAccConfigEditPassword-password personalAccConfigEditPassword-error'
                : 'personalAccConfigEditPassword-password'
            }
          >
            <Input
              className="personalAccConfigEditPassword-passwordInput"
              type="text"
              password
              maxlength={20}
              placeholder={T('请输入新密码')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigEditPassword-passwordPlaceholder"
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
              onInput={e => {
                const val = e.detail.value
                setError({
                  ...error,
                  newPassword: val.length ? false : true
                })
                setNewPassword(val)
              }}
            />
            {error.newPassword && (
              <View className="personalAccConfigEditPassword-passwordError">
                {T('请输入新密码')}
              </View>
            )}
          </View>
          <View
            className={
              error.confirmPassword
                ? 'personalAccConfigEditPassword-password personalAccConfigEditPassword-error'
                : 'personalAccConfigEditPassword-password'
            }
          >
            <Input
              className="personalAccConfigEditPassword-passwordInput"
              type="text"
              password
              maxlength={20}
              placeholder={T('请再次确认密码')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigEditPassword-passwordPlaceholder"
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
              onInput={e => {
                const val = e.detail.value
                setError({
                  ...error,
                  confirmPassword: val.length ? false : true
                })
                setConfirmPassword(val)
              }}
            />
            {error.confirmPassword && (
              <View className="personalAccConfigEditPassword-passwordError">
                {T('请再次确认密码')}
              </View>
            )}
          </View>
          <View className="personalAccConfigEditPassword-btnWrap">
            <View className="personalAccConfigEditPassword-top20 personalAccConfigEditPassword-oldEmail">
              {T('密码格式为6~12位字母+数字组合')}
            </View>
            <LinearGradient
              className="personalAccConfigEditPassword-linearGradient"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="personalAccConfigEditPassword-linearGradientText"
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
