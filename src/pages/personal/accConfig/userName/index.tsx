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
    userName: false
  })
  const [userName, setUserName] = useState('')

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('修改用户名')
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
      setUserName(JSON.parse(data).userName)
    })()
  }, [])

  async function handleSave() {
    if (!userName) {
      setError({
        ...error,
        userName: true
      })
      return Taro.showToast({
        title: T('请修改用户名'),
        icon: 'none'
      })
    }
    Taro.showLoading({
      title: T('加载中')
    })
    try {
      await request.post('/h5/user/update', {
        id: JSON.parse((await Taro.getStorage({ key: 'userInfo' })).data).id,
        newUserName: userName
      })
      setTimeout(() => {
        Taro.showToast({
          title: T('修改成功'),
          icon: 'success'
        })
      }, 300)
      Taro.navigateBack()
    } catch (error) {
    } finally {
      Taro.hideLoading()
    }
  }

  return (
    <>
      <ScrollView
        scrollY
        enableBackToTop
        className="personalAccConfigUserName-wrap"
        style={wrapStyle}
      >
        <View className="personalAccConfigUserName-info">
          <View
            className={`${
              error.userName
                ? 'personalAccConfigUserName-user personalAccConfigUserName-error'
                : 'personalAccConfigUserName-user'
            }`}
          >
            <Input
              value={userName}
              type="text"
              maxlength={50}
              placeholder={T('请修改用户名')}
              placeholderTextColor="#C9C5B7"
              placeholderClass="personalAccConfigUserName-userPlaceholder"
              className="personalAccConfigUserName-userInput"
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
                  userName: val.length ? false : true
                })
                setUserName(val)
              }}
            />
            {error.userName && (
              <View className="personalAccConfigUserName-userError">
                {T('请修改用户名')}
              </View>
            )}
          </View>
          <View className="personalAccConfigUserName-btnWrap">
            <LinearGradient
              className="personalAccConfigUserName-linearGradient"
              colors={['#D9C187', '#F5EEC4', '#D8C175']}
            >
              <View
                className="personalAccConfigUserName-linearGradientText"
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
