import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '狂且狡童的鲸岛',
      cloud: {
        enable: true,
      },
    },

    bg_image: {
      enable: true,
      url: 'https://www.dstbp.com/images/background/bg_light.jpg',     // 日间
      dark: 'https://www.dstbp.com/images/background/bg_dark.jpg',    // 夜间
      opacity: 0.8,                                                   // 透明度
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '喜欢的女孩子',
        url: '/girls/',
        icon: 'i-ri-women-line',
        color: 'hotpink',
      },
    ],

    fireworks: {
      enable: true,
      /**
       * 烟花颜色
       * 默认 ['#66A7DD', '#3E83E1', '#214EC2']
       */
      colors: ['#66A7DD', '#3E83E1', '#8DEEEE'],
    },

    footer: {
      since: 2021,
      beian: {
        enable: true,
        icp: '川ICP备12238132号',
      },
    },
  },

  unocss: { safelist },
})
