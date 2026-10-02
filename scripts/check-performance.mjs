import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'

const html = await readFile('dist/index.html', 'utf8')
const headers = await readFile('dist/_headers', 'utf8')
const patterns = headers.split(/\r?\n/).filter(line => line && !/^[\s#]/.test(line))
assert.equal(new Set(patterns).size, patterns.length, 'Headers de cache duplicados')
for (const asset of await readdir('dist/assets', { recursive: true })) {
  if (/\.(js|css|woff2)$/.test(asset)) assert.match(asset, /^[^/\\]+-[\w-]{8}\.(js|css|woff2)$/, 'Cache immutable exige arquivo versionado pelo conteúdo')
}
const css = [...html.matchAll(/<style data-inline-css>([\s\S]*?)<\/style>/g)].map(match => match[1]).join('')
assert.ok(css, 'A principal deve entregar o CSS no HTML inicial')
assert.ok(Buffer.byteLength(css) <= 48 * 1024, 'CSS inicial excedeu o limite de 48 KiB')
assert.ok(!/<link\b[^>]*rel="stylesheet"/.test(html), 'CSS externo voltou a bloquear a primeira pintura')
const scripts = new Set([
  ...[...html.matchAll(/<script[^>]*src="(\/assets\/[^"?#]+\.js)"/g)].map(match => match[1]),
  ...[...html.matchAll(/<link[^>]*rel="modulepreload"[^>]*href="(\/assets\/[^"?#]+\.js)"/g)].map(match => match[1]),
])
assert.ok(scripts.size > 0)
let bytes = 0
for (const asset of scripts) {
  assert.ok(!asset.includes('motion-features'), 'Recursos avançados de Motion devem permanecer assíncronos')
  bytes += gzipSync(await readFile('dist' + asset)).length
}
assert.ok(bytes <= 160 * 1024, `JavaScript inicial excedeu 160 KiB gzip: ${bytes} bytes`)
assert.match(html, /srcSet="[^"<>]+desktop-480\.webp/)
assert.match(html, /fetchPriority="high"/)
if (process.argv[2]) {
  const report = JSON.parse(await readFile(process.argv[2], 'utf8'))
  assert.equal(report.configSettings.formFactor, 'mobile', 'Use o perfil móvel do Lighthouse para este orçamento')
  assert.ok(report.audits['largest-contentful-paint'].numericValue <= 3000, 'LCP excedeu o orçamento de 3 s')
  assert.ok(report.audits['total-blocking-time'].numericValue <= 100, 'TBT excedeu 100 ms')
  assert.ok(report.audits['cumulative-layout-shift'].numericValue <= 0.1, 'CLS excedeu 0,1')
}
console.log(`Performance OK: CSS ${(Buffer.byteLength(css) / 1024).toFixed(1)} KiB inline; JS inicial ${(bytes / 1024).toFixed(1)} KiB gzip; imagens responsivas e prioridade do hero preservadas.`)
