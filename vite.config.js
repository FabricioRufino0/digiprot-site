import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'

function liveStaticContent() {
  let server
  return {
    name: 'digiprot-static-content',
    apply: 'serve',
    configureServer(instance) { server = instance },
      transformIndexHtml: {
        order: 'pre',
        async handler(html, context) {
          const entry = context.path.startsWith('/exemplos') ? '/src/ExamplesPage.jsx' : '/src/App.jsx'
          const { default: App } = await server.ssrLoadModule(entry)
          return html.replace(/<!--app-start-->[\s\S]*<!--app-end-->/, `<!--app-start-->${renderToString(createElement(App))}<!--app-end-->`)
        },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), liveStaticContent()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { rollupOptions: { input: { main: fileURLToPath(new URL('./index.html', import.meta.url)), examples: fileURLToPath(new URL('./exemplos/index.html', import.meta.url)) } } },
  server: { port: 5173, strictPort: true },
})
