import path from 'path'
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    eslint({
      include: ['**/*.ts']
    })
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    lib: {
      name: 'GG',
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    minify: false
  }
})
