import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'

const origin = 'https://digiprot.com.br'
const routes = [['/', 'dist/index.html'], ['/exemplos/', 'dist/exemplos/index.html']]
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
assert.match(sitemap, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/)
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), routes.map(([route]) => origin + route))
for (const [route, file] of routes) {
  const html = await readFile(file, 'utf8')
  const head = html.split('</head>')[0]
  assert.match(html, /<html lang="pt-BR">/)
  assert.equal([...head.matchAll(/rel="canonical"/g)].length, 1)
  assert.ok(head.includes(`rel="canonical" href="${origin + route}"`), file)
  assert.ok(head.includes(`property="og:url" content="${origin + route}"`), file)
  assert.match(head, /name="description" content="[^"]+"/)
  assert.match(head, /property="og:image" content="https:\/\/digiprot\.com\.br\/assets\/[^"]+"/)
  assert.match(head, /name="twitter:card" content="summary"/)
  assert.match(head, /rel="describedby" href="\/llms.txt"/)
  const markdown = head.match(/rel="alternate" href="([^"]+)" type="text\/markdown"/)
  assert.ok(markdown, file)
  await access('dist' + markdown[1])
  assert.match(head, /name="robots" content="index, follow, max-image-preview:large"/)
  const structured = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert.equal(structured.length, 1, file)
  const graph = JSON.parse(structured[0][1])
  assert.equal(graph['@context'], 'https://schema.org')
  assert.ok(graph['@graph'].some(entity => entity.url === origin + route))
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, file)
  assert.ok(html.includes(route === '/' ? 'Nandices Confeitaria' : 'Estudos de interface'), 'Content must be present without JavaScript')
  assert.ok(!html.includes('/node_modules/'), 'Build must resolve font URLs')
  assert.ok(!html.includes('/src/'), 'Build must resolve entry URLs')
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) await access('dist' + match[1])
}
const robots = await readFile('dist/robots.txt', 'utf8')
assert.equal(robots, await readFile('robots.txt', 'utf8'))
assert.match(robots, /Sitemap: https:\/\/digiprot\.com\.br\/sitemap\.xml/)
assert.ok(!robots.includes('Disallow: /'))
const llms = await readFile('dist/llms.txt', 'utf8')
assert.match(llms, /^# DIGIPROT\r?\n/)
assert.ok(llms.includes(origin + '/exemplos/'))
assert.match(llms, /não projetos entregues/)
for (const match of llms.matchAll(/\]\(https:\/\/digiprot\.com\.br([^)]*\.md)\)/g)) await access('dist' + match[1])
assert.match(await readFile('dist/404.html', 'utf8'), /name="robots" content="noindex, follow"/)
console.log('SEO OK: 2 páginas pré-renderizadas, canonical, metadados, JSON-LD, assets, robots, sitemap, llms e 404.')
