import { ScrollView, View } from '@tarojs/components'
import { useLanguageStore } from '@/stores/useLanguage'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import useI18n from '@/hooks/useI18n'

export default function userAgreement() {
  const T = useI18n()
  const [langVal, setLangVal] = useState('简体中文')
  const { lang } = useLanguageStore()

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('用户协议')
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
    <ScrollView scrollY enableBackToTop className="userAgreement-wrap">
      {langVal === '简体中文' ? (
          <View className="userAgreement-wrap-title" style={{ whiteSpace: 'pre-line' }}>
            用户注册协议{"\n"}
            欢迎您使用“QUANTEVE平台”（以下简称“平台”）您在使用我们的产品与/或服务之前，需要在平台进行注册操作。为保证注册用户更好地使用平台的服务，维护注册用户的合法权益，特制定具有法律约束效力的《用户注册协议》（“本注册协议”），以界定双方权利义务，平台将严格依据本协议的规定为注册用户提供服务。在此特别提醒您认真阅读、充分理解本协议各条款，并请审慎阅读再选择是否接受本协议，您接受本协议所有条款（包括但不限于点击、勾选、手写签名等方式），即意味着您对本用户注册协议条款的含义及相应的法律后果已充分理解并完全接受。若您不接受以下条款，请您立即停止注册或主动停止使用平台的服务。

          {"\n"}1、 本协议的签署和修订
          {"\n"}1.1 本协议内容包括以下条款及本平台已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。本协议是您与本平台共同签订的，适用于您在本平台的全部活动。在您注册成为用户时，您已经阅读、理解并接受本协议的全部条款及各类规则，并承诺遵守各类法律规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。
          {"\n"}1.2 本平台有权根据需要不时地修改本协议或根据本协议制定、修改各类具体规则并在本平台相关系统板块发布，无需另行单独通知您。您应不时地注意本协议及具体规则的变更，若您在本协议及具体规则内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议和具体规则内容，也将遵循修改后的协议和具体规则使用本平台的服务；同时就您在协议和具体规则修订前通过本平台进行的交易及其效力，视为您已同意并已按照本协议及有关规则进行了相应的授权。若您不同意修改后的协议内容，您应停止使用本平台的服务。
          {"\n"}1.3 您通过自行或授权有关方根据本协议及本平台有关规则、说明操作确认本协议后，本协议即在您和本平台之间产生法律效力。本协议不涉及您与本平台的其他用户之间因网上交易而产生的法律关系或法律纠纷，但您在此同意将全面接受和履行与本平台其他用户在本平台签订的任何电子法律文件，并承诺按该等法律文件享有和/或放弃相应的权利、承担和/或豁免相应的义务。

          {"\n"}2、 服务的提供
          {"\n"}2.1 “平台”提供的服务主要包括：交易信息发布、交易管理、客服、结算及其他增值服务等，具体内容应以平台当时提供的服务内容为准。例如：用户可在平台上查询交易和服务信息、获取资讯、参加平台组织的活动以及使用其它信息服务及技术服务。
          {"\n"}2.2 平台仅作为用户线上交易等相关技术服务平台，不参与用户之间项目协商、交易等及因此而产生的法律关系及法律纠纷。
          {"\n"}2.3 用户已了解并同意接受，平台不能控制或保证权益信息的真实性、合法性、准确性，亦不能控制或保证项目所涉及的各权益的合法性和合理性，以及相关各方履行在相关协议项下的各项义务的能力，平台不能也不会控制交易各方能否履行协议义务。

          {"\n"}3、 用户信息及隐私权保护
          {"\n"}3.1 用户信息的提供、搜集及核实
          {"\n"}3.1.1 您有义务在注册时提供自己的真实资料，并保证诸如电子邮件地址、联系电话等内容的有效性、安全性和及时更新，以便本平台为您提供服务并与您进行及时、有效的联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。
          {"\n"}3.1.2 您授权本平台通过合法渠道获取您个人信息，以便为您提供更安全、优质的服务。
          {"\n"}3.1.3 您同意本平台可以自行或通过合作的第三方机构对您提交或本平台搜集的用户信息（包括但不限于您的个人身份证信息等）进行核实，并对获得的核实结果根据本协议及有关文件进行查看、使用和留存等操作。
          {"\n"}3.1.4 本平台按照您在本平台上的行为自动追踪关于您的某些资料。本平台利用这些资料进行有关本平台之用户统计、兴趣及行为的内部研究，以更好地了解您以便向您和本平台的其他用户提供更好的服务。
          {"\n"}3.1.5 如果您将个人通讯信息（例如：手机短信、电邮或信件）交付给本平台，或如果其他用户或第三方向本平台发出关于您在本平台上的活动或登录事项的通讯信息，本平台可以将这些资料收集在您的专门档案中。
          {"\n"}3.2 用户信息的使用和披露
          {"\n"}3.2.1 您注册成功后应妥善保管您的用户名和密码。您确认，无论是您还是您的代理人，用您的用户名和密码登录本平台后在本平台的一切行为均代表您并由您承担相应的法律后果。
          {"\n"}3.2.2 本平台对于您提供的、自行收集到的、经认证的个人信息将按照本协议及有关规则予以保护、使用或者披露。本平台将采用行业标准惯例以保护您的个人资料，但鉴于技术限制，本平台不能确保您的全部私人通讯及其他个人资料不会通过本协议中未列明的途径泄露出去。
          {"\n"}3.2.3 本平台有义务根据有关法律要求向司法机关和政府部门提供您的个人资料。在您未能按照与本协议、本平台有关规则或者与本平台其他用户签订的有关协议的约定履行自己应尽的义务时，本平台有权根据自己的判断、有关协议和规则、国家生效裁决文书或者与该笔交易有关的其他用户的合理请求披露您的个人资料（包括但不限于在本平台及互联网络上公布您的违法、违约行为，并将该内容记入任何与您相关的信用资料、档案或数据库），并且作为投资标的受让方的其他用户可以采取发布您的个人信息的方式追索债权或债权收益权或通过司法部门要求本平台提供相关资料，本平台对此不承担任何责任。
          {"\n"}3.3 您对其他用户信息的使用
          {"\n"}3.3.1 在本平台提供的交易活动中，您无权要求本平台提供其他用户的个人资料，除非符合以下条件：
          （1） 您已向法院起诉其他用户的在本平台活动中的违约行为；
          （2） 与您有关的其他用户逾期导致您未回收投资本息；
          （3） 本平台被吊销营业执照、解散、清算、宣告破产或者其他有碍于您回收投资本息的情形。

          {"\n"}4、 不保证及使用限制
          {"\n"}4.1 不保证
          {"\n"}4.1.1 在任何情况下，本平台及其股东、创建人、高级职员、董事、代理人、关联公司、母公司、子公司和雇员（以下称“本平台方”）均不以任何明示或默示的方式对您使用本平台服务而产生的任何形式的直接或间接损失承担法律责任，包括但不限于资金损失、利润损失、营业中断损失等，本平台方不保证平台内容的真实性、充分性、及时性、可靠性、完整性和有效性，并且不承担任何由此引起的法律责任。
          {"\n"}4.1.2 本平台不能保证也没有义务保证第三方平台上的信息的真实性和有效性。您应按照第三方平台的服务协议使用第三方平台，而不是按照本协议。第三方平台的内容、产品、广告和其他任何信息均由您自行判断并承担风险，而与本平台无关。
          {"\n"}4.1.3 因为本平台或者涉及的第三方平台的设备、系统存在缺陷、黑客攻击、网络故障、电力中断、计算机病毒或其他不可抗力因素造成的损失，本平台均不负责赔偿，您的补救措施只能是与本平台协商终止本协议并停止使用本平台。
          {"\n"}4.2 使用限制
          {"\n"}4.2.1 您承诺合法使用本平台提供的服务及平台内容。您不得利用本服务从事侵害他人合法权益之行为，不得在本平台从事任何可能违反中国的法律、法规、规章和政府规范性文件的行为或者任何未经授权的行为，如擅自进入本平台的未公开的系统、不正当的使用账号密码和平台的任何内容等。
          {"\n"}4.2.2 您不得使用本平台提供的服务或其他电子邮件转发服务发出垃圾邮件或其他可能违反本协议的内容。
          {"\n"}4.2.3 本平台中全部内容的版权均属于本平台所有，该等内容包括但不限于文本、数据、文章、设计、源代码、软件、图片、照片及其他全部信息（以下称“平台内容”）。平台内容受中华人民共和国著作权法及各国际版权公约的保护。未经本平台事先书面同意，您承诺不以任何方式、不以任何形式复制、模仿、传播、出版、公布、展示平台内容，包括但不限于电子的、机械的、复印的、录音录像的方式和形式等。您承认平台内容是属于本平台的财产。未经本平台书面同意，您亦不得将本平台包含的资料等任何内容镜像到任何其他平台或者服务器。任何未经授权对平台内容的使用均属于违法行为，本平台将追究您的法律责任。
          {"\n"}4.2.5 由于您违反本协议或任何法律、法规或侵害第三方的权利，而引起第三方对本平台提出的任何形式的索赔、要求、诉讼，本平台有权向您追偿相关损失，包括但不限于本平台的法律费用、名誉损失、及向第三方支付的补偿金等。

          {"\n"}5、 协议终止及账户的暂停、注销或终止
          {"\n"}5.1 除非本平台终止本协议或者您申请终止本协议且经本平台同意，否则本协议始终有效。在您违反了本协议、相关规则，或在相关法律法规、政府部门的要求下，本平台有权通过站内信、电子邮件通知等方式终止本协议、关闭您的账户或者限制您使用本平台。但本平台的终止行为不能免除您根据本协议或在本平台生成的其他协议项下的还未履行完毕的义务。
          {"\n"}5.2 您若发现有第三人冒用或盗用您的用户账户及密码，或其他任何未经合法授权的情形，应立即以有效方式通知本平台，要求本平台暂停相关服务，否则由此产生的一切责任由您本人承担。同时，您理解本平台对您的请求采取行动需要合理期限，在此之前，本平台对第三人使用该服务所导致的损失不承担任何责任。
          {"\n"}5.3 本平台有权基于单方独立判断，在认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向您提供本协议项下的全部或部分用户服务，并将注册资料移除或删除，且无需对您或任何第三方承担任何责任。前述情形包括但不限于：
          （1） 本平台认为您提供的个人资料不具有真实性、有效性或完整性；
          （2） 本平台发现异常交易或有疑义或有违法之虞时；
          （3） 本平台认为您的账户涉嫌洗钱、套现、传销、被冒用或其他本平台认为有风险之情形；
          （4） 本平台认为您已经违反本协议中规定的各类规则；
          （5） 本平台基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向您提供本协议项下的全部或部分用户服务，并将注册资料移除或删除的其他情形。
          {"\n"}5.4 您同意，用户账户的暂停、中断或终止不代表您责任的终止，您仍应对您使用本平台服务期间的行为承担可能的违约或损害赔偿责任，同时本平台仍可保有您的相关信息。

          {"\n"}6、 通知
          {"\n"}本协议项下的通知如以公示方式作出，一经在本平台公示即视为已经送达。除此之外，其他向您个人发布的具有专属性的通知将由本平台向您在注册时提供的电子邮箱，或本平台在您的个人账户中为您设置的站内消息系统栏，或您在注册时在本平台绑定的手机发送，一经发送即视为已经送达。请您密切关注您的电子邮箱、站内消息系统栏中的邮件、信息及手机中的短信信息。您同意本平台出于向您提供服务之目的，可以向您的电子邮箱、站内消息系统栏和手机发送有关通知或提醒；若您不愿意接收，请在本平台相应系统板块进行设置。但您同时同意并确认，若您设置了不接收有关通知或提醒，则您有可能收不到该等通知信息，您不得以您未收到或未阅读该等通知信息主张相关通知未送达于您。

          {"\n"}7、 适用法律和管辖
          {"\n"}7.1本协议的签署、解释、变更、履行及争议的解决等均适用中华人民共和国大陆现行的有效法律；如法律无相关规定的，参照商业惯例及／或行业惯例。
          {"\n"}7.2履行本协议过程中产生的任何争议，双方应协商解决。协商不成的，均应提交华南国际经济贸易仲裁委员会，按照该会届时有效的仲裁规则进行仲裁。相关争议应单独仲裁，不得与任何其它方的争议在任何仲裁中合并处理，该仲裁裁决为终局裁决，对各方均有约束力。

          {"\n"}8、 其他
          {"\n"}本平台对本协议拥有最终的解释权。本协议及本平台有关页面的相关名词可互相引用参照，如有不同理解，则以本协议条款为准。此外，若本协议的部分条款被认定为无效或者无法实施时，本协议中的其他条款仍然有效。

        </View>
      ) : (
        <View className={'userAgreement-wrap-title'} >
          User Registration Agreement{"\n"}

          Welcome to use "QUANTEVE Quantitative Platform" (hereinafter referred to as the "Platform"). Before using our products and/or services, you need to register on the platform. In order to ensure that registered users can better use the services of the platform and maintain the legitimate rights and interests of registered users, we have formulated the "User Registration Agreement" ("this agreement") with legal binding force to define the rights and obligations of both parties. The platform will strictly provide services to registered users in accordance with the provisions of this agreement. You are hereby reminded to read carefully and understand fully the terms of this agreement, and please read and select whether to accept this agreement with caution. By accepting all the terms of this agreement (including but not limited to clicking, checking, handwritten signature, etc.), it means that you fully understand the meaning of the terms of this user registration agreement and the corresponding legal consequences and fully accept them. If you do not agree the following terms, please stop registering or using the services of the platform.

          {"\n"}1. Signing and Revision of this Agreement
          {"\n"}1.1 The content of this agreement includes the following terms and all types of rules that have been or may be published by this platform. All rules are an integral part of this agreement and have equal legal effect as the main text of the agreement. This agreement is jointly signed by you and this platform and applies to all your activities on this platform. When you register as a user, you have read, understood, and accepted all the terms of this agreement and various rules, and promised to comply with various legal provisions. If any violation leads to any legal consequences, you will be held responsible in your own name.
          {"\n"}1.2 This platform has the right to modify this agreement as needed or formulate and modify various specific rules based on this agreement and publish them in the relevant sections of this platform, without separately notifying you. You should keep an eye on the changes in this agreement and specific rules from time to time. If you continue to use this service after the announcement of changes to this agreement and specific rules, it means that you have fully read, understood, and accepted the modified agreement and specific rule content, and will also comply with the modified agreement and specific rules to use the services of this platform. At the same time, any transactions and their effects conducted through this platform before the revision of the agreement and specific rules shall be deemed to have been agreed by you, and relevant authorization has been given in accordance with this agreement and the relevant rules. If you do not agree to the modified agreement, you should stop using the services of this platform.
          {"\n"}1.3 When you confirm this agreement through your own operation or authorization by a relevant party according to this agreement and the relevant rules of this platform, this agreement will take effect between you and this platform. This agreement does not involve the legal relationship or legal disputes between you and other users of this platform arising from online transactions. However, you agree to fully accept and fulfill any electronic legal documents signed with other users of this platform on this platform, and promise to enjoy and/or waive the corresponding rights, assume and/or waive the corresponding obligations under such legal documents.

          {"\n"}2. Provision of Services
          {"\n"}2.1 The services provided by the "Platform" mainly include: transaction information release, transaction management, customer service, settlement, and other value-added services, and the specific content shall be subject to the service content provided by the platform at that time. For example, users can inquire about transaction and service information on the platform, obtain information, participate in activities organized by the platform, and use other information services and technical services.
          {"\n"}2.2 The platform only serves as a technical service platform for users' online transactions and is not involved in the project negotiations and transactions between users or the legal relationships and disputes arising therefrom.
          {"\n"}2.3 Users understand and agree that the platform cannot control or guarantee the authenticity, legality, and accuracy of equity information, nor can it control or guarantee the legality and reasonableness of various rights involved in the project and the ability of all parties to perform their obligations under the relevant agreements. The platform also cannot and will not control whether the parties to the transaction can fulfill their contractual obligations.

          {"\n"}3. User Information and Privacy Protection
          {"\n"}3.1 Provision, Collection, and Verification of User Information
          {"\n"}3.1.1 You have an obligation to provide your true information at the time of registration and ensure the validity, security, and timely updating of information such as email address and contact telephone number, so as to enable this platform to provide services to you and maintain effective communication with you. You should bear all losses or additional costs incurred in your use of this service due to the inability to contact you through these contact methods.
          {"\n"}3.1.2 You authorize this platform to obtain your personal information through legal channels in order to provide you with a safer and better quality of service.
          {"\n"}3.1.3 You agree that this platform may verify the user information submitted by you or collected by this platform (including but not limited to your personal ID information) through its own means or through cooperation with third-party institutions, and view, use, and retain the verification results according to this agreement and relevant documents.
          {"\n"}3.1.4 This platform automatically tracks certain information about you based on your actions on this platform. This platform uses this information for internal research on users of this platform, their interests, and behaviors, in order to better understand you and provide better services to you and other users of this platform.
          {"\n"}3.1.5 If you provide personal communication information (such as mobile text messages, emails, or letters) to this platform, or if other users or third parties send communication information to this platform regarding your activities or login matters on this platform, this platform may collect this information in your special file.
          {"\n"}3.2 Use and Disclosure of User Information
          {"\n"}3.2.1 After you successfully register, you should keep your username and password safe. You confirm that both you and your agent, after logging into this platform with your username and password, all actions on this platform represent you and are subject to corresponding legal consequences borne by you.
          {"\n"}3.2.2 This platform will protect, use, or disclose the personal information provided by you, collected by itself, or verified according to this agreement and relevant rules. This platform will adopt industry-standard practices to protect your personal information. However, due to technical limitations, this platform cannot guarantee that all your private communication and other personal information will not be disclosed through channels not stipulated in this agreement.
          {"\n"}3.2.3 This platform has an obligation to provide your personal information to judicial authorities and competent departments in accordance with relevant legal requirements. If you fail to fulfill your obligations in accordance with the provisions of this agreement, the relevant rules of this platform, or the agreements signed with other users of this platform, this platform has the right, based on its judgment, relevant agreements and rules, effective national arbitration documents, or reasonable requests from other users related to the transaction, to disclose your personal information (including but not limited to disclosing your illegal and breach of contract behaviors on this platform and recording such content in any credit information, files, or databases related to you). Other users who become assignees of investment targets can also pursue claims by publishing your personal information or request this platform to provide relevant information through judicial authorities, and this platform shall not bear any responsibility for this.
          {"\n"}3.3 Your Use of Other Users' Information
          {"\n"}3.3.1 In the transaction activities provided on this platform, you have no right to request this platform to provide other users' personal information unless you meet the following conditions:
          (1) You have reported to the court other users' breach of contract behaviors in the activities on this platform;
          (2) Other users related to you have defaulted, resulting in your failure to recover investment principal and interest;
          (3) This platform has had its business license revoked, dissolved, liquidated, declared bankrupt, or other circumstances that hinder you from recovering investment principal and interest.

          {"\n"}4. No Guarantee and Usage Restrictions
          {"\n"}4.1 No Guarantee
          {"\n"}4.1.1 Under no circumstances shall this platform, its shareholders, founders, senior officers, directors, agents, affiliated companies, parent companies, subsidiaries, and employees (hereinafter referred to as the "Platform Party") be liable in any form, whether direct or indirect, for any damages incurred as a result of your use of the services provided by this platform, including but not limited to financial losses, profit losses, business interruption losses, etc. The platform party does not guarantee the authenticity, adequacy, timeliness, reliability, completeness, and effectiveness of the platform content, and does not assume any legal liability arising therefrom.
          {"\n"}4.1.2 This platform cannot guarantee or is not obliged to guarantee the authenticity and effectiveness of the information on third-party platforms. You should use third-party platforms according to the service agreements of third-party platforms, rather than according to this agreement. The content, products, advertisements, and any other information on third-party platforms are judged and assumed at your own risk and have nothing to do with this platform.
          {"\n"}4.1.3 This platform is not responsible for any losses caused by defects, tampering, network failures, power outages, computer viruses, or other force majeure factors of its or the third-party platforms' equipment or systems. Your remedy can only be negotiated with this platform to terminate this agreement and stop using this platform.
          {"\n"}4.2 Usage Restrictions
          {"\n"}4.2.1 You promise to use the services provided by this platform and the platform content legally. You shall not engage in any behavior that infringes upon the legitimate rights and interests of others or engage in any illegal behaviors, unapproved behaviors, or behaviors that violate the laws, regulations, rules, and normative documents **issuing departments. For example, unauthorized access to undisclosed systems of this platform, improper use of account passwords and platform content, etc.
          {"\n"}4.2.2 You are not entitled to request the platform to provide other users' personal information in the trading activities provided on this platform unless the following conditions are met:
          (1) You have reported to the court other users' breach of contract behaviors in the activities on this platform;
          (2) Other users related to you have defaulted, resulting in your failure to recover investment principal and interest;
          (3) This platform has had its business license revoked, dissolved, liquidated, declared bankrupt, or other circumstances that hinder you from recovering investment principal and interest.

          {"\n"}5. Termination of the agreement and suspension, cancellation or termination of the account
          {"\n"}5.1 This Agreement will remain in effect unless the Platform terminates this Agreement or you apply to terminate this Agreement and the Platform agrees. If you violate this Agreement, relevant rules, or upon the request of relevant laws, regulations, or government departments, this platform has the right to terminate this Agreement, close your account, or restrict your use of this Platform through site letters, email notifications, etc. However, the termination of this platform cannot relieve you of your unfulfilled obligations under this agreement or other agreements generated by this platform.
          {"\n"}5.2 If you find that a third party has fraudulently used or stolen your user account and password, or any other situation without legal authorization, you should immediately notify this platform in an effective manner and request this platform to suspend relevant services, otherwise any resulting consequences All responsibility lies with you. At the same time, you understand that this platform needs a reasonable period of time to take action on your request. Before that, this platform does not bear any responsibility for the losses caused by the third party's use of the service.
          {"\n"}5.3 Based on unilateral independent judgment, this platform has the right to suspend, interrupt or terminate all or part of the user services provided under this agreement to you without notice when it believes that situations such as jeopardizing transaction security may occur, and transfer the registration information to you. remove or delete without any liability to you or any third party. The aforementioned situations include but are not limited to:
          (1) This platform believes that the personal information you provide is not authentic, valid or complete;
          (2) When the platform discovers abnormal transactions or is suspicious or illegal;
          (3) This platform believes that your account is suspected of money laundering, cashing out, pyramid schemes, fraudulent use, or other situations that this platform considers to be risky;
          (4) This platform believes that you have violated various rules stipulated in this agreement;
          (5) Due to transaction security and other reasons, the platform needs to suspend, interrupt or terminate all or part of the user services under this agreement and remove or delete the registration information according to its sole judgment.
          {"\n"}5.4 You agree that the suspension, interruption or termination of your user account does not mean the termination of your responsibility. You shall still be liable for possible breach of contract or damages for your behavior during the use of this platform's services. At the same time, this platform can still retain your relevant information.

          {"\n"}6. Notification
          {"\n"}If a notice under this Agreement is made by public announcement, it will be deemed to have been served once it is publicized on this platform. In addition, other exclusive notices issued to you personally will be sent by this platform to the email address you provided when registering, or by the on-site message system bar set by this platform for you in your personal account, or by you in Sent to the mobile phone bound to this platform when registering, it will be deemed to have been delivered once sent. Please pay close attention to your email, emails and messages in the message system column on the site, and text messages on your mobile phone. You agree that for the purpose of providing services to you, this platform can send relevant notifications or reminders to your email, site message system column and mobile phone; if you are unwilling to receive them, please set them in the corresponding system section of this platform.However, you also agree and confirm that if you have set up not to receive relevant notifications or reminders, you may not receive such notification information, and you may not claim that the relevant notification has not been delivered because you have not received or read the notification information. to you.

          {"\n"}7. Applicable law and jurisdiction
          {"\n"}7.1 The signing, interpretation, modification, performance and dispute resolution of this Agreement shall be governed by the current effective laws of the People's Republic of China; if there are no relevant provisions of the law, commercial practices and/or industry practices shall be referred to.
          {"\n"}7.2 Any disputes arising during the performance of this agreement shall be resolved by both parties through negotiation. If negotiation fails, the dispute shall be submitted to the South China International Economic and Trade Arbitration Commission for arbitration in accordance with the arbitration rules in effect at that time. Relevant disputes shall be arbitrated individually and shall not be consolidated with any other party's disputes in any arbitration. The arbitral award shall be final and binding on all parties.

          {"\n"}8. Others
          {"\n"}This platform has the final right to interpret this agreement. Related terms in this agreement and relevant pages of this platform may be referenced to each other. If there is any different understanding, the terms of this agreement shall prevail. In addition, if some provisions of this Agreement are deemed invalid or unenforceable, the other provisions of this Agreement will remain valid.
        </View>
      )}
    </ScrollView>
  )
}
