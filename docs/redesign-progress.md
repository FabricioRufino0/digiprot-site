# Execução do plano de redesign

Plano: docs/superpowers/plans/2026-10-02-digiprot-redesign-execution.md

Decisão: manter o trabalho sequencial na branch codex/digiprot-cinematic. O plano aprovado dispensa novos agentes e testes; a verificação usa build e inspeção manual de navegador. Sem commit, push ou deploy automático.

Decisão: pré-renderizar a página com ReactDOMServer e o carregador SSR do Vite para preservar conteúdo sem JavaScript, sem adicionar um framework de servidor.

Decisão: captura das prévias antigas preserva os quatro conceitos. As telas de clientes são capturadas do site publicado; permissão de publicação fica documentada para a etapa de deploy.

Tarefas 1 a 7: implementação local concluída, build com saída 0 e revisão registrada em docs/redesign-review.md. Prévia aberta em http://127.0.0.1:5173/.

Adaptação: ambos os projetos ficam visíveis, sem exigir seleção de cliente. As abas selecionam formato e estudo conceitual. Isso preserva a comparação entre trabalhos e os links diretos.

Adaptação: fonte editável do anel em public/assets/focus-ring.svg para manter o mesmo destino no HTML pré-renderizado e no cliente. Capturas PNG ficam em .cache/captures; somente derivados WebP são publicados no build.

Adaptação: Playwright MCP fez a inspeção técnica e responsiva; CUA abriu e manteve a prévia para o usuário. Revisão e documentação feitas pelo implementador por solicitação de não abrir novos agentes.

Pendências exclusivas da publicação: revisão visual do proprietário, confirmação de direitos das imagens/marcas dos clientes e metadados do domínio definitivo. Não há bloqueio para explorar a prévia local.
