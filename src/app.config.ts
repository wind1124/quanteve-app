const tabs = [
  {
    iconPath: './assets/images/data.png',
    selectedIconPath: './assets/images/data.png',
    pagePath: 'pages/data/index',
    text: '数据中心'
  },
  {
    iconPath: './assets/images/settlement.png',
    selectedIconPath: './assets/images/settlement.png',
    pagePath: 'pages/settlement/index',
    text: '结算中心'
  },
  {
    iconPath: './assets/images/personal.png',
    selectedIconPath: './assets/images/personal.png',
    pagePath: 'pages/personal/index',
    text: '个人中心'
  }
]

const pages = [
  'pages/data/index',
  'pages/settlement/index',
  'pages/settlement/detail/index',
  'pages/personal/index',
  'pages/personal/accConfig/index',
  'pages/personal/privacyStatement/index',
  'pages/personal/userAgreement/index',
  'pages/personal/aboutUs/index',

  'pages/login/create/index',
  'pages/login/forgetPass/index',
  'pages/login/privacyStatement/index',
  'pages/login/userAgreement/index',
  'pages/login/index',

  'pages/personal/accConfig/bindPayAddress/index',
  'pages/personal/accConfig/editPassword/index',
  'pages/personal/accConfig/email/index',
  'pages/personal/accConfig/tradingPlatformData/index',
  'pages/personal/accConfig/userName/index'
]
const subpackages = []

export default {
  // entryPagePath: 'pages/index/index',
  pages: pages,
  subpackages,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#D9C187',
    selectedColor: '#F5EEC4',
    borderStyle: '#3C485E',
    backgroundColor: '#3C485E',
    list: tabs
  },
  rn: {
    useNativeStack: true // 使用 @react-navigation/native-stack
  }
}
