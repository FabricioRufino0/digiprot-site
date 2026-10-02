# Auditoria de SEO e performance

Data: 2 de outubro de 2026. Domínio confirmado pelo proprietário: https://digiprot.com.br/.

## Correções locais

- Canonical absoluto distinto para `/` e `/exemplos/`, publicado no HTML inicial.
- Título da página principal descreve o serviço de criação de sites. H1 e identidade visual mantidos.
- Open Graph e Twitter Cards com URL, título, descrição e logo real. Dimensões do PNG de compartilhamento: 2172 × 724.
- JSON-LD de Organization, WebSite, WebPage e Service na principal; CollectionPage nos exemplos. Contatos correspondem aos links existentes. Não foram acrescentados endereço, avaliações, preços ou resultados não confirmados.
- Hierarquia dos exemplos corrigida de H1 → H3 para H1 → H2, inclusive na galeria sem JavaScript, mantendo o tamanho visual.
- `robots.txt` permite rastreamento público e declara o sitemap. As versões em `public/` e na raiz são verificadas para evitar divergência.
- `sitemap.xml` contém as duas páginas HTML canônicas. Sem fragmentos, assets, clientes externos ou datas de alteração inventadas.
- `llms.txt` inclui contexto, páginas, clientes reais, contato e a distinção entre projetos entregues e estudos conceituais.
- `/index.md` e `/exemplos/index.md` oferecem versões textuais; links `alternate` e `describedby` permitem descobri-las. Atualizar essas versões quando os serviços ou exemplos mudarem.
- `_redirects` prepara 301 para `/index.html`, `/exemplos/index.html`, `/exemplos` e `/llm.txt`. O nome convencional é **llms.txt**; o singular funciona como alias em hospedagens compatíveis.
- `_headers` define MIME e UTF-8 dos arquivos de rastreamento e Markdown. As cópias Markdown recebem `X-Robots-Tag: noindex`, preservando o HTML como resultado de busca.
- `404.html` tem mensagem, retorno à principal e `noindex`. Impede fallback indiscriminado para a principal em Cloudflare Pages.
- Fontes locais usadas acima da dobra recebem preload. O Vite converte os caminhos de origem para arquivos com hash no build.
- Logo usado na interface e favicon agora reutilizam o WebP de 600 × 200 já existente: 23.208 bytes em vez de 295.614 bytes, redução de 92%. O PNG original permanece disponível para compartilhamento e referência.

## Verificação

`npm run build` e `npm run check:seo` passaram. O segundo comando verifica as páginas pré-renderizadas, canonical, metadados, JSON-LD parseável, H1 único, assets, Markdown, robots, sitemap e 404. O XML também foi carregado por um parser XML.

Playwright: páginas em 320, 390 e 1440 px, sem overflow horizontal, imagens quebradas ou erros de execução. Menu, controles do carrossel e acordeão de serviços operados. Conteúdo das duas páginas disponível com JavaScript desativado. Links locais apontam para seções existentes.

Regras de hospedagem verificadas com **Wrangler Pages local**, sem publicação:

| Endereço | Resposta |
| --- | --- |
| `/`, `/exemplos/` | 200, HTML |
| `/robots.txt`, `/llms.txt` | 200, text/plain UTF-8 |
| `/sitemap.xml` | 200, application/xml UTF-8 |
| `/index.md`, `/exemplos/index.md` | 200, text/markdown UTF-8, noindex |
| `/llm.txt` | 301 para `/llms.txt` |
| `/index.html` | 301 para `/` |
| `/exemplos`, `/exemplos/index.html` | 301 para `/exemplos/` |
| URL inexistente | 404 com a página de erro |

Wrangler aceitou quatro regras de redirecionamento e seis regras de headers. Vite Preview não interpreta `_headers` ou `_redirects`; por isso esses comportamentos foram verificados separadamente.

## Performance móvel

Lighthouse 13.5.0 em Chrome headless, build de produção servido por Vite Preview. Perfil móvel e rede/CPU simulados pelo Lighthouse, cache limpo. São resultados de laboratório, não dados de usuários reais.

| Métrica | Principal inicial | Principal final¹ | Exemplos inicial | Exemplos final |
| --- | ---: | ---: | ---: | ---: |
| Performance | 85 | 89 | 83 | 95 |
| SEO | 100 | 100 | 100 | 100 |
| Acessibilidade | 100 | 100 | 98 | 100 |
| Boas práticas | 100 | 100 | 100 | 100 |
| FCP | 2,41 s | 1,81 s | 2,26 s | 1,81 s |
| LCP | 3,93 s | 3,62 s | 4,29 s | 2,72 s |
| TBT | 30,5 ms | 38,5–48 ms | 4 ms | 3 ms |
| CLS | 0,000009 | 0 | 0,0168 | 0 |
| Dados transferidos | 779.178 bytes | 507.316 bytes | 621.779 bytes | 349.822 bytes |

¹ Duas execuções finais da principal: performance 89 em ambas, LCP 3,625 e 3,621 s. Exemplos e baselines tiveram uma execução. Os resultados são exploratórios; houve trabalho simultâneo no frontend, portanto não constituem um teste A/B isolado de cada alteração. A redução de bytes do logo é verificável diretamente pelos arquivos. Os tamanhos transferidos caíram aproximadamente 35% na principal e 44% nos exemplos. TBT da principal não melhorou; não se afirma ganho de interação.

Resultados por execução e condições em `docs/seo-performance-results.json`. Relatórios completos locais em `tmp/seo-*.json` (ignorados pelo Git). Comando usado, alterando URL e destino:

```powershell
npx --yes lighthouse http://127.0.0.1:5181/ --chrome-path="C:\Program Files\Google\Chrome\Application\chrome.exe" --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=tmp/seo-audit.json --quiet
```

## Gargalos restantes

- **LCP ainda acima da meta de 2,5 s** nas duas páginas. Evitar tratar performance como concluída ou perfeita.
- Capturas desktop de 1440 × 960 são baixadas mesmo quando aparecem em aproximadamente 372 × 248 no celular. O Lighthouse estimou cerca de 162 KiB de economia nas capturas dos clientes. Próxima otimização: variantes responsivas com `srcset` e `sizes`, preservando as capturas originais.
- JavaScript inicial da principal: aproximadamente 184 KB gzip; chunk compartilhado com React, Motion e GSAP: 161 KB gzip. A medição inicial estimou 82 KiB não usados durante a carga. Esse número não significa código dispensável: parte sustenta interações e animações após rolagem. Uma divisão adicional deve ser medida e verificada para preservar o site.
- CSS global: aproximadamente 8,6 KB gzip. Lighthouse apontou bloqueio de renderização. Não foi aplicado carregamento assíncrono indiscriminado, que pode gerar conteúdo sem estilo e deslocamento visual.
- Fontes locais somam aproximadamente 60 KB. Preload reduziu a demora da primeira pintura nas amostras, mas não resolveu sozinho o LCP.
- Não há dados de campo de INP nesta auditoria. TBT não substitui INP. Confirmar p75 de LCP, INP e CLS via Search Console/CrUX quando houver dados suficientes; o site não recebeu novos rastreadores.

## Site publicado e publicação pendente

No momento da auditoria, `https://digiprot.com.br/` ainda servia a versão anterior, com título “DIGIPROT | Presença digital para pequenos negócios”. Ela respondeu 200; HTTP encaminhou para HTTPS. `/exemplos/`, `/sitemap.xml` e `/llms.txt` responderam 404. O robots publicado tinha apenas Allow. `https://www.digiprot.com.br/` respondeu 200 sem encaminhar ao domínio oficial. `/index.html` usava redirecionamento temporário 307.

Uma medição exploratória da versão publicada resultou em performance 83, acessibilidade 96, boas práticas 100, SEO 100, FCP 2,63 s, LCP 3,77 s, TBT 0 e CLS 0. Código, hospedagem e rede são diferentes da prévia local; não comparar esses números como antes/depois da mesma versão.

As alterações deste trabalho estão **locais**. Antes de considerar o domínio corrigido:

1. Publicar o conteúdo completo de `dist/`, com o build da nova página `/exemplos/`.
2. Confirmar que a hospedagem aplica `_redirects`, `_headers` e 404. As regras foram verificadas no runtime de Cloudflare Pages. Em outra plataforma, configurar os equivalentes.
3. Configurar **301 de www para https://digiprot.com.br**, preservando caminho e query, na hospedagem/CDN. Canonical é um sinal e não executa esse redirecionamento. Cloudflare Pages não aceita redirect de domínio em `_redirects`; usar regra de domínio ou Bulk Redirects. Não houve alteração da conta externa nesta tarefa.
4. Em domínios de preview publicados, usar proteção ou `X-Robots-Tag: noindex`. Não bloquear CSS, JS ou imagens essenciais no robots da produção.
5. Repetir os checks HTTP no domínio real: MIME correto, 200 dos arquivos e das páginas, 301 dos aliases, 404 de URL inexistente, canonical e compartilhamento absolutos.
6. Enviar `https://digiprot.com.br/sitemap.xml` no Search Console e inspecionar as duas URLs. Inclusão em sitemap não garante indexação ou posição.
7. Confirmar os cards em WhatsApp/redes sociais; o logo original foi preservado e a plataforma pode recortar a imagem conforme seu card.

## Fontes oficiais

- [Google: canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: construção de sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: recursos de IA e sites](https://developers.google.com/search/docs/appearance/ai-features). Os fundamentos de SEO continuam aplicáveis; não é necessário arquivo especial para aparecer nesses recursos.
- [Proposta llms.txt](https://llmstxt.org/). É orientação opcional para agentes, com referências textuais; não controla permissões de rastreamento nem garante presença em respostas de IA.
- [Cloudflare: redirects](https://developers.cloudflare.com/pages/configuration/redirects/), [headers](https://developers.cloudflare.com/pages/configuration/headers/) e [404](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## antislop: gate do escopo alterado

- **Hard Gate PASS:** conteúdo e contatos vieram do site; exemplos identificados como conceituais; nenhuma métrica de negócio, avaliação ou depoimento foi criado. Lighthouse final: acessibilidade 100 nas duas páginas; browser sem overflow ou erros.
- **Purpose Gate PASS:** metadados descrevem serviço e páginas reais; Markdown fornece leitura textual; a página de erro usa fonte de sistema para funcionar sem dependências; nenhum novo asset visual foi gerado.
- **Liveliness PASS:** o layout e as animações aprovados foram preservados. Esta tarefa não redesenhou a apresentação; ajustou semântica, SEO e entrega do logo existente.
- **Craftsmanship PASS:** build e verificador executados; menu, carrossel e serviços operados; HTML funciona sem JavaScript; aliases, MIME e 404 verificados no runtime local de hospedagem.
