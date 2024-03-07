import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Insepct from 'vite-plugin-inspect'

// 引入Node的path模块
const path =require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),Insepct()],
})
