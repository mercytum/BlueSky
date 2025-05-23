import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import istanbul from 'vite-plugin-istanbul'

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/**/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.ts', '.tsx'],
      cypress: true,
      requireEnv: true,
    }),
  ],
})
