<script lang="ts" setup>
import { useScriptTag } from '@vueuse/core'
import YunFooter from 'valaxy-theme-yun/components/YunFooter.vue'

useScriptTag('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
</script>

<template>
    <YunFooter>
        <!-- 自定义页脚内容 -->
        <VCLiveTime start-time="2023-12-21">
            <template #live-time-before>
                <span>本站已运行</span>
            </template>
            <template #live-time-after>
                <span></span>       <!-- 后缀 -->
            </template>
        </VCLiveTime>
        <div>本站总访问量 <span id="busuanzi_value_site_pv"></span> 次 | 本站访客数 <span id="busuanzi_value_site_uv"></span> 人次</div>
    </YunFooter>
</template>