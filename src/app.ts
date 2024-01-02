import Taro from '@tarojs/taro'
import { useEffect } from 'react'
import { useLanguageStore } from '@/stores/useLanguage'
import './app.scss'

const App = props => {
  const { changeLanguage } = useLanguageStore()
  const systemInfo = Taro.getSystemInfoSync()

  useEffect(() => {
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

  return props.children
}

export default App
