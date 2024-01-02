import Taro from '@tarojs/taro'
import zhTranslation from '@/utils/locales/zh.json'
import enTranslation from '@/utils/locales/en.json'

const showToast = title => {
  setTimeout(() => {
    Taro.getStorage({
      key: 'lang',
      success: res => {
        if (res.data === 'zh-CN' || res.data === 'zh_CN' || res.data == null) {
          Taro.showToast({
            title: zhTranslation[title],
            icon: 'none',
            duration: 2000
          })
        } else if (res.data === 'en') {
          Taro.showToast({
            title: enTranslation[title],
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: () => {
        Taro.showToast({
          title: title,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }, 300)
}

const useHandleRequest = () => {
  const getUrl = () => {
    if (process.env.TARO_ENV === 'rn') {
      //return 'http://www.quanteve.one'
      return 'http://149.129.37.30'
    }
    return ''
  }

  const handleRequest = (method, url, params, token) => {
    return Taro.request({
      url: getUrl() + url,
      data: params,
      method,
      header: {
        'content-type': 'application/json',
        'author-token': token
      }
    })
  }

  const handleResponse = (res, resolve, reject) => {
    if (res.statusCode == 200) {
      if (res.data.code === 200) {
        resolve(res.data.data)
      } else {
        if (res.data.code === 500 && res.data.message.indexOf('token') > -1) {
          Taro.redirectTo({ url: '/pages/login/index' })
          showToast('请先登录')
          return
        }
        showToast(res.data.message)
        reject(res.data)
      }
    } else {
      reject(res.errMsg)
    }
  }

  return { handleRequest, handleResponse }
}

const useTaroRequest = () => {
  const { handleRequest, handleResponse } = useHandleRequest()

  const TaroRequest = ['get', 'post', 'put', 'delete'].reduce(
    (acc, method) => {
      acc[method] = function (url, params = {}) {
        return this.request(method.toUpperCase(), url, params)
      }
      return acc
    },
    {
      request: function (method, url, params) {
        return new Promise((resolve, reject) => {
          Taro.getStorage({
            key: 'userInfo',
            success: async function (res) {
              const userInfo = res.data ? JSON.parse(res.data) : { token: '' }
              try {
                const _result = await handleRequest(
                  method,
                  url,
                  params,
                  userInfo.token
                )
                handleResponse(_result, resolve, reject)
              } catch (err) {
                reject(err)
              }
            },
            fail: async function (res) {
              if (res.errMsg === 'getStorage:fail data not found') {
                try {
                  const _result = await handleRequest(method, url, params, '')
                  handleResponse(_result, resolve, reject)
                } catch (err) {
                  if (err.errMsg === 'request:fail timeout') {
                    showToast('网络超时')
                  }
                  reject(err)
                }
                return
              }
              Taro.showLoading({ title: '服务器错误' })
            }
          })
        })
      }
    }
  )

  return TaroRequest
}

export default useTaroRequest()
