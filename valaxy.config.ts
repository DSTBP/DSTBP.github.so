/*
 * @Description: 
 * @Author: DSTBP
 * @Date: 2024-08-21 00:35:40
 * @LastEditTime: 2024-08-28 14:26:42
 * @LastEditors: DSTBP
 */
import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'


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
      url: 'https://www.dstbp.com/images/background/bg_light.jpg',      // 日间
      dark: 'https://www.dstbp.com/images/background/bg_dark.jpg',      // 夜间
      opacity: 0.8,                                                     // 透明度
    },

    /**
     * 自定义页面
     */
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

  // 确保指定的图标类不会被 Unocss 优化掉
  unocss: {
    safelist,
  },
})