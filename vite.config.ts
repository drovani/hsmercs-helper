/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@atomic', replacement: '/src/components/atomic' },
      { find: '@filters', replacement: '/src/components/filters' },
      { find: '@mercs', replacement: '/src/components/mercs' },
      { find: '@', replacement: '/src' }
    ]
  },
  test: {
    environment: 'happy-dom',
  },
})
