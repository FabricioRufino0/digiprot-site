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
- `assets/hero-digiprot-v2.webp`: imagem usada no Hero animado.
- `assets/hero-digiprot.webp`: versão estática preservada como referência local.
- `assets/hero-wave-map.svg`: mapa de deslocamento do movimento do Hero.
- `assets/`: também contém a logo e as imagens conceituais dos exemplos.
- `robots.txt`: autorização de rastreamento para a página pública.

## Movimento e acessibilidade

A figura abstrata do Hero usa um filtro SVG local. Quando o navegador oferece controle de tempo para a animação SVG, o efeito pausa fora da tela e com a aba oculta. Com `prefers-reduced-motion: reduce`, a figura permanece estática e as transições são desativadas.

A página também oferece link para pular ao conteúdo, foco visível, menu móvel operável por teclado e controles nomeados para o carrossel. Os números dos canais não aparecem na interface: os botões identificam o setor comercial e o suporte técnico.

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
