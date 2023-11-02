import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import zipPack from 'vite-plugin-zip-pack'

export default defineConfig({
  plugins: [
    solid(),
    zipPack({
      inDir: 'dist/devicePayload',
      outDir: 'dist',
      outFileName: 'devicePayload.zip'
    })]
})