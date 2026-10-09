# Performance — 2 de outubro de 2026

## Escopo e método

Auditoria e otimização da principal (`/`) e dos exemplos (`/exemplos/`), mantendo a direção escura, cinematográfica e as animações aprovadas. Fluxo principal: Agent Skills / performance-optimization. Ponytail filtrou a complexidade; antislop foi aplicado durante a edição; Find Skills confirmou a disponibilidade das práticas React da Vercel. Motion e GSAP orientaram o carregamento de recursos e as timelines.

Foram feitas três execuções por página e perfil antes e depois, com contextos Chromium novos, cache desativado e movimento normal. As tabelas mostram medianas. Dados das 24 execuções: [performance-samples-2026-10-02.json](performance-samples-2026-10-02.json).

| Perfil | Tela | CPU | Rede de download | Latência |
| --- | --- | --- | --- | --- |
| Celular | 390 × 844, DPR 2, touch | 6× mais lenta | 200.000 bytes/s (~1,6 Mbps) | 150 ms |
| Computador | 1440 × 1000, DPR 1 | Sem limitação | 1.250.000 bytes/s (~10 Mbps) | 40 ms |

A versão final foi copiada para uma pasta isolada e servida na porta 5175. Isso impediu que reconstruções simultâneas misturassem HTML e JavaScript durante as medições. O resultado final inclui alterações do outro agente em texto, SEO, CSS inicial e carregamento das features. Portanto, os ganhos agregados descrevem o conjunto entregue; não atribuímos cada milissegundo a uma mudança individual.

## Resultados

### Celular

| Página / medida | Antes | Depois |
| --- | ---: | ---: |
| Principal: FCP | 1.176 ms | 696 ms |
| Principal: LCP | 2.604 ms | 1.524 ms |
| Principal: bloqueio observado | 842 ms | 257 ms |
| Principal: CLS observado no carregamento | 0 | 0,026 |
| Principal: bytes recebidos no carregamento | 553.887 | 408.332 |
| Principal: maior interação observada, mediana | 176 ms | 176 ms |
| Exemplos: FCP | 1.068 ms | 996 ms |
| Exemplos: LCP | 1.224 ms | 1.212 ms |
| Exemplos: bloqueio observado | 383 ms | 116 ms |
| Exemplos: CLS observado no carregamento | 0 | 0 |
| Exemplos: bytes recebidos no carregamento | 419.869 | 399.848 |
| Exemplos: maior interação observada, mediana | 176 ms | 112 ms |

O LCP da principal caiu cerca de 41%; o bloqueio observado caiu cerca de 69% nas duas páginas. O LCP dos exemplos ficou praticamente igual. A mediana de interação da principal também ficou igual. O pequeno aumento de CLS no celular está registrado, sem arredondá-lo a zero.

A principal ainda apresenta variação na CPU limitada: bloqueio final de 235 a 637 ms. O LCP final variou de 1.504 a 1.536 ms. Nos exemplos, o bloqueio ficou entre 109 e 127 ms.

### Computador

| Página / medida | Antes | Depois |
| --- | ---: | ---: |
| Principal: FCP | 336 ms | 264 ms |
| Principal: LCP | 508 ms | 284 ms |
| Principal: bloqueio observado | 1 ms | 0 ms |
| Principal: CLS observado no carregamento | 0,311 | 0,002 |
| Principal: bytes recebidos no carregamento | 553.887 | 319.310 |
| Exemplos: FCP | 316 ms | 256 ms |
| Exemplos: LCP | 324 ms | 276 ms |
| Exemplos: bloqueio observado | 0 ms | 0 ms |
| Exemplos: CLS observado no carregamento | 0 | 0 |
| Exemplos: bytes recebidos no carregamento | 419.869 | 399.848 |

O salto de layout da principal foi eliminado quase por completo ao reservar a cena antes da primeira pintura. A contagem mediana de layouts da principal caiu de 81 para 52 no computador e de 89 para 61 no celular.

## Alterações mantidas

1. **Cena reservada antes da hidratação.** O CSS determina o espaço do hero sticky desde a primeira pintura. Telas menores, janelas baixas e movimento reduzido continuam com fluxo normal. Sem JavaScript, a cena também permanece no fluxo normal.
2. **Capturas responsivas.** Os clientes agora têm versões desktop de 480, 720, 960 e 1440 px e versões mobile de 192 e 390 px. `srcset` e `sizes` permitem ao navegador escolher a imagem adequada. Só a captura principal do notebook tem prioridade alta; as prévias de projetos são lazy.
3. **Features de Motion assíncronas.** Os componentes usam `m` com `LazyMotion`. Na principal, as features são solicitadas perto das prévias ou ao receber foco; nos exemplos, são carregadas para o carrossel. Layout e drag continuam disponíveis.
4. **Menos JavaScript inicial.** O helper local usa `clsx`, sem carregar o mecanismo de resolução de conflitos Tailwind que esses componentes não utilizam. Essa mudança isolada economizou aproximadamente 8,5 KB gzip. O JavaScript inicial da principal passou de cerca de 180 KiB para 143 KiB gzip no conjunto final; exemplos: 130,6 KiB.
5. **Menos preparação fora da tela.** Entradas GSAP e câmeras dos projetos usam `immediateRender: false`. A barra de progresso usa scroll timeline CSS quando suportada, com fallback GSAP. Os loops do hero já param fora da tela, com a aba oculta ou pela pausa manual.
6. **CSS inicial disponível no HTML.** A principal incorpora o stylesheet pequeno na pré-renderização, conforme a alteração paralela e seu limite de 48 KiB. O CSS da última build verificada tem 32,2 KiB.
7. **Favicon pequeno.** Atualização de 9 de outubro: PNG quadrado de 96 × 96 px, com 7.449 bytes, usando apenas o símbolo da marca. O logo exibido usa WebP de 23.208 bytes.
8. **Cache por tipo de asset.** `_headers` configura um ano com `immutable` para JS, CSS e fontes com hash; imagens de nome estável recebem um dia. Vite preview não aplica esses cabeçalhos; nenhum ganho de cache publicado foi contabilizado neste ensaio.

As experiências isoladas de reserva da cena e redimensionamento de imagens apresentaram ganhos antes da integração final. Não foram acrescentadas bibliotecas, camadas de memoização ou novos efeitos para justificar a otimização.

## Verificação final

- Build de produção, pré-renderização das duas páginas, checks de performance e SEO aprovados.
- Guard adicional `scripts/check-performance-assets.mjs`: JavaScript inicial <160 KiB gzip por rota, JS total <200 KiB gzip, fontes <65 KiB, favicon <8 KiB, logo exibido <30 KiB e variantes de imagens existentes.
- Chromium: pausa/retomada, abas de computador/celular, ativação por teclado, expansão de serviços e retorno ao topo aprovados.
- Carrossel: quatro exemplos, paginação, próximo com teclado, retorno ao primeiro e arraste aprovados.
- Logo na página de exemplos retorna à principal.
- Telas de 320 e 390 px: ambas as rotas sem overflow horizontal, imagens iniciais carregadas, menu abre e fecha com Escape.
- Notebook: ligação entre tampa e base conferida na rolagem para frente e para trás; capturas de computador e celular revisadas visualmente, sem o fundo quadrado anterior.
- Movimento reduzido: hero fora do sticky e sem loop ambiente.
- Nenhum erro de página nas 12 medições finais da cópia isolada nem na rodada de regressão.
- A rodada de regressão foi repetida na última build compartilhada, na porta 5174: 36 verificações aprovadas e nenhum erro de página. As duas rotas também foram abertas no servidor de desenvolvimento sem erro. Sem JavaScript, títulos, conteúdo dos clientes e quatro exemplos permanecem disponíveis, sem overflow em 390 px.

Houve um erro de hidratação em uma execução inicial dos exemplos e ocorrências intermitentes durante reconstruções da pasta compartilhada. A amostra inicial foi mantida. A cópia final isolada não reproduziu a falha; não atribuímos sua ausência a uma correção de código específica.

### Gate antislop desta rodada

**Aprovado no escopo das alterações:** identidade e composição preservadas; clientes reais separados dos exemplos; nenhum resultado comercial inventado; imagens e animações mantêm propósito; controles de pausa, foco e movimento reduzido conferidos; leitura e controles móveis revisados nas duas rotas. A auditoria de performance não substitui uma auditoria completa de contraste ou acessibilidade assistiva.

## Limites das medições

São ensaios locais sintéticos em Chromium, não dados de aparelhos físicos nem um score Lighthouse. LCP e FCP vêm de PerformanceObserver. O bloqueio observado soma o excesso de 50 ms das long tasks na janela de carregamento até dois segundos depois de `load`; não é o TBT oficial do Lighthouse. O CLS aqui é a soma dos deslocamentos inesperados nessa janela, não o CLS de toda a visita. Event Timing das interações ensaiadas não representa INP de usuários reais. Bytes são os recebidos nessa janela, não o tamanho do bundle inicial.

Os valores de referência de Core Web Vitals dependem do percentil 75 de visitas reais. A próxima avaliação em produção deve observar aparelhos físicos, cache/CDN e métricas de campo, especialmente a resposta da principal em celulares mais lentos.

## Repetir os checks de entrega

```powershell
npm run build
npm run check:performance
node scripts/check-performance-assets.mjs
npm run check:seo
npm run preview -- --port 5174 --strictPort
```

Os ensaios Chromium desta sessão ficam em `.playwright-mcp/performance-audit.js` e `performance-regression.js`, pasta local ignorada pelo Git. As amostras compactas versionadas registram as condições e resultados usados neste relatório.

## Fontes técnicas

- [Motion: LazyMotion](https://motion.dev/docs/react-lazy-motion)
- [Chrome: metodologia do Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time)
- [Cloudflare Pages: configuração de headers](https://developers.cloudflare.com/pages/configuration/headers/)
- [web.dev: Cumulative Layout Shift](https://web.dev/articles/cls)
- [web.dev: Largest Contentful Paint](https://web.dev/articles/lcp)
