"use strict";

var React = require("react");
var PropTypes = require("prop-types");
var createReactClass = require("create-react-class");

var { View, Platform } = require("react-native");

var { WebView } = require("react-native-webview");

var Canvas = createReactClass({
  propTypes: {
    style: PropTypes.object,
    context: PropTypes.object,
    render: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
    onLoadEnd: PropTypes.func,
  },

  render() {
    var contextString = JSON.stringify(this.props.context);
    var renderString = `function renderCanvas(canvas) {
        var ctx = canvas.getContext('2d')
        var size = this.size
        var fgColor = this.fgColor
        var bgColor = this.bgColor
        canvas.width = size
        canvas.height = size
        canvas.style.left = (window.innerWidth - size) / 2 + 'px'
        if (window.innerHeight > size)
          canvas.style.top = (window.innerHeight - size) / 2 + 'px'
        ctx.fillRect(0, 0, size, size)
        var cells = this.cells
        var cellWidth = this.size / cells.length
        var cellHeight = this.size / cells.length
        var nRoundedWidth = Math.round(cellWidth)
        var nRoundedHeight = Math.round(cellHeight)
        cells.forEach(function (row, rowIndex) {
          row.forEach(function (column, columnIndex) {
            var nLeft = columnIndex * cellWidth
            var nTop = rowIndex * cellHeight
            ctx.fillStyle = ctx.strokeStyle = column ? bgColor : fgColor
            ctx.lineWidth = 1
            ctx.fillRect(nLeft, nTop, cellWidth, cellHeight)
            ctx.strokeRect(
              Math.floor(nLeft) + 0.5,
              Math.floor(nTop) + 0.5,
              nRoundedWidth,
              nRoundedHeight
            )
            ctx.strokeRect(
              Math.ceil(nLeft) - 0.5,
              Math.ceil(nTop) - 0.5,
              nRoundedWidth,
              nRoundedHeight
            )
          })
        })
      }
      `;
    return (
      <View
        style={{
          // this.props.style
          width: this.props.style.width * 0.8,
          height: this.props.style.height * 0.8,
        }}
      >
        <WebView
          automaticallyAdjustContentInsets={false}
          scalesPageToFit={Platform.OS === "android"}
          contentInset={{ top: 0, right: 0, bottom: 0, left: 0 }}
          source={{
            html:
              "<style>*{margin:0;padding:0;}canvas{transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" +
              renderString +
              ").call(" +
              contextString +
              ", canvas);</script>",
          }}
          opaque={false}
          underlayColor={"transparent"}
          style={{
            width: this.props.style.width * 4,
            height: this.props.style.height * 4,
          }}
          javaScriptEnabled={true}
          scrollEnabled={false}
          onLoad={this.props.onLoad}
          onLoadEnd={this.props.onLoadEnd}
          originWhitelist={["*"]}
        />
      </View>
    );
  },
});

module.exports = Canvas;
