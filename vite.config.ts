import istanbul from 'vite-plugin-istanbul'

export default {
  plugins: [
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue', '.svelte'],
      cypress: true,
      requireEnv: false,
    }),
  ],
}
