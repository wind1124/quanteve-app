import { View } from '@tarojs/components'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { Dimensions } from 'react-native'

export default function Popup(props) {
  const [mode, setMode] = useState('bottom')
  const E_HEIGHT = Dimensions.get('screen').height
  const height = props?.height || 700
  const posPopup = {
    top: 'popupTop',
    bottom: 'popupBottom',
    left: 'popupLeft',
    right: 'popupRight',
    center: 'popupCenter'
  }

  useEffect(() => {
    if (props.mode) {
      setMode(props.mode)
    }
  }, [props.mode])

  if (!props.visible) return null
  return (
    <>
      <View
        className="overlay"
        style={{
          zIndex: props.visible ? 2001 : -1
        }}
        onClick={() => {
          props.onClose && props.onClose()
        }}
      ></View>
      <View
        className={`popup ${posPopup[mode]} popFFFCEE`}
        style={{
          zIndex: props.visible ? 2002 : -1,
          height: Taro.pxTransform(height),
          top:
            mode === 'center'
              ? Taro.pxTransform((E_HEIGHT - height / 2) / 2)
              : null
        }}
      >
        {props.children}
      </View>
    </>
  )
}
