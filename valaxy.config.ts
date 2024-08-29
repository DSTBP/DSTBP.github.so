import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline'

const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  /**
   * 基础配置
   */
  theme: 'yun',               // 主题名

  themeConfig: {

    banner: {
      enable: true,
      title: '微澜尘寰的雾岛',
      cloud: {
        enable: true,     // 首页下方的动态云
      },
    },

    // 主题配色
    colors: {
      primary: '#0078E7'
    },

    // background
    bg_image: {
      enable: true,
      url: 'https://www.dstbp.com/images/background/bg_light.webp',      // 日间
      dark: 'https://www.dstbp.com/images/background/bg_dark.webp',      // 夜间
      opacity: 0.7,                                                     // 透明度
    },

    /**
     * 自定义页面
     */
    pages: [
      {
        name: '友链',
        url: '/links/',
        icon: 'i-ri-user-add-line',
        color: 'dodgerblue',
      },
      {
        name: '赞助老板',
        url: '/sponsor/',
        icon: 'i-ri-user-heart-line',
        color: 'hotpink',
      },
    ],

    /**
     * 点击时的烟花效果
     */
    fireworks: {
      enable: true,
      colors: ['#66A7DD', '#3E83E1', '#8DEEEE'],
    },

    /**
     * 页脚
     */
    footer: {
      since: 2022,
      powered: true,
      beian: {
        enable: true,
        icp: '萌ICP备12238132号',
      },
    },

    /**
     * 说点什么
     */
    say: {
      enable: true,
      api: '',
      hitokoto: {
        enable: true,
        api: 'https://v1.hitokoto.cn/?c=j&c=k&c=d&c=i&encode=json',
      }
    },
  },

  // 设置 valaxy-addon-waline 配置项
  addons: [
    addonWaline({
      // Waline 配置项，参考 https://waline.js.org/reference/client/props.html
      serverURL: 'https://dstbp-waline.vercel.app/',
      comment: true,
    }),
  ],

  // 确保指定的图标类不会被 Unocss 优化掉
  unocss: {
    safelist,
  },
})