# Site institucional DIGIPROT

Landing page estática da DIGIPROT, criada para apresentar o serviço e direcionar o visitante aos canais comercial e técnico no WhatsApp.

O site usa HTML, CSS e JavaScript sem framework ou dependências de interface. A seção de exemplos reúne quatro páginas conceituais, cada uma com estrutura e identidade próprias:

- climatização, com foco em diagnóstico e pedido de avaliação;
- confeitaria, com foco em produtos e encomendas;
- contabilidade, organizada por momento da empresa;
- loja de bicicletas, com catálogo e agendamento de oficina.

Os exemplos não representam clientes ou projetos entregues.

## Prévia local

Na pasta do projeto, execute:

```powershell
python -m http.server 4173
```

Depois, abra `http://localhost:4173`.

## Estrutura

- `index.html`: conteúdo, metadados e estrutura semântica.
- `styles.css`: identidade visual, animação, carrossel e responsividade.
- `script.js`: menu móvel, movimento do Hero e navegação dos exemplos.
- `assets/hero-digiprot-v2.webp`: imagem de alta resolução do Hero em telas maiores.
- `assets/hero-digiprot.webp`: versão estática menor do Hero, selecionada em telas de até 950 px.
- `assets/hero-wave-map.svg`: mapa de deslocamento do efeito SVG usado no Hero em telas maiores.
- `assets/digiprot-logo.webp`: logo reduzida para a página e o favicon; o PNG original permanece como fonte.
- `assets/`: também contém as imagens WebP usadas nos exemplos conceituais.
- `robots.txt`: autorização de rastreamento para a página pública.

## Movimento e acessibilidade

A figura abstrata do Hero usa um filtro SVG local em telas maiores. O efeito pausa fora da tela, com a aba oculta e com `prefers-reduced-motion: reduce`. Em telas de até 950 px, o site carrega a imagem estática menor e não executa o filtro, que era pesado em celulares.

A página também oferece link para pular ao conteúdo, foco visível, menu móvel operável por teclado e controles nomeados para o carrossel. Os números dos canais não aparecem na interface: os botões identificam o setor comercial e o suporte técnico.
As regras do carrossel foram consolidadas para evitar valores sobrepostos entre os breakpoints.

Cada link para o WhatsApp abre uma conversa com uma mensagem inicial adequada ao botão. Os contatos comercial e de suporte técnico continuam separados.
O logo do header não tem subtítulo. O rodapé não repete o CTA comercial nem traz slogan junto à logo, conforme a direção da marca.

## Otimização de arquivos

- O Hero móvel passou de `hero-digiprot-v2.webp` (495.228 bytes, 3548 × 1774) para `hero-digiprot.webp` (175.998 bytes, 1774 × 887), redução de aproximadamente 64% no arquivo inicial dessa imagem.
- A página usa `digiprot-logo.webp` (23.208 bytes, 600 × 200) no lugar do PNG de 295.614 bytes, redução de aproximadamente 92%.
- No carregamento móvel, Hero e logo somam 199.206 bytes, contra 790.842 bytes antes, redução aproximada de 75% nesses dois arquivos.
- A folha do Montserrat mantém `display=swap` para exibir texto enquanto a fonte carrega.

As porcentagens acima comparam arquivos locais; não representam uma medição de Core Web Vitals ou de desempenho em aparelho.

## Verificação antes de publicar

Fluxo mínimo usado no projeto:

1. conferir a sintaxe de `script.js` com `node --check script.js`;
2. executar `git diff --check`;
3. servir a página localmente e confirmar resposta HTTP 200;
4. testar menu, âncoras, links e carrossel com mouse, toque e teclado;
5. revisar desktop, tablet, celular e `prefers-reduced-motion`;
6. verificar console, imagens, rolagem horizontal, IDs duplicados e destinos das âncoras;
7. revisar o diff antes do commit e do push.

## SEO e publicação

O HTML contém idioma, título, descrição, Open Graph básico, conteúdo semântico e um único `h1`. O arquivo `robots.txt` permite rastreamento.

Antes do primeiro deploy ainda é necessário:

- definir o domínio para adicionar canonical, `og:url`, imagem social absoluta e `sitemap.xml`;
- confirmar dados públicos da empresa antes de criar JSON-LD;
- confirmar favicon final, paleta oficial, informações legais e política de privacidade;
- definir contas, consentimento e eventos antes de instalar Analytics;
- configurar Search Console depois que o domínio estiver ativo;
- repetir as verificações de status HTTP, metadados, links e desempenho no endereço publicado.

Não há formulário, cookies de medição ou scripts de Analytics nesta versão.
