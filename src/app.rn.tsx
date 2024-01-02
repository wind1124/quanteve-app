import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { StatusBar } from 'react-native'
import { useLanguageStore } from '@/stores/useLanguage'
import './app.scss'

const App = props => {
  const { changeLanguage } = useLanguageStore()
  const systemInfo = Taro.getSystemInfoSync()

  useEffect(() => {
    SplashScreen && SplashScreen.hide()
    if (!systemInfo) return
    changeLanguage(systemInfo.language)
    Taro.getStorage({
      key: 'lang',
      success: res => {
        changeLanguage(res.data)
      },
      fail: () => {
        changeLanguage(systemInfo.language)
        Taro.setStorage({
          key: 'lang',
          data: systemInfo.language
        })
      }
    })
  }, [])

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle="dark-content"
      />
      {props.children}
    </>
  )
}

export default App
