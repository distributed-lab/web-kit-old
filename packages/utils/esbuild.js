#!/usr/bin/env node

const esbuild = require('esbuild')
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin')
const stdLibBrowser = require('node-stdlib-browser')

;(async () => {
  await esbuild.build({
    entryPoints: ['src/browser.ts'],
    bundle: true,
    minify: true,
    sourcemap: 'external',
    outfile: 'lib/json-api-client.min.js',
    inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
    define: {
      global: 'global',
      process: 'process',
      Buffer: 'Buffer',
    },
    plugins: [plugin(stdLibBrowser)],
  })
})()
