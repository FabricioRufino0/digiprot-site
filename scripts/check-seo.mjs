import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
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
  const description = head.match(/<meta name="description" content="([^"]+)"/)?.[1]
  assert.ok(description.length >= 120 && description.length <= 160, `${file}: description must be 120–160 characters`)
  assert.ok(head.includes(`property="og:description" content="${description}"`), file)
  assert.ok(head.includes(`name="twitter:description" content="${description}"`), file)
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
  const page = graph['@graph'].find(entity => ['WebPage', 'CollectionPage'].includes(entity['@type']) && entity.url === origin + route)
  assert.ok(page, file)
  assert.equal(page.description, description, `${file}: JSON-LD description must match meta description`)
  const body = html.split('</head>')[1]
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:amp|nbsp|lt|gt|quot|#\d+);/g, ' ')
    .replace(/\s+/g, ' ')
  assert.ok(body.includes(description), `${file}: description must appear in visible page copy`)
  assert.match(html, route === '/' ? /<ul class="service-details">/ : /<ul class="concept-details">/, file)
  const wordCount = body.match(/[\p{L}\p{N}]+/gu)?.length ?? 0
  if (route === '/exemplos/') assert.ok(wordCount >= 300, `examples page should contain at least 300 words; found ${wordCount}`)
  const imageWidths = [...html.matchAll(/<img\b[^>]*\bwidth="(\d+)"/g)].map(match => Number(match[1]))
  assert.ok(imageWidths.every(width => width <= 300), `${file}: image width attributes should fit a phone viewport`)
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, file)
  assert.ok(html.includes(route === '/' ? 'Nandices Confeitaria' : 'Este estudo mostra como uma empresa de ar-condicionado'), 'Content must be present without JavaScript')
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
const notFound = await readFile('dist/404.html', 'utf8')
assert.match(notFound, /name="robots" content="noindex, follow"/)
assert.match(notFound, /<nav\b[\s\S]*?href="\/"[\s\S]*?href="\/exemplos\/"/, '404 should link to home and examples')
const headers = await readFile('dist/_headers', 'utf8')
for (const value of [
  'Strict-Transport-Security: max-age=31536000',
  'X-Frame-Options: DENY',
  'X-Content-Type-Options: nosniff',
  'Cross-Origin-Opener-Policy: same-origin',
  'Referrer-Policy: strict-origin-when-cross-origin',
  'Permissions-Policy: camera=(), microphone=(), geolocation=()',
]) assert.ok(headers.includes(value), `Missing response header: ${value}`)
const contentSecurityPolicy = headers.match(/^\s+Content-Security-Policy: (.+)$/m)?.[1]
assert.ok(contentSecurityPolicy?.includes("default-src 'self'"), 'CSP should default to same-origin resources')
assert.ok(contentSecurityPolicy?.includes("style-src 'self' 'unsafe-inline'"), 'CSP should allow the current inline critical CSS')
assert.ok(contentSecurityPolicy?.includes("frame-ancestors 'none'"), 'CSP should block framing')
const inlineBootstrap = (await readFile('dist/index.html', 'utf8')).match(/<script>([\s\S]*?)<\/script>/)?.[1]
assert.ok(inlineBootstrap, 'the early JavaScript bootstrap is present')
const bootstrapHash = createHash('sha256').update(inlineBootstrap).digest('base64')
const scriptPolicy = contentSecurityPolicy?.match(/(?:^|;)\s*script-src\s+([^;]+)/)?.[1] ?? ''
assert.ok(scriptPolicy.includes("'self'"), 'CSP should allow local scripts')
assert.ok(scriptPolicy.includes(`'sha256-${bootstrapHash}'`), 'CSP should allow the existing bootstrap')
assert.doesNotMatch(scriptPolicy, /'unsafe-inline'/, 'CSP must not allow arbitrary inline scripts')
const workerConfig = await readFile('wrangler.toml', 'utf8')
assert.match(workerConfig, /html_handling = "auto-trailing-slash"/)
assert.match(workerConfig, /not_found_handling = "404-page"/)
console.log('SEO OK: 2 páginas pré-renderizadas, canonical, metadados, JSON-LD, assets, robots, sitemap, llms e 404.')
