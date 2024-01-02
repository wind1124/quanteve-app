import React, { useEffect, useState } from 'react'
import { View, Picker } from '@tarojs/components'

export default function PickerComponent(props) {
  const { options, mode = 'selector', value, onChange, children } = props
  const [selectorChecked, setSelectorChecked] = useState(0)
  const [selector, setSelector] = useState(options || [])

  useEffect(() => {
    if (options) {
      setSelector(options)
    }
  }, [options])

  useEffect(() => {
    if (typeof value === 'string' && selector.length > 0) {
      const index = selector.findIndex(item => item === value)
      if (index !== -1) {
        setSelectorChecked(index)
      }
    }
  }, [value, selector])

  const handleChange = e => {
    const val = mode === 'selector' ? selector[e.detail.value] : e.detail.value
    setSelectorChecked(val)
    onChange && onChange(val)
  }

  if (mode === 'selector' && !options) {
    return <View>loading...</View>
  }

  return (
    <Picker
      value={selectorChecked}
      mode={mode}
      range={selector}
      onChange={handleChange}
    >
      {children || null}
    </Picker>
  )
}
