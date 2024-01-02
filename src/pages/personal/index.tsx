import { useState, useEffect } from 'react'
import { View, Button, Image } from '@tarojs/components'
import './index.scss'
import useI18n from '@/hooks/useI18n'
import { useLanguageStore } from '@/stores/useLanguage'
import Taro, { useDidShow } from '@tarojs/taro'
import Popup from '@/components/popup'
// import Picker from "@/components/picker";
import LinearGradient from 'linear-gradient-taro'

import MyBg from '@/assets/images/my-bg.png'
import langImg from '@/assets/images/lang.png'
import userSetting from '@/assets/images/user_setting.png'
import yonghuxieyi from '@/assets/images/yonghuxieyi.png'
import yinsishengming from '@/assets/images/yinsishengming.png'
import guanyuwomen from '@/assets/images/guanyuwomen.png'

import request from '@/utils/request'

export default () => {
  const T = useI18n()
  const [wrapStyle, setWrapStyle] = useState({})
  const { toggleLanguage, lang } = useLanguageStore()
  const [langVal, setLangVal] = useState('简体中文')
  const [langVisible, setLangVisible] = useState(false)
  const [rawData, setRawData] = useState<any>({})

  useEffect(() => {
    if (lang === 'zh-CN' || lang === 'zh_CN') {
      setLangVal('简体中文')
    } else if (lang === 'en') {
      setLangVal('English')
    }
  }, [lang])

  async function handleLang(val) {
    toggleLanguage(
      val === '简体中文' ? 'zh_CN' : val === 'English' ? 'en' : 'zh_CN'
    )

    Taro.setStorage({
      key: 'lang',
      data: val === '简体中文' ? 'zh_CN' : val === 'English' ? 'en' : 'zh_CN'
    })

    Promise.all([
      await Taro.setTabBarItem({
        index: 0,
        text: T('数据中心')
      }),
      await Taro.setTabBarItem({
        index: 1,
        text: T('结算中心')
      }),
      await Taro.setTabBarItem({
        index: 2,
        text: T('个人中心')
      })
    ])
  }

  useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: T('个人中心')
    })
    ;(async () => {
      Promise.all([
        await Taro.setTabBarItem({
          index: 0,
          text: T('数据中心')
        }),
        await Taro.setTabBarItem({
          index: 1,
          text: T('结算中心')
        }),
        await Taro.setTabBarItem({
          index: 2,
          text: T('个人中心')
        })
      ])

      if (process.env.TARO_ENV === 'h5') {
        const res = await Taro.getSystemInfo()
        setWrapStyle({
          height: `${
            (res.windowHeight < res.screenHeight
              ? res.screenHeight
              : res.windowHeight) - 60
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
      } finally {
        Taro.hideLoading()
      }
    })()
  })

  function handleAccConfig() {
    Taro.navigateTo({
      url: '/pages/personal/accConfig/index'
    })
  }

  function handleLangVisible() {
    setLangVisible(true)
  }

  function handleLangChange(val) {
    setLangVal(val)
  }

  function handleLangSubmit() {
    handleLang(langVal)
    setLangVisible(false)
  }

  function handleUserAgreement() {
    Taro.navigateTo({
      url: '/pages/personal/userAgreement/index'
    })
  }

  function handlePrivacyStatement() {
    Taro.navigateTo({
      url: '/pages/personal/privacyStatement/index'
    })
  }

  function handleAboutUs() {
    Taro.navigateTo({
      url: '/pages/personal/aboutUs/index'
    })
  }

  return (
    <>
      <View className="personal-wrap" style={wrapStyle}>
        <View className="personal-myInfo">
          <Image src={MyBg} mode={'widthFix'} className="personal-myInfoImg" />
          <View className="personal-myInfoContent">
            {/* <View className="myInfoContentAvatar"></View> */}
            <View className="personal-myInfoContentName">
              {rawData?.userName}
            </View>
            <View className="personal-myInfoContentDesc">
              {rawData?.mailAddress}
            </View>
          </View>
        </View>

        <View className="personal-functionKeys">
          <Button
            className="personal-functionKeysItem"
            onClick={handleAccConfig}
          >
            <View className="personal-left">
              <Image
                src={userSetting}
                className="personal-functionKeysItemIcon"
              />
              <View className="personal-functionKeysItemName">
                {T('账户设置')}
              </View>
            </View>
          </Button>

          <Button
            className="personal-functionKeysItem"
            onClick={handleLangVisible}
          >
            <View className="personal-left">
              <Image src={langImg} className="personal-functionKeysItemIcon" />
              <View className="personal-functionKeysItemName">
                {T('语言设置')}
              </View>
            </View>
          </Button>
          <Button
            className="personal-functionKeysItem"
            onClick={handleUserAgreement}
          >
            <View className="personal-left">
              <Image
                src={yonghuxieyi}
                className="personal-functionKeysItemIcon"
              />
              <View className="personal-functionKeysItemName">
                {T('用户协议')}
              </View>
            </View>
          </Button>
          <Button
            className="personal-functionKeysItem"
            onClick={handlePrivacyStatement}
          >
            <View className="personal-left">
              <Image
                src={yinsishengming}
                className="personal-functionKeysItemIcon"
              />
              <View className="personal-functionKeysItemName">
                {T('隐私声明')}
              </View>
            </View>
          </Button>
          <Button
            className="personal-functionKeysItem"
            onClick={handleAboutUs}
          >
            <View className="personal-left">
              <Image
                src={guanyuwomen}
                className="personal-functionKeysItemIcon"
              />
              <View className="personal-functionKeysItemName">
                {T('关于我们')}
              </View>
            </View>
          </Button>
        </View>
      </View>
      <Popup
        visible={langVisible}
        height={500}
        onClose={() => setLangVisible(false)}
      >
        <LinearGradient
          className="personal-linearGradient"
          colors={['#D9C187', '#F5EEC4', '#D8C175']}
        >
          <View className="personal-linearGradientHeader">
            <View
              className="personal-cannel"
              onClick={() => setLangVisible(false)}
            >
              {T('取消')}
            </View>
            <View className="personal-title">{T('选择语言')}</View>
            <View className="personal-submit" onClick={handleLangSubmit}>
              {T('确定')}
            </View>
          </View>
          <View className="personal-personalContent">
            <View
              className={`personal-langText ${
                langVal === '简体中文' ? 'personal-line' : ''
              }`}
              onClick={() => handleLangChange('简体中文')}
            >
              简体中文
            </View>
            <View
              className={`personal-langText ${
                langVal === 'English' ? 'personal-line' : ''
              }`}
              onClick={() => handleLangChange('English')}
            >
              English
            </View>
          </View>
        </LinearGradient>
      </Popup>
    </>
  )
}
