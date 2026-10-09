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
- `src/data/`: dois projetos reais, quatro estudos conceituais e contatos existentes.
- `src/styles/`: tokens e composição responsiva.
- `src/components/ui/tabs.jsx`: primitivo shadcn/Base UI adaptado à identidade DIGIPROT.
- `public/assets/`: PNG original do logo, anel SVG e capturas WebP.
- `scripts/prerender.mjs`: HTML para o build estático.
- `docs/home-performance-review.md` e `docs/seo-performance-audit.md`: medições, verificações e limites da entrega.
- Os antigos `styles.css`, `script.js` e assets de hero permanecem como referência de migração e não são importados pela página nova.

## Movimento e acessibilidade

GSAP coordena a montagem inicial dos dispositivos, seguida de flutuação enquanto a cena está visível. A sequência termina ao sair da área ou ocultar a aba; a flutuação pausa nessas situações e pelo controle manual. Em desktop com altura suficiente, a rolagem aproxima o notebook e o celular. `prefers-reduced-motion` mantém os dispositivos no estado final. Motion faz a transição entre formatos e a troca das prévias; cada elemento tem um controlador.

Na principal, os recursos avançados de Motion carregam quando as prévias se aproximam da tela ou recebem foco. A barra de progresso usa CSS com fallback GSAP. O build inclui o CSS da principal no HTML enquanto ele estiver dentro do orçamento de 48 KiB. Os arquivos JS, CSS e fontes com hash recebem cache longo em hospedagens que aplicam `_headers`.

Depois do build, rode `npm run check:performance`. Um relatório Lighthouse móvel pode ser validado com `npm run check:performance -- caminho/relatorio.json`. Os resultados e limites desta revisão estão em `docs/home-performance-review.md`.

Há rolagem nativa, foco visível, link para pular ao conteúdo, menu móvel nativo e abas operáveis com teclado. Sem JavaScript, a página principal mantém os dois clientes visíveis, e `/exemplos/` mostra uma galeria estática dos quatro estudos. Contato comercial e suporte técnico permanecem separados.

## Antes de publicar

O domínio canônico está configurado como `https://digiprot.com.br/`. O build inclui canonical por página, Open Graph, Twitter Cards, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt` e versões Markdown das duas páginas. Rode `npm run build` e `npm run check:seo` antes de publicar.

`wrangler.toml` configura o Worker para servir `dist/`, manter barra final em páginas de diretório e exibir `dist/404.html` para URLs inexistentes.

O domínio de produção usa o Worker `digiprot-site`, conectado à branch `main` deste repositório pelo Cloudflare Workers Builds. A configuração de produção é:

- Diretório de assets: `./dist`, configurado em `wrangler.toml`.
- Build: `npm run build`.
- Deploy: `npx wrangler@4.147.0 deploy --config wrangler.toml`.

O deploy publica o conteúdo de `dist/`, incluindo `/exemplos/`, `_redirects`, `_headers` e `404.html`. A configuração explícita evita a autodetecção do Wrangler, que falha ao analisar este `vite.config.js`. Consulte `docs/seo-performance-audit.md` para as verificações após publicação.

Um push para `main` dispara a publicação automática. Confirme o sucesso no Cloudflare e confira o domínio; um push aceito pelo GitHub não garante que o deploy tenha terminado.
