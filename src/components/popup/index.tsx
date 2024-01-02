import { View } from '@tarojs/components'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'

export default function Popup(props) {
  const [mode, setMode] = useState('bottom')
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
    <View>
      <View
        className="overlay"
        style={{
          zIndex: props.visible ? 2001 : -1,
          transitionDuration: '.3s'
        }}
        onClick={() => {
          props.onClose && props.onClose()
        }}
      ></View>
      <View
        className={`popup ${posPopup[mode]}`}
        style={{
          zIndex: props.visible ? 2002 : -1,
          height: Taro.pxTransform(height),
          transitionDuration: '.3s'
        }}
      >
        {props.children}
      </View>
    </View>
  )
}
