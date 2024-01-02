'use strict'

var React = require('react')
var PropTypes = require('prop-types')
var createReactClass = require('create-react-class')
var Canvas = require('./Canvas.js')
var qr = require('qr.js')
var { View } = require('react-native')

var QRCode = createReactClass({
  PropTypes: {
    value: PropTypes.string,
    size: PropTypes.number,
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func
  },

  getDefaultProps: function () {
    return {
      value: 'https://github.com/cssivision',
      fgColor: 'white',
      bgColor: 'black',
      size: 128,
      onLoad: () => {},
      onLoadEnd: () => {}
    }
  },

  utf16to8: function (str) {
    var out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i)
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i)
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f))
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f))
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f))
      }
    }
    return out
  },

  render: function () {
    var size = this.props.size
    var value = this.utf16to8(this.props.value)
    return (
      <Canvas
        context={{
          size: size,
          value: this.props.value,
          bgColor: this.props.bgColor,
          fgColor: this.props.fgColor,
          cells: qr(value).modules
        }}
        onLoad={this.props.onLoad}
        onLoadEnd={this.props.onLoadEnd}
        style={{ height: size, width: size }}
      />
    )
  }
})

module.exports = QRCode
