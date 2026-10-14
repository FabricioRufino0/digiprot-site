# DIGIPROT

Site de apresentação da DIGIPROT em React, Vite e Tailwind CSS 4. O redesign usa a direção escura e cinematográfica aprovada, com logo original, prévias reais e um anel de foco SVG autoral.

## Abrir localmente

Requer Node.js 22.12 ou superior. Na pasta do projeto:

```powershell
npm install
npm run dev
```

Abra http://127.0.0.1:5173/. Os estudos conceituais ficam em http://127.0.0.1:5173/exemplos/. O servidor usa porta fixa para evitar abrir outra página por engano. Se ela estiver ocupada, encerre o servidor anterior deste projeto.

## Build

```powershell
npm run build
npm run preview -- --port 5174
```

O build estático fica em `dist/`. As páginas principal e `/exemplos/` são pré-renderizadas em HTML. React acrescenta as interações por hidratação. No desenvolvimento, o Vite atualiza esse HTML a cada carregamento.

## Conteúdo e estrutura

- `src/components/`: cabeçalho, hero, clientes, comparação responsiva, conceitos, serviços e rodapé.
- `src/ExamplesPage.jsx`: página independente para os estudos conceituais, em `/exemplos/`.
- `src/data/`: dois projetos reais, oito estudos conceituais e contatos existentes.
- `src/styles/`: tokens e composição responsiva.
- `src/components/ui/`: abas, diálogo, botões e seleção de formatos com shadcn/Base UI.
- `public/assets/`: PNG original do logo, anel SVG, capturas e fotos WebP locais.
- `scripts/prerender.mjs`: HTML para o build estático.
- `docs/home-performance-review.md` e `docs/seo-performance-audit.md`: medições, verificações e limites da entrega.
- Os antigos `styles.css`, `script.js` e assets de hero permanecem como referência de migração e não são importados pela página nova.

## Movimento e acessibilidade

Os oito estudos ficam exclusivamente em `/exemplos/`, com filtros por segmento e prévias navegáveis em computador e celular. Motion anima a reorganização da galeria e a mudança de formato; shadcn/Base UI cuida do diálogo, do foco e dos filtros. As fotos são locais. A home mantém clientes e serviços.

GSAP coordena a montagem inicial dos dispositivos, seguida de flutuação enquanto a cena está visível. A sequência termina ao sair da área ou ocultar a aba; a flutuação pausa nessas situações e pelo controle manual. Em desktop com altura suficiente, a rolagem aproxima o notebook e o celular. `prefers-reduced-motion` mantém os dispositivos no estado final. Motion faz a transição entre formatos e a troca das prévias; cada elemento tem um controlador.

Na principal, os recursos avançados de Motion carregam quando as prévias se aproximam da tela ou recebem foco. A barra de progresso usa CSS com fallback GSAP. O build inclui o CSS da principal no HTML enquanto ele estiver dentro do orçamento de 48 KiB. Os arquivos JS, CSS e fontes com hash recebem cache longo em hospedagens que aplicam `_headers`.

Depois do build, rode `npm run check:performance`. Um relatório Lighthouse móvel pode ser validado com `npm run check:performance -- caminho/relatorio.json`. Os resultados e limites desta revisão estão em `docs/home-performance-review.md`.

Há rolagem nativa, foco visível, link para pular ao conteúdo, menu móvel nativo e abas operáveis com teclado. Sem JavaScript, a página principal mantém os dois clientes visíveis, e `/exemplos/` mostra as oito composições e suas descrições. Contato comercial e suporte técnico permanecem separados.

## Antes de publicar

Inclua a avaliação de cookies, dados pessoais e fornecedores antes de publicar e repita no domínio real. Mudanças em analytics, pixels, formulários, conteúdo incorporado ou hospedagem exigem nova avaliação. A existência do site, por si só, não determina a necessidade de banner.

O domínio canônico está configurado como `https://digiprot.com.br/`. O build inclui canonical por página, Open Graph, Twitter Cards, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt` e versões Markdown das duas páginas. Rode `npm run build` e `npm run check:seo` antes de publicar.

O Worker redireciona permanentemente `www.digiprot.com.br` para `https://digiprot.com.br`, preservando o caminho e os parâmetros da URL.

`wrangler.toml` configura o Worker para servir `dist/`, manter barra final em páginas de diretório e exibir `dist/404.html` para URLs inexistentes.

O domínio de produção usa o Worker `digiprot-site`, conectado à branch `main` deste repositório pelo Cloudflare Workers Builds. A configuração de produção é:

- Diretório de assets: `./dist`, configurado em `wrangler.toml`.
- Build: `npm run build`.
- Deploy: `npx wrangler@4.147.0 deploy --config wrangler.toml`.

O deploy publica o conteúdo de `dist/`, incluindo `/exemplos/`, `_redirects`, `_headers` e `404.html`. A configuração explícita evita a autodetecção do Wrangler, que falha ao analisar este `vite.config.js`. Consulte `docs/seo-performance-audit.md` para as verificações após publicação.

Um push para `main` dispara a publicação automática. Confirme o sucesso no Cloudflare e confira o domínio; um push aceito pelo GitHub não garante que o deploy tenha terminado.

## Estado verificado em 2026-10-12

A ação principal da home é “Explorar exemplos”. A galeria mantém oito marcas fictícias, agora com composições e conteúdo próprios: títulos, serviços, apresentação e destaques de cada negócio. Navegação e rodapé usam a âncora `#colecao`. Os textos gerais e as versões Markdown foram revisados; pequenas chamadas decorativas acima dos títulos foram removidas por preferência do usuário.

A rodada corrigiu o cabeçalho e as colunas de serviços das prévias de computador em telas pequenas. `npm run build`, `npm run check:seo`, `npm run check:performance` e `git diff --check` passaram. A home entrega 30,5 KiB de CSS inicial e 144,9 KiB de JavaScript inicial gzip.

As duas páginas foram conferidas entre 320 e 1440px. Passaram 48 combinações dos oito exemplos com movimento reduzido, além dos filtros, teclado, retorno de foco, navegação interna, menu móvel, abas de clientes e conteúdo sem JavaScript. Não foram observados erros JavaScript ou falhas de requisição nos testes locais. Resultados, ambiente e limites em [docs/site-review-2026-10-12.md](docs/site-review-2026-10-12.md), com [dados das prévias e interações](docs/site-review-2026-10-12.json).

### Cookies e privacidade

O build local não criou cookies nem entradas em `localStorage` ou `sessionStorage` nas visitas testadas. Na versão publicada inspecionada nesta sessão, o Cloudflare injeta seu Web Analytics, que [não usa armazenamento no navegador](https://developers.cloudflare.com/speed/observatory/rum-beacon/). Não foram observados cookies nessas visitas ao domínio. A avaliação atual mantém o site sem banner de consentimento; deve ser refeita quando os recursos mudarem.

Não presumir que ausência de cookies significa ausência de tratamento de dados. Uma política de privacidade pública que explique hospedagem, medição e contato por WhatsApp continua pendente. O Segundo Cérebro contém o procedimento “Cookies e Privacidade em Sites”, obrigatório no planejamento, antes/depois da publicação e ao mudar integrações.

A branch desta revisão é `codex/digiprot-cinematic`. O deploy automático documentado depende de `main`; esta validação local não confirma uma nova publicação. Não houve novo Lighthouse nem medição de campo nesta rodada.

## Histórico: estado verificado em 2026-10-11

A home apresenta os dois clientes reais, serviços e contato, sem a galeria conceitual. Foram ajustados tipografia, espaçamento, botões, enquadramento do hero, fundos dos projetos e animações do contato e rodapé. Os estudos foram concentrados em `/exemplos/` para dar espaço às prévias e manter a principal focada nos trabalhos entregues.

A página de exemplos contém oito marcas fictícias: BRASA (restaurante), vértice (arquitetura), VELO. (bicicletas), aura (estética), mimo (confeitaria), LINHA (barbearia), brisa (climatização) e soma (contabilidade). Oferece filtros, diálogo com prévia navegável, formatos computador/celular e contato com mensagem específica do modelo. Nenhum estudo representa um cliente ou resultado comercial real.

Verificações realizadas nesta revisão:

- `npm run build`, `npm run check:seo`, `npm run check:performance` e `git diff --check`: aprovados.
- Orçamento da home: CSS inline de 30,4 KiB e JavaScript inicial de 144,9 KiB gzip, dentro dos limites de 48 e 160 KiB.
- Build em navegador: oito diálogos abrem e fecham; seleção de celular e filtro Comércio funcionam; nenhuma rolagem horizontal em 320, 390, 768 e 1440 px; nenhum erro JavaScript observado.
- Na revisão da galeria também foram conferidos Escape e retorno de foco, navegação interna, movimento reduzido e os oito modelos disponíveis sem JavaScript.

O pacote não tem scripts de lint nem uma suíte unitária separada. Esta revisão não repete Lighthouse nem mede Core Web Vitals de campo; os relatórios anteriores permanecem históricos.

As sete fotografias da galeria são do Unsplash, armazenadas em `public/assets/concepts/photos/`, sob a [licença Unsplash](https://unsplash.com/license). Contabilidade usa ilustração composta na interface. Referências de direção visual: [Watermelon](https://ui.watermelon.sh/), [21st](https://21st.dev/community/templates/free), [Kedhareswer](https://21st.dev/@kedhareswer) e [Skiper UI](https://skiper-ui.com/components?source=free).
