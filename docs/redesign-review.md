# Revisão do redesign DIGIPROT

02/10/2026. Revisão realizada pelo próprio implementador, conforme a orientação de não abrir novos agentes. Escopo: implementação e prévia local; aprovação visual do proprietário e publicação são etapas posteriores.

## Evidências

- `npm run build`: saída 0, bundle estático e HTML pré-renderizado produzidos.
- `git diff --check`: saída 0. Apenas avisos do Git sobre conversão LF/CRLF.
- Navegador: inspeção em 320, 390, 768, 1024 e 1440px. Largura do documento igual à do viewport em todas.
- Menu móvel: Enter abriu, Escape fechou e devolveu foco ao resumo.
- Abas: computador/celular e quatro conceitos acionados por clique; setas e Enter selecionaram as opções pelo teclado.
- Console da versão de produção: zero erros e zero avisos após recarregar e acionar os controles.
- Movimento reduzido: media query ativa, anel sem transformações inline, rolagem instantânea.
- JavaScript desativado: título, dois projetos, quatro conceitos estáticos e logo/anel visíveis; 390px sem excesso de largura.
- Um único h1; todas as âncoras internas têm destino. URLs dos clientes visitadas e destinos WhatsApp preservados da versão anterior.
- Logo original e cópia pública: mesmo SHA-256 `6042C7C10F724387C27BEAD01D1A269FE871EB1EC48A6E2CFD3BC0DC583EC667`.
- Contraste calculado: texto secundário sobre superfície 8.34:1; texto escuro sobre coral 6.09:1; contorno dos controles sobre superfície 3.62:1, adequado à exigência de 3:1 para elementos não textuais.
- Detector Impeccable: alertou sobre Space Grotesk. Substituída por Archivo. Não foi executada uma segunda rodada do detector.

As inspeções foram manuais via navegador; não foi criada ou executada uma suíte de testes automatizados. Não foi medida performance em aparelho físico, Core Web Vitals nem acessibilidade com leitor de tela.

## Ajustes encontrados e resolvidos

| Antes | Depois | Motivo |
| --- | --- | --- |
| Anel decorativo criava 18px de excesso no celular | Recorte limitado à cena decorativa | Preservar largura e conteúdo móvel |
| Candidata Space Grotesk | Archivo hospedada localmente | Reduzir aparência recorrente de interfaces geradas |
| HTML de desenvolvimento ficava antigo ao editar componentes | Vite pré-renderiza o HTML de cada carregamento | Evitar divergência de hidratação |
| SVG importado pelo código causava destino diferente na pré-renderização | Fonte SVG em public/assets | Mostrar anel também sem JavaScript |
| Apenas primeira aba conceptual acessível sem JavaScript | Galeria estática em noscript | Apresentar os quatro estudos |
| Fonte de abas do registro tinha transition-all e importação cn inadequada | Primitivo adaptado aos tokens, utilitário local | Controlar estilo e dependências |
| Animação de troca também em ações por teclado | Estado imediato para teclado | Evitar espera em navegação frequente |

## Antislop: Delivery Gate

Revisão de movimento: **Approve para a prévia local**. Hero em GSAP com cleanup de contexto, transformações/opacity e duração explicativa de 1.5s; estados locais em 0.2/0.3s; teclado imediato; sem loop ou pin. Movimento reduzido e hover limitado a ponteiro preciso estão implementados. Isso não representa medição de frames em aparelho físico.

### Hard Gate

| Regra | Estado e evidência |
| --- | --- |
| R-02 | PASS: sem travessões na copy da página |
| R-03 | PASS: documento sem rolagem horizontal nas cinco larguras |
| R-17 | PASS: nenhuma estatística comercial adicionada; larguras das capturas são medidas reais |
| R-18 | PASS: nenhum depoimento ou avatar fictício |
| R-23 | PASS: logo preservado, cena SVG prevista no plano e capturas de projetos informados pelo usuário |
| R-24 | PASS: todos os destinos internos existem |
| R-25 | PASS: pares de texto e contornos conferidos por cálculo |
| R-26 | PASS: controles alternam conteúdo; links têm destinos reais |
| R-27 | PASS: conteúdo local, sem formulários ou consulta remota que exija estados de carregamento/erro; imagens têm alt e dimensões |
| R-28 | PASS: não foi criada uma FAQ |
| R-32 | PASS: menu e abas acionados por teclado, foco visível |
| R-33 | PASS: interface implementada nos componentes e estilos fonte |
| R-34 | PASS: direção escura aprovada; não existe alternância de tema |
| R-35 | PASS: build executado, menu e abas acionados, âncoras e destinos conferidos |
| R-36 | PASS: nenhuma promessa de resultado, segurança ou desempenho inventada |
| R-37 | PASS: comp escuro escolhido pelo usuário, decisões em DESIGN.md |
| R-38 | PASS: telas dos clientes reais e conceitos rotulados |

### Purpose Gate

| Regra | Estado e evidência |
| --- | --- |
| R-01 / R-13 | PASS: luz e gradiente restritos ao anel de foco e ao palco; propósito em DESIGN.md |
| R-04 / R-08 | PASS: ícones indicam direção, menu e formato da tela |
| R-06 | PASS: Archivo para peso do título; Manrope para leitura; sem monospace decorativo |
| R-07 | PASS: sem grid ou blueprint de fundo |
| R-09 | PASS: sem selo genérico acima do título |
| R-10 | PASS: sem coleção de superfícies de vidro |
| R-12 | PASS: sombras limitadas aos dispositivos e menu aberto |
| R-14 | PASS: projetos assimétricos; serviços em texto corrido |
| R-19 | PASS: hero finito, seleção local, sem animações simultâneas repetidas |
| R-22 | PASS: anel ligado ao título e à relação entre formatos, previsto no plano |

### Liveliness

| Item | Estado e evidência |
| --- | --- |
| Dials | PASS: ENERGY 3 / RHYTHM 3 / MOTION 2 em DESIGN.md |
| Foco | PASS: cena e título na abertura, telas reais nos projetos |
| Ritmo | PASS: projetos assimétricos, faixa responsiva, galeria e fechamento textual |
| Espaço | PASS: separação entre capítulos e agrupamento dos controles |
| Acento | PASS: coral na ação principal; turquesa em foco/seleção |
| Identidade | PASS: logo original, anel de foco e tipografia registradas |
| Direção | PASS: definida e aprovada antes da implementação |

### Craftsmanship e Quality Locks

| Regra | Estado e evidência |
| --- | --- |
| C-1 / R-31 | PASS: razões visuais registradas em DESIGN.md |
| C-2 | PASS: navegação e controles funcionais |
| C-3 / R-05 | PASS: seções correspondem à narrativa aprovada; sem tabela de preço ou prova social fictícia |
| C-4 | PASS: teclado, mobile, movimento reduzido e apresentação estática conferidos |
| C-5 | PASS: claims limitados ao conteúdo existente e aos sites dos clientes |
| R-11 | PASS: raios de controles e prévias distintos; círculos apenas em direções |
| R-15 | PASS: ações nomeadas, como Ver projetos e Conversar sobre meu site |
| R-16 | PASS: sem buzzwords de tecnologia ou promessas genéricas |
| R-20 / R-30 | PASS: direção própria aprovada e telas concretas da DIGIPROT |
| R-21 | PASS: escuro solicitado explicitamente pelo usuário |
| R-29 | PASS: papéis de paleta registrados nos tokens |

## Ampliação de animações — 02/10/2026

- Animate orientou frequência, propósito, curvas, teclado e movimento reduzido. GSAP/ScrollTrigger controla a coreografia e Motion controla estados e progresso. Documentação de useScroll consultada pelo MCP Motion; busca de referências realizada no Watermelon. Nenhuma dependência nova foi instalada.
- Header e texto inicial entram em sequência. Anel e luz do palco respiram, com pausa manual, pausa fora da tela e pausa em aba oculta. A cena acompanha suavemente o ponteiro; no desktop, desloca-se durante a saída pela rolagem.
- Projetos entram como telas que se acomodam, com inclinação discreta pelo ponteiro. Comparação de formatos mantém transição de layout. Conceitos ganham indicador móvel e entrada de imagem/descrição. Serviços, contato e rodapé entram uma vez por visita. Menu móvel abre em 180ms somente por ponteiro.
- Inspeção manual via Playwright MCP: 1440 e 390px sem overflow; menu/Escape e abas funcionais; botão de pausa interrompe transformação do anel; deslocamento do hero e inclinação dos projetos observados; contato e rodapé terminam com opacidade 1. Preferência reduce remove as coreografias. Sem JavaScript: quatro conceitos estáticos, nenhum botão de pausa inativo. Produção local sem erros de página.
- `npm run build` concluiu, com HTML pré-renderizado. Bundle JavaScript de 546.84KB (183.71KB gzip); Vite avisa sobre o chunk acima de 500KB. Desempenho em aparelhos lentos e métricas de campo não foram medidos. Nenhuma suíte de testes foi adicionada ou executada.
- Captura da abertura: `.cache/animated-hero.png`. Implementação central em `src/components/PageMotion.jsx`; decisões atualizadas em `DESIGN.md`.

## Cena de construção e apresentação — 02/10/2026

O usuário pediu movimento mais marcante e uma abertura que demonstrasse capacidade técnica. A intensidade anterior foi substituída por montagem de dispositivos e um capítulo de rolagem: tampa articulada, teclado, trackpad, peças separadas/encaixadas, mudança de perspectiva, anel coordenado e celular em primeiro plano. Títulos usam máscaras; projetos ganham revelação e aproximação. Conceitos entram com giro. O logo original foi preservado.

Skills aplicadas: GSAP (timeline, ScrollTrigger, React e performance), Motion, Taste Skill, UI/UX Pro Max, Ponytail e Humanizer. Pesquisa UI/UX focada em cinematic scroll scrub recomendou uma única sequência prolongada e movimento reduzido. Documentação oficial GSAP consultada. A busca no Watermelon retornou heros genéricos sem montagem de dispositivos; a implementação usa as capturas reais e CSS 3D com as dependências já instaladas.

Inspeção manual via Playwright MCP: larguras 1440, 1024, 390 e 320px sem overflow. No desktop, observadas separação de tela/base, rotação e troca de dispositivo em foco, retorno do título a opacidade 1 e link para projetos chegando ao destino. Pausa interrompe a flutuação. Abas permanecem funcionais. Preferência reduce remove montagem e capítulo sticky. Na largura 1024px, espaçamento entre texto e ações ajustado após inspeção. Nenhum erro de página na execução conferida. Capturas em `.cache/cinema-start.png`, `.cache/cinema-construction.png`, `.cache/cinema-desktop.png`, `.cache/cinema-mobile-stage.png` e `.cache/cinema-phone.png`.

Build concluído com HTML pré-renderizado. Sem dependências novas ou suíte de testes. O aviso de tamanho do chunk JavaScript permanece; fluidez em aparelhos físicos lentos não foi medida.

## Limites para publicação

Confirmar direitos de exibição das marcas e fotografias dos clientes e dados finais de domínio/metadados. A prévia local não publica o redesign nem altera os sites dos clientes.
