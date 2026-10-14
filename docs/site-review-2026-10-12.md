# Revisão do site em 2026-10-12

## Alterações

A home apresenta “Explorar exemplos” como ação principal, com acesso a clientes e contato comercial preservados. As âncoras da navegação e do rodapé de exemplos apontam para `#colecao`.

Os oito estudos têm títulos, descrições de serviços, textos de apresentação e destaques específicos de cada negócio fictício. A composição varia entre fotografia de fundo, imagem acima do texto, imagem à esquerda, vitrine de produto e lista contábil. Textos de serviços, projetos, contato e rodapé foram revisados. Metadados e versões Markdown acompanham o conteúdo atual.

As pequenas chamadas decorativas acima dos títulos foram removidas da home, dos cartões e das prévias. Esta preferência está registrada no Segundo Cérebro e no `DESIGN.md`.

A rodada de testes corrigiu dois recortes no formato computador em telas pequenas: controles maiores que o cabeçalho e colunas de serviços com largura mínima excessiva. A navegação expandida tem altura mínima de 64px; abaixo de 600px de container, usa um único acesso aos serviços e permite quebra. As colunas usam `minmax(0,1fr)` e passam a uma coluna nesse tamanho.

## Verificação

Build de produção servido por `npm run preview -- --port 5174`, usando Chromium automatizado e sessões novas. Dados detalhados em [site-review-2026-10-12.json](./site-review-2026-10-12.json).

| Checagem | Resultado |
|---|---|
| `npm run build` | Duas páginas pré-renderizadas; sucesso |
| `npm run check:seo` | Metadados, conteúdo sem JS, assets, sitemap, robots, llms, 404 e configuração de segurança aprovados |
| `npm run check:performance` | CSS inicial 30,5 KiB; JS inicial 144,9 KiB gzip; dentro dos limites de 48 e 160 KiB |
| `git diff --check` | Sem erros de whitespace |
| Home e exemplos em 320, 390, 768, 900 e 1440px | Sem rolagem horizontal, âncoras locais quebradas ou chamadas decorativas acima dos títulos; um H1 por página |
| CTA principal da home | Abre `/exemplos/` |
| Filtros | Gastronomia 2, Profissionais 3, Bem-estar 2, Comércio 1, Todos 8 |
| 48 combinações de prévias com movimento reduzido | Oito modelos em computador a 1440, 768, 390 e 320px e em celular a 390 e 320px; sem overflow, recorte de controles ou parágrafos vazios; três serviços por modelo |
| Teclado com movimento normal | Oito diálogos abrem por Enter, mantêm foco por 12 Tabs, alternam para celular e fecham por Escape com retorno ao acionador |
| Navegação interna das oito prévias | CTA dos serviços desloca a área rolável para o conteúdo |
| Menu móvel | Enter abre; Escape fecha e devolve foco |
| Projetos reais | Ambos alternam para a aba Celular e mostram o painel correspondente |
| Imagens | As sete fotografias carregaram na rodada de interação; contabilidade usa composição própria |
| Sem JavaScript a 390px | Home mantém dois clientes; exemplos mantém oito cartões visíveis; sem overflow |
| Console e rede local | Nenhum erro JavaScript ou requisição falha nas verificações registradas |

O retorno de foco foi conferido depois do término da animação de fechamento. Uma leitura imediata durante a saída não representa o estado final do diálogo.

## Cookies e privacidade

Na visita em sessão limpa ao build local, não foram observados cookies nem chaves em `localStorage` e `sessionStorage`. A revisão do código não encontrou pixels, Google Analytics, formulários ou recursos externos incorporados de WhatsApp; os contatos são links.

A inspeção de produção feita nesta sessão em `https://digiprot.com.br/` e `/exemplos/` também não observou cookies ou armazenamento nessas visitas. Encontrou o beacon de Cloudflare Web Analytics injetado pela hospedagem. A documentação do fornecedor informa que esse beacon não usa cookies ou armazenamento no navegador. A decisão atual é manter sem banner de consentimento, sujeita a nova avaliação ao mudar integrações ou configuração. Isso não equivale a ausência de tratamento de dados: logs da hospedagem e atendimento pelo WhatsApp exigem transparência.

Uma política de privacidade pública continua pendente; esta revisão não criou uma página legal nem certifica conformidade integral. O procedimento reutilizável foi registrado no Segundo Cérebro em “Cookies e Privacidade em Sites”, ligado ao roteador, checklist, fluxo, segurança e MOC de VibeCoding.

Fontes consultadas nesta sessão: [guia de cookies da ANPD](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf/@@display-file/file), [LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e [beacon RUM da Cloudflare](https://developers.cloudflare.com/speed/observatory/rum-beacon/).

## Limites e publicação

Não foram executados novo Lighthouse, leitor de tela, aparelho físico ou medição de Core Web Vitals de campo. O orçamento de arquivos não substitui essas medições. O pacote não tem scripts de lint nem uma suíte unitária separada.

Commit e push desta rodada têm como destino `codex/digiprot-cinematic`. A publicação automática documentada usa `main`; enviar esta branch não significa publicar as alterações no domínio. A inspeção de privacidade de produção observou a versão que já estava publicada, não esta build local.
