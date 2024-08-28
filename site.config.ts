import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://www.dstbp.cn',
  lang: 'zh-CN',
  title: '微澜尘寰 の Blog',                                                  // 网站标题、网站标签栏标题
  subtitle: '',                                                              // 副标题
  description: '你恳求世界不要打扰你的独处，在夜幕降临的时候却又非常孤独。',      // 描述
  favicon: 'https://www.dstbp.com/favicon.svg',                              // 站点图标
  author: {
      avatar: 'https://www.dstbp.com/images/author/logo.jpg',                // 头像
      name: 'r0xanne',                                                       // 头像下方名
      status: {
          emoji: '👩‍💻',                                                       // 当前状态
      },
  },
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'QQ 2090674202',
      link: 'https://qm.qq.com/q/d9WyblloVa',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/DSTBP',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    // {
    //   name: '微博',
    //   link: 'https://weibo.com/jizhideyunyoujun',
    //   icon: 'i-ri-weibo-line',
    //   color: '#E6162D',
    // },
    // {
    //   name: '豆瓣',
    //   link: 'https://www.douban.com/people/yunyoujun/',
    //   icon: 'i-ri-douban-line',
    //   color: '#007722',
    // },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=490393660',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    // {
    //   name: '知乎',
    //   link: 'https://www.zhihu.com/people/yunyoujun/',
    //   icon: 'i-ri-zhihu-line',
    //   color: '#0084FF',
    // },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/381751905',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: '微信公众号',
      link: 'https://www.dstbp.com/images/author/Official_Accounts.jpg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },
    {
      name: 'Twitter',
      link: 'https://x.com/WangTaddeo',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/r0_xanne',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=KBoYERgeHxwaGBpoWVkGS0dF',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    // {
    //   name: 'Travelling',
    //   link: 'https://www.travellings.cn/go.html',
    //   icon: 'i-ri-train-line',
    //   color: 'var(--va-c-text)',
    // },
  ],

  search: {
    enable: true,
    type: 'fuse',
  },

  sponsor: {
    enable: true,
    // title: '我很可爱，请给我钱！',
    description: '赏杯汽水喝呗！',
    methods: [
      {
        name: '支付宝',
        url: 'https://www.dstbp.com/images/donate/zfb.jpg',
        color: '#00A3EE',
        icon: 'i-ri-alipay-line',
      },
      // {
      //   name: 'QQ 支付',
      //   url: 'https://cdn.yunyoujun.cn/img/donate/qqpay-qrcode.png',
      //   color: '#12B7F5',
      //   icon: 'i-ri-qq-line',
      // },
      {
        name: '微信支付',
        url: 'https://www.dstbp.com/images/donate/vx.jpg',
        color: '#2DC100',
        icon: 'i-ri-wechat-pay-line',
      },
    ],
  },

  /**
   * 开启阅读统计
   */
  statistics: {
    enable: true,
        readTime: {
          speed: {
            cn: 300,
            en: 200,
        },
    },
  },

  codeHeightLimit: 500,

  /**
   * 文章 Frontmatter
   */
  frontmatter: {
    time_warning: true,         // 显示阅读时间提醒
    // password: "123123"        // 内容加密的密码
  },

  mediumZoom: { enable: true },  // 图片预览

  /*
   * 懒加载
   */
  vanillaLazyload: {
    enable: true,
  }
})
