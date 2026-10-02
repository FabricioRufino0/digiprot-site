import assert from 'node:assert/strict'
import { access, readFile, readdir, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'

const KiB = 1024
for (const file of ['dist/index.html', 'dist/exemplos/index.html']) {
  const html = await readFile(file, 'utf8')
  const head = html.split('</head>')[0]
  const initial = new Set([...head.matchAll(/<(?:link|script)\b[^>]*>/g)]
    .map(([tag]) => tag.match(/(?:src|href)="(\/assets\/[^"?#]+\.js)"/)?.[1]).filter(Boolean))
  assert.ok(initial.size, `${file}: entry JavaScript missing`)
  let bytes = 0
  for (const asset of initial) bytes += gzipSync(await readFile('dist' + asset)).byteLength
  assert.ok(bytes < 160 * KiB, `${file}: initial JavaScript exceeds 160 KiB gzip (${bytes})`)
  for (const [, srcSet] of html.matchAll(/(?:srcSet|srcset|imageSrcSet|imagesrcset)="([^"]+)"/g)) {
    for (const candidate of srcSet.split(',')) await access('dist' + candidate.trim().split(' ')[0])
  }
  console.log(`${file}: initial JavaScript ${(bytes / KiB).toFixed(1)} KiB gzip; image variants exist`)
}
const assets = await readdir('dist/assets')
const jsSizes = await Promise.all(assets.filter(file => file.endsWith('.js')).map(async file => gzipSync(await readFile('dist/assets/' + file)).byteLength))
assert.ok(jsSizes.reduce((sum, size) => sum + size, 0) < 200 * KiB, 'Total JavaScript exceeds 200 KiB gzip')
const fonts = await Promise.all(assets.filter(file => file.endsWith('.woff2')).map(file => stat('dist/assets/' + file)))
assert.ok(fonts.reduce((sum, file) => sum + file.size, 0) < 65 * KiB, 'Fonts exceed 65 KiB')
assert.ok((await stat('dist/assets/identity/favicon.png')).size < 8 * KiB, 'Favicon exceeds 8 KiB')
assert.ok((await stat('dist/assets/identity/digiprot-logo.webp')).size < 30 * KiB, 'Display logo exceeds 30 KiB')
console.log('Asset budgets OK: both routes, JavaScript, fonts, logo, favicon and responsive captures.')
