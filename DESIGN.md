---
name: DIGIPROT
description: Palco escuro para apresentar negócios e projetos digitais
colors:
  background: "#090c12"
  foreground: "#f2f4f6"
  surface: "#111a28"
  muted: "#aab4c3"
  primary: "#ff4d6d"
  accent: "#39d6c5"
  border: "#283342"
  control-border: "#667385"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.75rem, 6.3vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
    textTransform: "uppercase"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: "0.5rem"
  preview: "0.75rem"
spacing:
  group: "1rem"
  section-mobile: "4rem"
  section-desktop: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0.85rem 1.5rem"
---

# DIGIPROT: sistema visual

## Overview

Modo: Experience. Energia e movimento ampliados por pedido explícito do usuário. Taste Skill: DESIGN_VARIANCE 8 / MOTION_INTENSITY 9 / VISUAL_DENSITY 4.

Palco escuro e cinematográfico escolhido pelo usuário. PNG original sem placa branca; recorte da wordmark em branco sobre o fundo da cena. Referência: última composição escura aprovada. Seu conteúdo fictício foi substituído por telas reais.

## Colors

O coral conduz a ação principal e o anel; turquesa marca foco e seleção. Fundo preto-azulado e superfície azul profundo separam os capítulos. Gradientes ficam no material do anel e na luz do palco.

## Typography

Archivo usa peso 750 nos títulos, aproximando o destaque geométrico da wordmark DIGIPROT. Manrope mantém legibilidade na leitura. As duas fontes ficam hospedadas no próprio build. Texto de leitura em 400; controles em 700. Sem texto em gradiente ou monospace decorativo.

## Layout

Container de até 1320px. Refluxo em 620, 900 e 1200px. Em celular, a cena vem antes do título e as ações ocupam a largura; em desktop, título à esquerda e cena à direita. A página principal apresenta clientes e serviços. Estudos conceituais ficam em `/exemplos/`, com controles próprios. Espaçamento de seção: 4rem em celular, 5rem em tablet e 6rem em desktop.

A explicação de serviços combina título e texto à esquerda com duas linhas expansíveis à direita. Em celular, as linhas vêm abaixo do texto. O padrão de acordeão do Watermelon organiza o escopo sem repetir cartões; a primeira explicação começa aberta. O sinal de mais/menos e o turquesa indicam a abertura, e a transição de altura acompanha a leitura. Os controles nativos continuam funcionando sem JavaScript; movimento reduzido remove a transição. Archivo e Manrope mantêm a relação entre títulos fortes e texto legível da marca. A seção tem ENERGY 2, RHYTHM 2 e MOTION 2, dentro do palco cinematográfico existente.

## Elevation & Depth

Sombras apenas nos dispositivos e no menu aberto: laptop `12px 22px 35px #0007`, celular `5px 12px 20px #0008`, menu `0 20px 40px #0006`. A luz do palco é uma elipse centralizada que termina totalmente transparente nas bordas. O anel geométrico de foco em `public/assets/focus-ring.svg` é um círculo fino, inclinado em perspectiva, com contornos discretos. Ele fica em uma camada de fundo independente da profundidade dos dispositivos. Não há arco de primeiro plano; as telas e o teclado sempre o ocultam.

## Shapes

Títulos e chamadas principais usam Archivo 800 em caixa alta, com espaçamento de -0,025 em. Parágrafos, resumos, links e controles de navegação conservam a escrita normal em Manrope. A caixa alta atende à direção solicitada para os destaques; o tamanho mínimo dos títulos é ajustado para que as palavras longas caibam no celular.

Controles com raio de 0.5rem, prévias de 0.75rem. A wordmark branca aparece sobre o fundo transparente, preservando o símbolo original. Ícones de menu, direções e formatos têm função de navegação. Sem cartões de serviços repetidos, números decorativos ou indicadores de resultados.

## Components

A abertura monta um notebook com tampa articulada, teclado e trackpad, enquanto o celular entra com giro de perspectiva. A sequência inicial dura até 1.3s; palavras do título entram por máscaras. A montagem segue ao rolar, sem conclusão abrupta. Dispositivos flutuam em ciclos de 3.6s após a abertura; o anel oscila entre -6 e 6 graus em fases de 6s, com pausa manual, fora da tela e na aba oculta. A rolagem inclina o fundo até 14 graus, mantendo a leitura de um único plano atrás dos dispositivos.

Em desktop com altura suficiente, um único capítulo de 240svh mantém o palco com CSS sticky. ScrollTrigger aproxima o notebook inteiro, traz o celular para o primeiro plano e recompõe a cena. Tela e base permanecem unidas; a tampa abre pela dobradiça apenas na entrada. A suavização acompanha a rolagem em 0.16s (0.12s no celular), e a inclinação pelo ponteiro responde em 0.22s. Rotação, perspectiva, escala e máscaras produzem os movimentos; a rolagem segue nativa. O link Ver clientes pula a apresentação. Foco por teclado em controles durante a cena conclui o capítulo. Celular mantém a montagem e uma passagem de perspectiva ao rolar, sem alongar o capítulo.

Projetos têm revelação por máscara e câmera que se acomoda com a rolagem; inclinação por ponteiro fica limitada a 2.5 graus. A galeria conceitual conserva os quatro cartões montados: Motion move o cartão escolhido para o centro com uma mola sem rebote, em aproximadamente 0.3s. Os cartões laterais mantêm imagens opacas com uma camada de sombra; a troca não expõe imagens sobrepostas. Texto e seleção mudam juntos, sem fila de saída/entrada; gestos e cliques rápidos substituem o destino atual. A comparação de formatos permanece em 0.3s. Serviços, contato e rodapé entram uma vez. O menu nativo entra em 180ms via WAAPI quando acionado pelo ponteiro. Foco turquesa de 2px, offset de 5px. Movimento reduzido mantém o palco estático e a seleção imediata; o conteúdo fica disponível sem JavaScript.

## Do's and Don'ts

- Preservar o logo original e os canais comercial e técnico separados.
- Usar capturas reais, indicando claramente os estudos conceituais.
- Manter rolagem nativa e composição estática completa.
- Não adicionar métricas, depoimentos ou escopo comercial sem confirmação.
- Não usar interfaces geradas como prova de projeto.
