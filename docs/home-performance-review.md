# Performance da página principal

Revisão local em 2 de outubro de 2026. Skills: Agent Skills performance-optimization, Ponytail e GSAP Performance; antislop aplicado durante as alterações. A tarefa não publicou o site.

## Medição

A baseline foi congelada em `tmp/perf-primary-baseline/` depois de um build novo. Ela já incluía capturas responsivas e LazyMotion, adicionados anteriormente no workspace. Portanto, esta rodada parte de **95**, não dos 89 registrados na auditoria anterior.

Lighthouse 13.5.0, Chrome headless, perfil móvel com rede e CPU simulados, cache limpo. Duas amostras iniciais e três finais. Os builds foram servidos por Vite Preview. Teste isolado de CSS usou cópia da baseline com exatamente os mesmos JS, fontes e imagens.

| Métrica móvel | Baseline | Final |
| --- | ---: | ---: |
| Performance | 95 em 2 execuções | 96 em 3 execuções |
| SEO / acessibilidade / boas práticas | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP | 2,794–2,796 s | 2,718–2,722 s |
| FCP | 1,662–1,810 s | 1,659–1,661 s |
| TBT | 28–30 ms | 8–11 ms |
| CLS | 0 | 0 |
| Bytes transferidos | 399.077 | 369.920–369.924 |

TBT médio inicial 29 ms; mediana final 11 ms. Redução de aproximadamente 62%. A transferência caiu cerca de 7,3%. O ganho de LCP é pequeno, aproximadamente 75 ms. A variação do FCP inicial impede atribuir um ganho grande nessa métrica.

Desktop: **100** nas quatro categorias, LCP 565 ms, TBT 0 e CLS 0, em uma medição. Isso não representa o desempenho de todos os dispositivos reais.

Dados por execução: `docs/home-performance-results.json`. Relatórios completos locais: `tmp/perf-primary-*.json`. O JSON de resultados inclui também a verificação da página de exemplos.

## Alterações

1. **CSS no HTML da principal.** O prerender substitui o link externo por estilos completos até 48 KiB. Não existe uma versão parcial de CSS para manter em paralelo. A principal já chega estilizada, inclusive sem JavaScript. Os exemplos continuam usando a folha externa compartilhada. O CSS embutido atual tem 34,2 KiB antes de gzip.
2. **Motion perto do conteúdo que precisa dele.** O pacote de recursos avançados aguarda a primeira prévia de cliente entrar na margem de 200 px da tela, ou o foco de teclado alcançar a seção. Nas páginas sem essa seção, como exemplos, o carregamento continua imediato. O teste de rede confirmou zero requisições desse pacote na abertura da principal e uma ao chegar aos clientes.
3. **Progresso de rolagem nativo.** CSS `animation-timeline` substitui useScroll/useTransform e o componente Motion nessa barra. Navegadores sem suporte usam o GSAP já instalado. Movimento reduzido mantém a barra escondida.
4. **Menos leituras de geometria.** Hero e cartões guardam a posição para os eventos do mouse e invalidam o valor ao sair do elemento, rolar, redimensionar a janela ou mudar o tamanho do elemento. Observers e listeners são removidos no cleanup. Em 100 eventos de pointermove, cada alvo passou de 100 leituras de getBoundingClientRect para 1; sair e voltar produziu a segunda leitura, como esperado. Isso mede chamadas evitadas, não uma promessa de FPS.
5. **Refresh de fontes condicionado.** ScrollTrigger só aguarda e atualiza depois das fontes quando elas ainda estão carregando. Fontes já prontas não provocam esse refresh adicional.
6. **Cache de arquivos versionados.** `_headers` entrega JS, CSS e WOFF2 com max-age de um ano e immutable. O verificador exige hash nos arquivos que entram nessas regras. Imagens têm cache de um dia. A configuração foi verificada em Wrangler Pages local: headers únicos, JS/fontes immutable e HTML com max-age=0 e must-revalidate. Regras externas só entram em vigor após publicação em hospedagem compatível.
7. **Guardas de regressão.** `check:performance` exige CSS inline até 48 KiB, JS inicial até 160 KiB gzip, recursos avançados assíncronos, capturas responsivas, prioridade do hero e regras de header sem duplicação. Um relatório móvel opcional verifica orçamento de LCP 3 s, TBT 100 ms e CLS 0,1.

JavaScript indicado no HTML inicial: aproximadamente **143 KiB gzip**, abaixo do limite de 160 KiB. O pacote avançado de Motion, aproximadamente 28,7 KB gzip, continua disponível quando necessário.

## Experimentos e limites

| Experimento | Resultado | Decisão |
| --- | --- | --- |
| CSS inline com JS e assets congelados | LCP ~2,795 → ~2,731 s; requisição de CSS bloqueante removida | Mantido: ganho pequeno e repetido; HTML fica maior e os estilos serão transferidos de novo em visitas seguintes |
| Progresso nativo e recursos de Motion próximos às prévias | Menos JS na abertura; rede confirma carregamento após aproximação/foco | Mantido |
| Cache das posições para hover | 100 → 1 leituras por alvo; invalidação verificada | Mantido |
| Retirar fade/scale da entrada do notebook | Sem ganho material de LCP | Revertido: abertura visual original preservada |

O frontend recebeu alterações simultâneas de texto durante o trabalho. A comparação de CSS foi isolada; a comparação final é do conjunto entregue. Não atribuir todos os ganhos a uma única linha.

O **LCP móvel ainda está acima da meta de 2,5 s**. O orçamento de 3 s detecta regressões e não redefine essa meta. As imagens responsivas já existentes evitam as capturas grandes em telas pequenas; para avanço adicional, medir tamanho e qualidade de novas variantes antes de substituir os assets. A hidratação React, GSAP e os recursos da interface continuam representando a maior parcela de JS. Divisões adicionais precisam preservar o início das animações e o comportamento das abas.

Não há medição de INP de usuários reais aqui. TBT é uma métrica de laboratório. Confirmar métricas de campo após publicar e haver dados suficientes. Imagens sem hash com cache de um dia podem permanecer até 24 horas no navegador; atualizações imediatas devem usar novo nome de arquivo ou URL versionada.

## Verificação funcional

- Build, `check:seo` e `check:performance` passaram. Relatório móvel final passou nos três orçamentos.
- 320, 390 e 1440 px: sem overflow horizontal, imagens quebradas ou erros de execução.
- Notebook: pausa e retomada operadas. A abertura original foi restaurada após o experimento.
- Clientes: computador/celular operados nos dois cartões; carregamento de Motion confirmado ao aproximar as prévias.
- Menu móvel e Escape, acordeão de serviços e próximo exemplo operados.
- Barra nativa chega a scaleX(1) no final; fallback GSAP verificado simulando ausência do recurso e desabilitando a regra CSS nativa no teste.
- Movimento reduzido: barra escondida e notebook visível. Sem JavaScript: H1, dois clientes e estilos presentes.

## Repetir

```powershell
npm run build
npm run check:seo
npm run check:performance
npm run preview -- --port 5184 --strictPort
npx --yes lighthouse http://127.0.0.1:5184/ --chrome-path="C:\Program Files\Google\Chrome\Application\chrome.exe" --chrome-flags="--headless --disable-gpu" --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=tmp/perf-home.json --quiet
npm run check:performance -- tmp/perf-home.json
```

Para verificar headers, usar Wrangler Pages local ou a hospedagem publicada; Vite Preview não aplica `_headers`.

## Referências

- [Motion: redução de bundle](https://motion.dev/docs/react-reduce-bundle-size)
- [MDN: animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline)
- [Chrome: recursos que bloqueiam renderização](https://developer.chrome.com/docs/performance/insights/render-blocking)
- [Cloudflare: cache e headers](https://developers.cloudflare.com/pages/configuration/headers/)

## Gate antislop do escopo alterado

- **Hard Gate PASS:** medições registradas; nenhum dado comercial inventado; browser sem overflow ou erros; Lighthouse com acessibilidade 100 na principal.
- **Purpose Gate PASS:** as mudanças reduzem rede, JavaScript inicial e leituras repetidas; cada técnica tem resultado ou comportamento verificado.
- **Liveliness PASS:** visual e animações preservados; a alteração visual que não trouxe ganho foi revertida.
- **Craftsmanship PASS:** controles operados, fallback e movimento reduzido verificados, build e guardas executados.

## Validação final antes do commit e push

Em 02/10/2026, os arquivos preparados para commit foram exportados pelo índice Git para uma cópia isolada. `npm ci`, build, `check:seo`, `check:performance` e `check-performance-assets.mjs` passaram nessa cópia, sem depender de arquivos de planejamento não versionados.

A exportação revelou duas diferenças que a prévia anterior não mostrava: a conversão LF/CRLF do Windows quebrava a primeira linha da checagem de `llms.txt`, e a descoberta automática do Tailwind incluía classes de arquivos fora da interface. A checagem agora aceita ambas as quebras de linha; o Tailwind limita a descoberta a `src/`, usando a [configuração oficial de source](https://tailwindcss.com/docs/detecting-classes-in-source-files#setting-your-base-path). O CSS final ficou em **32,2 KiB**, incluído no HTML da principal.

| Perfil | Performance | SEO | Acessibilidade | Boas práticas | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Móvel | 96 | 100 | 100 | 100 | 2.721 ms | 12 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 564 ms | 0 ms | 0 |

Medições locais com Lighthouse, uma execução final por perfil. Relatórios brutos em `tmp/commit-final-check-20261002/final-mobile.json` e `final-desktop.json`, fora do commit. O LCP móvel continua acima da meta de 2,5 s.

Playwright confirmou a principal em 320, 390 e 1440 px sem overflow, imagens quebradas ou erros de execução. Foram operados pausa/retomada, menu/Escape, abas dos dois clientes, acordeão e próximo exemplo. Movimento reduzido e conteúdo sem JavaScript passaram. São verificações em Chromium com viewport emulado; aparelho físico e gestos de toque não foram medidos nesta rodada.

`npm audit --omit=dev` retornou zero vulnerabilidades conhecidas. Um teste de mutação inverteu temporariamente a condição do orçamento de CSS numa cópia do verificador: a checagem rejeitou a alteração, e a cópia foi removida. Nenhuma mudança de teste foi aplicada ao código entregue.
