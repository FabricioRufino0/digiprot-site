import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const target = process.argv[2]
const entry = process.argv[3] ?? '/src/App.jsx'
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } })
try {
  const { default: App } = await server.ssrLoadModule(entry)
  let html = await readFile(target, 'utf8')
  const markup = renderToString(createElement(App))
  html = html.replace(/<!--app-start-->[\s\S]*<!--app-end-->/, `<!--app-start-->${markup}<!--app-end-->`)
  if (entry === '/src/App.jsx') {
    const stylesheets = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/[^"?#]+\.css)"[^>]*>/g)]
    for (const [link, href] of stylesheets) {
      const css = await readFile(resolve(dirname(target), '.' + href), 'utf8')
      if (Buffer.byteLength(css) <= 48 * 1024) html = html.replace(link, () => `<style data-inline-css>${css.replace(/<\/style/gi, '<\\/style')}</style>`)
    }
  }
  await writeFile(target, html)
  console.log(`HTML pré-renderizado: ${target}`)
} finally { await server.close() }
