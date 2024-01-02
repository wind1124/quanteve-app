import { ScrollView, View } from '@tarojs/components'
import { useLanguageStore } from '@/stores/useLanguage'
import './index.scss'
import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import useI18n from '@/hooks/useI18n'

export default function PrivacyStatement() {
  const T = useI18n()
  const [langVal, setLangVal] = useState('简体中文')
  const { lang } = useLanguageStore()

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: T('隐私声明')
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
    <ScrollView scrollY enableBackToTop className="privacyStatement-wrap">
      {langVal === '简体中文' ? (
        <View className="privacyStatement-wrap-title" style={{ whiteSpace: 'pre-line' }}>

          隐私声明：{"\n"}

          欢迎您使用“QUANTEVE平台”（以下简称“平台”）您在使用我们的产品与/或服务时，我们可能会收集和使用您的相关信息。我们希望通过《隐私声明》（“本隐私政策”）向您说明我们在您使用我们的产品与/或服务时如何收集、使用、保存、共享和转让这些信息，以及我们为您提供的访问、更新、删除和保护这些信息的方式。您在平台注册账号，即意味着您已阅读本隐私声明所有条款，并对本隐私声明条款的含义及相应的法律后果已全部通晓并充分理解，并且同意平台按照本隐私声明收集、使用并保护您信息。

          {"\n"}一、我们如何收集和使用您的个人信息
          个人信息是以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。敏感个人信息是一旦泄露或者非法使用，容易导致自然人的人格尊严受到侵害或者人身、财产安全受到危害的个人信息，包括生物识别、宗教信仰、特定身份、医疗健康、金融账户、行踪轨迹等信息，以及不满十四周岁未成年人的个人信息。
          我们会遵循正当、合法、必要的原则，出于本政策所述的以下目的，收集和使用您在使用产品与/或服务过程中主动提供或因使用产品与/或服务而产生的个人信息，以及从第三方获取您的相关个人信息。如果我们要将您的个人信息用于本政策未载明的其它用途，或将基于特定目的收集而来的信息用于其他目的，我们将以合理的方式向您告知，并在使用前再次征得您的同意。
          {"\n"}1. 基本业务功能信息
          您需要向我们提供部分个人信息以供我们实现服务平台的基本业务功能。为实现基本业务功能所需的信息称为“必要信息”，若您拒绝提供这些“必要信息”，我们将无法向您提供该基本业务功能及相应服务；并非为实现基本业务功能所需的信息称为“余外信息”，若您拒绝提供该等“余外信息”，不会影响您使用我们的基本业务功能。
          {"\n"}1.1 用户注册
          为使用服务平台产品与/或服务，您首先需要注册一个平台账户。您在注册时，至少需要向我们提供您本人的邮箱地址以及您将要使用的密码，平台将收集您的基础信息以满足相关法律法规的要求并保护您的账号安全。
          {"\n"}1.2 商品与/或服务信息展示和搜索
          为了让您快速地找到您所需要的商品与/或服务，并确保商品与/或服务信息得到正确的展示，我们可能会收集您使用我们的产品与/或服务的服务提供商网络ID（PLMN））来为您提供商品或服务信息展示的最优方式。我们也会为了不断改进和优化上述的功能来使用您的上述个人信息。您也可以通过搜索来精准地找到您所需要的商品或服务。我们会保留您的搜索内容以方便您重复输入或为您展示与您搜索内容相关联的商品或服务。
          {"\n"}1.3客服与售后功能
          为保证您的账号安全，我们的在线客服会使用您的账号信息与您核验您的身份。当您需要我们提供售前咨询或者与您订单信息相关的客服与售后服务时，我们将会查询您的*访问记录或者*订单信息。您有可能会在与我们的客服人员沟通时，提供给出上述信息外的其他信息。
          {"\n"}1.4发送系统消息
          在您使用服务平台期间，我们会收集您的【账号、邮箱地址、手机号码】信息在必要时将以站内信的形式您发出与服务平台产品与/或服务有关的重要通知，包括：
          a)软件认证或管理软件升级、维护的公告；
          b)用户协议、隐私政策变更的公告；
          c)服务规则/制度设立、更新或取消的公告；
          d)其他与服务相关的消息，如系统欢迎词，节假日或特殊纪念日祝福语，不时推出的活动消息、服务新功能通知；中冷冻品平台产品或服务满意度调查邀请；交易通知；因系统维护将暂停某一项服务的通知。
          除非您注销账户，您无法取消接受这些与服务有关、性质不属于推广的系统消息。
          {"\n"}1.5 改进我们的产品与/或服务所必须的功能
          我们还可能为了提供服务及改进服务质量的合理需要而获得的您的其他信息，包括您与客服联系时您提供的相关信息，您参与问卷调查时向我们发送的问卷答复信息，以及您与我们的关联方、我们合作伙伴之间互动时我们获得的相关信息。对于从您的各种设备上收集到的信息，我们可能会将它们进行关联，以便我们能在这些设备上为您提供一致的服务。我们可能会将来自某项服务的信息与来自其他服务的信息结合起来，以便为您提供服务、个性化内容和建议。
          {"\n"}1.6 征得授权同意的例外 根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：
          a)与国家安全、国防安全有关的；
          b)与公共安全、公共卫生、重大公共利益有关的；
          c)与犯罪侦查、起诉、审判和判决执行等有关的；
          d)出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；
          e)所收集的个人信息是您自行向社会公众公开的；
          f)从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
          g)根据您的要求签订合同所必需的；
          h)用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；
          i)法律法规规定的其他情形。

          {"\n"}二、我们如何保护和保存您的个人信息
          {"\n"}1.我们保护您个人信息的技术与措施 我们非常重视个人信息安全，并采取一切合理可行的措施，保护您的个人信息。
          {"\n"}2.数据安全技术措施 我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息遭到未经授权的访问使用、修改,避免数据的损坏或丢失。网络服务采取了传输层安全协议等加密技术，通过https等方式提供浏览服务，确保用户数据在传输过程中的安全。
          我们采取加密技术对用户个人信息进行加密保存，并通过执行严格的数据访问权限控制，避免数据被违规使用。在个人信息使用时，例如个人信息展示、个人信息关联计算，我们会采用脱敏技术增强个人信息在使用中安全性。
          {"\n"}3.您个人信息的保存 您的个人信息将全被存储于海外云服务器。如您发起或接受一笔与境外主体的交易，需要向境外传输您的个人信息完成交易的，视为您同意向该笔交易中所涉及的境外主体传输您的个人信息。如果我们或我们的服务商/合作伙伴提供服务的过程中需要向境外传输您的个人信息的，我们会单独征得您的授权同意并要求接收方按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理这些个人信息。
          如果我们终止服务或运营，我们会至少提前三十日向您通知，并在终止服务或运营并满足相关法律法规的要求期限后对您的个人信息进行删除或匿名化处理。

          {"\n"}三、我们如何保护未成年人的个人信息
          {"\n"}1. 服务平台非常重视对未成年人个人信息的保护，我们不接受未成年人在服务平台创建自己的用户账户。
          {"\n"}2. 如果我们发现未成年人的父母或监护人在使用服务平台中主动提供未成年人信息的，或者我们在未事先获得可证实的父母或法定监护人同意的情况下收集了未成年人的个人信息，我们会设法尽快删除相关数据。

          {"\n"}四、我们如何使用Cookie和同类技术
          {"\n"}我们不会将 Cookies 用于本隐私政策所述目的之外的任何用途。您可根据自己的偏好管理或删除 Cookies。您可以清除计算机上保存的所有 Cookies，大部分网络浏览器会自动接受Cookies，但您通常可根据自己的需要来修改浏览器的设置以拒绝 Cookies；另外，您也可以清除软件内保存的所有Cookies。但如果您这么做，您可能需要在每一次访问中冷冻品平台时亲自更改用户设置，而且您之前所记录的相应信息也均会被删除，并且可能会对您所使用服务的安全性有一定影响。如需详细了解如何更改浏览器设置，请访问您使用的浏览器的相关设置页面。

          {"\n"}五、您如何进行个人信息管理
          {"\n"}您可以通过以下方式访问及管理您的个人信息：
          {"\n"}1.访问您的个人信息
          {"\n"}除法律法规另有规定，您有权访问您的个人信息。您可以通过以下方式自行访问您的信息：个人资料信息：如果您希望访问或编辑您的账户中的个人基本资料信息您可以登录账号通过“我的-账户设置”执行此类操作。
          {"\n"}2.更正或补充您的个人信息
          当您发现我们处理您的个人信息存在错误、过时或不完整时，您应当通过本条第1点中罗列的路径做出修改或更新。若您无法通过上述方式更新您的个人信息，您可以随时使用我们的在线客服、电话客服方式、本网站电子邮件方式联系我们，我们将在收到您通知后的15天内反馈您的申请。
          {"\n"}3.删除您的个人信息 您可以通过本条第1点中罗列的路径删除您的部分个人信息。
          {"\n"}在以下情形中，您可以向我们提出删除个人信息的请求：
          a)如果我们处理个人信息的行为违反法律法规；
          b)如果我们收集、使用您的个人信息，却未征得您的明确同意；
          c)如果我们处理个人信息的行为严重违反了与您的约定；
          d)如果您不再使用我们的产品或服务，或您主动注销了账号；
          e)如果我们永久不再为您提供产品或服务。
          {"\n"}若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。
          {"\n"}4.个人信息主体注销账户
          {"\n"}您可以通过隐私政策的联系方式联系我们提交账户注销申请。
          在您主动注销账户之后，我们将停止为您提供产品或服务。除非法律法规另有规定，您的个人信息我们将保存至您账号注销之日后的一个月或法律法规规定的其他要求期限。我们承诺这是为了保证您在服务平台的消费者权益，您个人信息在服务平台商城须保存的最短期间。当您的个人信息超出我们所保存的期限后，我们会对您的个人信息进行删除或匿名化处理。
          {"\n"}5.响应您的上述请求
          {"\n"}为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。我们将在15天内做出答复。对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。
          在以下情形中，按照法律法规要求，我们将无法响应您的请求：
          a)与国家安全、国防安全有关的；
          b)与公共安全、公共卫生、重大公共利益有关的；
          c)与犯罪侦查、起诉、审判和执行判决等有关的；
          d)有充分证据表明个人信息主体存在主观恶意或滥用权利的；
          e)响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；
          f)涉及商业秘密的。

          {"\n"}六、联系我们
          如您对本隐私政策或您个人信息的相关事宜有任何问题、意见或建议，请通过服务平台公示的电子邮件等多种方式与我们联系。
          一般情况下，我们将在十五天内回复。

          {"\n"}如果本隐私声明的任何条款在任何程度上被认定无效或不可执行，本隐私声明的其余部分不应受其影响且应在法律允许的最大程度内予以执行。如本隐私声明与服务平台的用户注册协议中规定的条款存在不一致或矛盾之处，以隐私声明的条款为准。

        </View>
      ) : (
        <View className="privacyStatement-wrap-title">
          Privacy Statement{"\n"}

          Welcome to "QUANTEVE Quantitative Platform" (hereinafter referred to as "the Platform"). When you use our products and/or services, we may collect and use your related information. We would like to explain to you in this Privacy Statement how we collect, use, store, share, and transfer this information when you use our products and/or services, as well as the way we provide you with access, updates, deletion, and protection of this information. By registering an account on the platform, you indicate that you have read and understood all the terms of this Privacy Statement and the corresponding legal consequences, and you agree that the Platform may collect, use, and protect your information in accordance with this Privacy Statement.

          {"\n"}I. How We Collect and Use Your Personal Information
          Personal information refers to various information recorded electronically or by other means that can identify or can be used to identify a specific natural person, excluding anonymized information. Sensitive personal information refers to personal information that, once leaked or illegally used, may easily endanger the personal dignity, personal safety, or personal property of a natural person, including biological recognition, religious beliefs, specific identities, medical health, financial accounts, and travel traces, as well as personal information of individuals under the age of fourteen.
          We will adhere to the principles of legitimacy, fairness, and necessity and collect and use personal information that you actively provide or generate as a result of using our products and/or services for the following purposes stated in this policy, as well as obtain your personal information from third parties. If we intend to use your personal information for purposes not specified in this policy or use information collected for specific purposes for other purposes, we will inform you in a reasonable manner and obtain your consent again before using it.
          {"\n"}1. Basic Business Function Information
          You need to provide us with certain personal information in order for us to achieve the basic business functions of the service platform. The information required to achieve the basic business functions is called "necessary information." If you refuse to provide this "necessary information," we will be unable to provide you with the corresponding basic business function and related services. The information that is not required to achieve the basic business functions is called "additional information." If you refuse to provide this "additional information," it will not affect your use of our basic business functions.
          {"\n"}1.1 User Registration
          In order to use the products and/or services of the service platform, you need to register an account on the platform. When registering, you need to provide us with your email address and password, and the platform will collect your basic information to meet the requirements of relevant laws and regulations and protect the security of your account.
          {"\n"}1.2 Display and Search of Goods and/or Services Information
          In order to help you quickly find the goods and/or services you need and ensure the correct display of goods and/or services information, we may collect your PLMN (Public Land Mobile Network) ID, which is the service provider network ID you use for our products and/or services, to provide you with the best way to display goods or services information. We may also use your personal information as mentioned above to continuously improve and optimize the aforementioned functions. You can also use the search function to accurately find the goods or services you need. We will retain your search history to facilitate your repeated input or to show you goods or services related to your search history.
          {"\n"}1.3 Customer Service and After-sales Function
          To ensure the security of your account, our online customer service will use your account information to verify your identity. When you need pre-sales consultation or customer service and after-sales services related to your order information, we will retrieve your access records or order information. You may provide other information to our customer service representatives during your communication with them.
          {"\n"}1.4 Sending System Messages
          During your use of the service platform, we will collect your account, email address, and phone number to send you important notifications related to the service platform products and/or services, such as through internal messages. These notifications include:
          a) Notices of software authentication or management software upgrade and maintenance;
          b) Notices of changes to user agreements and privacy policies;
          c) Notices of the establishment, update, or cancellation of service rules/regulations;
          d) Other messages related to the service, such as system welcome messages, holiday or special occasion greetings, activity announcements, notifications of new service features, invitations to satisfaction surveys for frozen food platform products or services, transaction notifications, and notifications of temporary suspension of a service due to system maintenance.
          Unless you cancel your account, you cannot unsubscribe from these non-promotional system messages related to the service.
          {"\n"}1.5 Improvement of Our Products and/or Services
          We may obtain other information from you for reasonable needs in order to provide and improve the quality of our services, including information you provide when contacting customer service, questionnaire responses you send to us when participating in surveys, and relevant information we obtain from interactions between you and our affiliates or partners. For information collected from various devices you use, we may associate them to provide consistent services on these devices. We may combine information from one service with information from other services to provide you with services, personalized content, and recommendations.
          {"\n"}1.6 Exceptions to Obtaining Authorized Consent
          According to relevant laws and regulations, it is not necessary to obtain your authorized consent to collect your personal information in the following circumstances:
          a) Related to national security and national defense security;
          b) Related to public safety, public health, and major public interests;
          c) Related to criminal investigation, prosecution, trial, and execution of judgments;
          d) Necessary to protect the life, property, and other major legitimate rights and interests of personal information subjects or other individuals but it is difficult to obtain the consent of the individual concerned;
          e) The personal information collected is voluntarily disclosed by you to the public;
          f) Collection of personal information from legally disclosed information, such as legal news reports and government information disclosure channels;
          g) Necessary for signing contracts at your request;
          h) Necessary for the safe and stable operation of the provided products or services, such as discovering and resolving faults in products or services;
          i) Other circumstances as specified by laws and regulations.

          {"\n"}II. How We Protect and Store Your Personal Information
          {"\n"}1. Technical Measures to Protect Your Personal Information
          We attach great importance to personal information security and take all reasonable and feasible measures to protect your personal information.
          {"\n"}2. Data Security Technology Measures
          We will take security protection measures that comply with industry standards, including establishing reasonable rules and regulations and using security technology to prevent unauthorized access, usage, modification, data damage, or loss of your personal information. Our network services adopt encryption technology and transmission layer security protocols, such as HTTPS, to provide browsing services, ensuring the security of user data during transmission.
          We use encryption technology to encrypt user personal information and implement strict data access control to prevent unauthorized use of data. When using personal information, such as displaying personal information and associating personal information, we use desensitization technology to enhance the security of personal information during use.
          {"\n"}3. Storage of Your Personal Information
          Your personal information will be stored on overseas cloud servers. If you initiate or accept a transaction with an overseas entity and need to transfer your personal information overseas to complete the transaction, it will be considered that you agree to transfer your personal information to the overseas entity involved in the transaction. If it is necessary to transfer your personal information overseas during our provision of services with the assistance of our service providers/partners, we will separately obtain your authorized consent and require the receiving party to comply with our instructions, this privacy policy, and any other relevant confidentiality and security measures.

          {"\n"}III. How We Protect the Personal Information of Minors
          {"\n"}1. The platform attaches great importance to the protection of personal information of minors and does not accept minors creating their user accounts on the platform.
          {"\n"}2. If we discoverthat parents or guardians of minors actively provide information about minors while using the platform or if we collect personal information of minors without obtaining verifiable consent from parents or legal guardians, we will make efforts to delete the relevant data as soon as possible.

          {"\n"}IV. How We Use Cookies and Similar Technologies
          {"\n"}We will not use cookies for any purposes other than those described in this Privacy Statement. You can manage or delete cookies according to your preferences. You can clear all cookies stored on your computer. Most web browsers automatically accept cookies, but you can usually modify your browser settings to reject cookies according to your needs. Additionally, you can also clear all cookies stored within the software. However, if you do so, you may need to manually modify user settings each time you visit the frozen food platform, and the relevant information recorded earlier will be deleted, which may have a certain impact on the security of the services you use. For detailed instructions on how to change browser settings, please visit the relevant settings page of your browser.

          {"\n"}V. How You Manage Your Personal Information
          {"\n"}You can access and manage your personal information through the following methods:
          {"\n"}1. Accessing Your Personal Information
          Unless otherwise specified by laws and regulations, you have the right to access your personal information. You can access your information by logging into your account and performing relevant operations through "My-Account Settings".
          {"\n"}2. Correcting or Supplementing Your Personal Information
          When you find errors, outdated information, or incomplete information in the way we process your personal information, you should promptly make modifications or updates through the methods listed in point 1 above. If you are unable to update your personal information through the above methods, you can contact us through our online customer service, telephone customer service, or email to request the necessary changes, and we will provide feedback within 15 days upon receiving your request.
          {"\n"}3. Deleting Your Personal Information
          {"\n"}You can delete certain personal information through the methods listed in point 1 above.
          {"\n"}You can request the deletion of personal information in the following situations:
          a) If our processing of personal information violates laws and regulations;
          b) If we collect and use your personal information without obtaining your explicit consent;
          c) If our processing of personal information seriously violates the agreement with you;
          d) If you no longer use our products or services or if you actively cancel your account;
          e) If we permanently cease to provide products or services to you.
          If we decide to respond to your deletion request, we will also notify other parties that have obtained your personal information from us as much as possible, and request them to promptly delete it unless otherwise specified by laws and regulations or unless these parties have obtained your independent authorization. After you delete information from our services, we may not immediately delete the corresponding information from our backup systems, but will delete such information when the backup is updated.
          {"\n"}4. Personal Information Subject to Account Cancellation
          {"\n"}You can submit a request for account cancellation by contacting us through the contact information provided in this privacy policy.
          After you actively cancel your account, we will cease to provide products or services to you. Except as otherwise provided by laws and regulations, we will retain your personal information for one month from the date of your account cancellation or for any other legally required period. We promise that this is the shortest period for retaining your personal information on the service platform to protect your consumer rights on the service platform. After your personal information exceeds the retention period, we will delete or anonymize your personal information.
          {"\n"}5. Responding to Your Requests
          {"\n"}To ensure security, you may need to provide a written request or provide other types of proof of your identity. We may first request you to verify your identity before processing your request. We will respond within 15 days. For reasonable requests, we generally do not charge a fee. However, for repeated or excessive requests beyond a reasonable limit, we may charge a certain cost. We may refuse requests that are groundless, require excessive technical means (e.g., require the development of new systems or fundamentally change existing practices), pose risks to the legitimate rights and interests of others, or are impractical (e.g., involve information stored on backup tapes).
          According to the requirements of laws and regulations, we will be unable to respond to your requests in the following circumstances:
          a) Related to national security and national defense security;
          b) Related to public safety, public health, and major public interests;
          c) Related to criminal investigation, prosecution, trial, and execution of judgments;
          d) There is sufficient evidence to show that the personal information subject has subjective malice or abuses rights;
          e) Responding to your request will cause serious harm to your legitimate rights and interests or the legitimate rights and interests of other individuals or organizations;
          f) Involve trade secrets.

          {"\n"}VI. Contact Us
          If you have any questions, comments, or suggestions regarding this privacy policy or your personal information, please contact us through the various contact methods provided on the platform. In general, we will reply within 15 days.

          {"\n"}If any provision of this Privacy Statement is deemed invalid or unenforceable to any extent, the remaining provisions of this Privacy Statement shall not be affected and shall be enforced to the maximum extent permitted by law. In case of any inconsistency or conflict between this Privacy Statement and the user registration agreement of the platform, the provisions of this Privacy Statement shall prevail.
        </View>
      )}
    </ScrollView>
  )
}
