import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'
import { ViteAliases } from 'vite-aliases'
import macrosPlugin from 'vite-plugin-babel-macros'

export default defineConfig({
  esbuild: {
    jsxInject: `
      import React from 'react';
    `
  },
  plugins: [
    reactRefresh(),
    macrosPlugin(),
    ViteAliases({
      useConfig: true,
      useTypescript: true,
      useRelativePaths: true,
      deep: true,
      depth: 2,
      adjustDuplicates: true
    })
  ],
  define: {
    'process.env': {}
  }
})
