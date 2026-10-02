# Revisão da seção de serviços

02/10/2026. Escopo: explicação dos serviços, copy de apresentação e remoção de referências ao porte dos negócios no conteúdo ativo e nos metadados.

## Direção e fonte

Seção de serviços para quem procura um site para seu negócio, no palco escuro cinematográfico DIGIPROT. ENERGY 2 / RHYTHM 2 / MOTION 2. Título à esquerda, escopo expansível à direita; composição vertical no celular. Watermelon Accordion 1 consultado pelo MCP e adaptado com controles nativos. Arquivo de origem e propósito registrados em `redesign-assets.md` e `DESIGN.md`.

## Evidências

- Build: `npm run build` concluído, incluindo pré-renderização das duas páginas.
- Navegador: 320, 768, 1024 e 1440 px sem transbordamento horizontal; capturas inspecionadas em 390 e 1440 px.
- Interação: clique, Enter e Espaço alternam os controles; Tab alcança a segunda explicação com foco visível. O link comercial mantém o destino WhatsApp existente, sem envio de mensagens durante a revisão.
- Animação: altura e opacidade intermediárias observadas durante a abertura; altura final em aproximadamente 280 ms. Movimento reduzido apresenta duração computada de 0 s.
- Sem JavaScript: contexto separado de navegador na prévia de produção; a segunda explicação abriu por clique e mostrou o texto. A automação precisou dispensar sua espera de estabilidade antes do clique.
- Contraste sobre o fundo: títulos 17,75:1; texto secundário 9,34:1; destaque/foco turquesa 10,81:1; borda do controle 4,06:1.
- Console: sem entradas ERROR ou WARNING durante a inspeção do desenvolvimento.
- Conteúdo: busca nos componentes, arquivos públicos, HTML, build e documentos ativos sem referências ao porte dos negócios. Descrição, Open Graph, Twitter, dados estruturados e `llms.txt` usam linguagem sem classificação por tamanho.

## Delivery Gate antislop

Aplicado às alterações deste pedido. Técnicas ausentes não exigem novas intervenções nas outras seções.

### Hard Gate

- R-02 PASS: copy revisada sem travessões; busca nos três componentes de apresentação não encontrou ocorrências.
- R-03 PASS: nenhuma largura inspecionada apresentou transbordamento; textos permanecem nos contêineres.
- R-17 PASS: não foram acrescentadas estatísticas.
- R-18 PASS: não foram acrescentados depoimentos ou pessoas fictícias.
- R-23 PASS: não foram criados logo, fotografia, prova social ou navegação.
- R-24 PASS: todos os destinos das âncoras da página existem no DOM.
- R-25 PASS: razões de contraste medidas acima dos mínimos para textos e controles.
- R-26 PASS: os dois controles alternam o conteúdo; o CTA possui destino comercial existente.
- R-27 PASS: conteúdo local estático, sem requisição de dados, formulário ou novos estados assíncronos.
- R-28 PASS: explicações tratam do escopo real do serviço; não há FAQ genérico.
- R-32 PASS: Enter, Espaço e Tab funcionam; foco visível observado.
- R-33 PASS: comportamento implementado diretamente em JSX e CSS; pré-renderização usa o script existente.
- R-34 PASS: o tema escuro existente foi preservado; não foi acrescentada troca de tema.
- R-35 PASS: build e abertura no navegador concluídos; os controles da seção foram acionados e o destino do CTA foi conferido.
- R-36 PASS: identidade, responsividade, domínio e escopo derivam do conteúdo existente; nenhum resultado foi prometido.
- R-37 PASS: direção cinematográfica documentada; paleta e fontes existentes preservadas.
- R-38 PASS: nenhum cliente, serviço adicional ou resultado fictício foi acrescentado.

### Purpose Gate

- R-01 PASS: nenhuma nova luz ou gradiente na seção; turquesa identifica o controle aberto.
- R-04 PASS: mais/menos expressam expansão; a seta existente sinaliza o destino externo do CTA.
- R-06 PASS: Archivo e Manrope preservam a hierarquia tipográfica da marca; nenhum rótulo decorativo em caixa alta.
- R-07 PASS: nenhum padrão de fundo foi acrescentado.
- R-08 PASS: controles de expansão usam mais/menos; a seta permanece apenas na ação externa existente.
- R-09 PASS: nenhum badge ou cápsula de marketing foi acrescentado.
- R-10 PASS: nenhum efeito de vidro na seção.
- R-12 PASS: nenhuma nova sombra.
- R-13 PASS: nenhum novo brilho.
- R-14 PASS: explicações em linhas expansíveis, sem cartões repetidos de recursos.
- R-19 PASS: abertura acompanha o conteúdo; sem loop; movimento reduzido remove as transições.
- R-22 PASS: nenhuma ilustração genérica foi acrescentada.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 2 / MOTION 2 registrados em DESIGN.md.
- Consistência PASS: entrada existente e abertura breve, dentro do ritmo da seção de leitura.
- Foco PASS: título principal domina a seção; controles e explicações usam escala secundária.
- Espaço PASS: separação entre introdução, explicações e contato; duas colunas no desktop e leitura vertical no celular.
- Acento PASS: turquesa sinaliza a explicação aberta; coral permanece na ação comercial.
- Identidade PASS: mesmas fontes, cores e ritmo tipográfico DIGIPROT.
- Direção PASS: intenção de composição e interação declarada antes da implementação e registrada em DESIGN.md.

### Craftsmanship e consistência

- C-1 PASS: escolhas visuais têm função de hierarquia, leitura ou estado, documentada.
- C-2 PASS: todos os controles novos funcionam por clique e teclado.
- C-3 PASS: as duas explicações correspondem ao conteúdo comercial existente.
- C-4 PASS: layout inspecionado nas quatro larguras; interação sem JavaScript e movimento reduzido conferidos.
- C-5 PASS: nenhuma prova, métrica ou resultado foi inventado.
- R-05 PASS: composição assimétrica e duas explicações reais; nenhum fluxo artificial de três passos.
- R-11 PASS: controles quadrados com raio de 0,5 rem; nenhuma nova forma de cápsula.
- R-15 PASS: CTA específico: Conversar sobre meu site.
- R-16 PASS: texto explica serviço e escopo, sem promessas grandiosas.
- R-20 PASS: seção segue a direção e os tokens existentes da DIGIPROT.
- R-21 PASS: tema escuro deriva da direção aprovada.
- R-29 PASS: nenhum novo token de cor.
- R-30 PASS: composição adaptada à identidade existente; branding de catálogo não foi copiado.
- R-31 PASS: layout para organizar escopo, fontes para hierarquia, cores para estado e espaços para leitura.

## Revisão do texto

## Tipografia em caixa alta

- Hard Gate PASS: inspeção da página principal e dos exemplos em 320, 390, 620, 768, 900, 1024 e 1440 px sem transbordamento nem títulos cortados. Parágrafos com `text-transform: none`; títulos com `uppercase`. Fonte existente, sem novo asset ou promessa comercial.
- Purpose Gate PASS: Archivo 800 e espaçamento de -0,025 em dão destaque aos títulos por solicitação do usuário. Fontes, cores e contraste existentes preservados. Sem decoração ou animação adicional.
- Liveliness PASS: hierarquia mais forte nos títulos; composição e dials registrados em DESIGN.md preservados. Corpo em Manrope com escrita normal.
- Craftsmanship PASS: tamanhos mínimos ajustados para palavras longas; controles dos exemplos passam para outra linha quando necessário. Inspeção visual de serviços no celular e da abertura animada em desktop; sem erros de execução. O aviso do Motion durante a inspeção indicou a preferência de movimento reduzido ativada no navegador.
- Build PASS: `npm run build` concluído após as alterações tipográficas.

### Copy existente

Humanizer e antislop-copywriting aplicados durante a escrita. A revisão manteve domínio no nome do cliente, itens definidos na proposta e SEO, medição e suporte conforme escopo. A formulação usa seu negócio e não limita o público por porte. Não foram acrescentadas métricas, prazos ou garantias de resultado.
