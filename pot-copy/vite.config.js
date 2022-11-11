import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
	extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
    css:{
	  preprocessorOptions:{
		  scss:{
			  additionalData:'@import "./src/element-variables.scss";' //引入scss文件
		  }
	  }
  }
  }
})
