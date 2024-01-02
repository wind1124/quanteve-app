import { ScrollView, View } from '@tarojs/components'
import { useLanguageStore } from '@/stores/useLanguage'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import useI18n from '@/hooks/useI18n'

export default function AboutUs() {
  const T = useI18n()
  const [langVal, setLangVal] = useState('简体中文')
  const { lang } = useLanguageStore()

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('关于我们')
    })
  }, [])

  useEffect(() => {
    if (lang === 'zh-CN' || lang === 'zh_CN') {
      setLangVal('简体中文')
    } else if (lang === 'en') {
      setLangVal('English')
    }
  }, [lang])

  return (
    <ScrollView scrollY enableBackToTop className="aboutUs-wrap">
      {langVal === '简体中文' ? (
        <View className="aboutUs-wrap-title" style={{ whiteSpace: 'pre-line' }}>

          关于我们{"\n"}
          Quanteve量化是一支拥有5~10年及以上金融交易实战经验的专业团队，充分运用人工智能和Ai算法，帮助客户安全稳定的实现数字资产保值、增值。 采用定量、定时化的策略进行投资交易及风险控制。智能量化致力于成为专业的数字资产技术服务中心，为客户带来持续稳定的收益。

          {"\n"}Quanteve平台优势：
          {"\n"}1、安全的风控体系：全生态三重风控系统，建立安全投资机制健应对百亿资金及数十个品种风险控制，采用“人工+机器人”监控方式，利用智能交易系统保 障量化策略稳定高效运行的同时，采用轮岗制对系统进行不间断管理， 保证量化策略平稳运行。
          {"\n"}2、多样化策略组合：自研全自动投资策略高度智能策略体系，根据趋势变化匹配最契合的交易策略，针对用户不同的交易仓位分配最适合的交易币种，通过现货、合约及套利交易等实现稳定获利。
          {"\n"}3、AI智能适应：运用超算中心运算决策系统全面掌握交易效率及风险因子动态。回测系统会不断从已有市场数据中 挖掘重复规律并加以利用，不断提 升交易的胜率和盈利比率，使收益 逐年稳步增长。

          {"\n"}1、团队成员：核心团队成员主要毕业于北京大学、吉林大学、卡内基梅隆大学等国内外知名学府，并曾在国内外著名金融机构和量化科技企业任职高管经验，对金融资产配置、风控及安全算法有深入研究。
          {"\n"}2、丰富的投资经验：在股票、期货量化交易、区块链、传统金融证券领域有多年操盘经验，技术团队人员架构稳定，可长期为客户提供安全稳定的服务。
          {"\n"}
        </View>
      ) : (
        <View className="aboutUs-wrap-title">
          About Us{"\n"}
            Quanteve Quant is a professional team with 5 to 10 years of practical experience in financial trading. Leveraging artificial intelligence and AI algorithms, we are committed to helping clients securely and steadily achieve the preservation and appreciation of digital assets. We employ quantitative and timely strategies for investment trading and risk control. Intelligent quantification aims to be a professional center for digital asset technology services, providing clients with sustained and stable returns.

          {"\n"}Quanteve Quant Advantage:

          {"\n"}1. Secure Risk Control System: We have established a comprehensive three-tier risk control system to address risks associated with billions in funds and dozens of varieties. We use a "human + robot" monitoring approach, utilizing intelligent trading systems to ensure the stable and efficient operation of quantitative strategies. Simultaneously, we employ a rotation system for uninterrupted management to guarantee the smooth operation of quantitative strategies.

          {"\n"}2. Diverse Strategy Portfolio: Our independently developed fully automatic investment strategy system is highly intelligent. It matches the most suitable trading strategies based on trend changes. Tailoring to users' different trading positions, we allocate the most suitable trading currencies, achieving stable profits through spot, contract, and arbitrage trading.

          {"\n"}3. AI Intelligent Adaptation: Utilizing a supercomputing center decision-making system, we comprehensively grasp the dynamic efficiency of transactions and risk factors. Our backtesting system continually extracts and utilizes repetitive patterns from existing market data, steadily increasing the success rate and profitability of trades, resulting in annual growth in returns.

          {"\n"}1. Team Members: Our core team members graduated from renowned institutions such as Peking University, Jilin University, Carnegie Mellon University, etc. They have held executive positions in prominent financial institutions and quantitative technology companies, conducting in-depth research on financial asset allocation, risk control, and secure algorithms.

          {"\n"}2. Rich Investment Experience: With years of experience in stock and futures quantitative trading, blockchain, and traditional financial securities, our technical team structure is stable, enabling us to provide clients with secure and stable services for the long term.
          {"\n"}
        </View>
      )}
    </ScrollView>
  )
}
