export const conceptsDescription = 'Oito estudos de sites para gastronomia, arquitetura, beleza, comércio e serviços. Explore estilos e prévias para computador e celular.'

export const concepts = [
  {
    id: 'restaurante', name: 'Restaurante', brand: 'BRASA', category: 'Gastronomia', style: 'Sensorial e acolhedor', color: '#592c32', ink: '#fae6cf',
    headline: 'Feito no fogo.\nServido com alma.', intro: 'Ingredientes da estação, conversa sem pressa e uma mesa à sua espera.', action: 'Conheça a cozinha',
    summary: 'Fotografia à mesa, tons de vinho e uma apresentação que abre o apetite.',
    detail: 'O cardápio ganha espaço em uma composição inspirada em menus impressos. A fotografia aproxima o visitante da experiência do restaurante, enquanto os destaques da cozinha e o convite para reservar ficam fáceis de encontrar. Uma proposta para casas que querem apresentar seu ambiente e sua comida com a mesma atenção.',
    services: ['Da horta ao prato', 'O sabor da brasa', 'Um doce final'], sectionTitle: 'A estação escolhe. A cozinha cria.',
    photoAlt: 'Prato preparado com vegetais e apresentação delicada em um restaurante.',
  },
  {
    id: 'arquitetura', name: 'Arquitetura', brand: 'vértice', category: 'Profissionais', style: 'Editorial e contemplativo', color: '#d9d4ca', ink: '#333c35',
    headline: 'Espaços para\nviver de verdade.', intro: 'Arquitetura que escuta a rotina e encontra beleza nos detalhes.', action: 'Explore os projetos',
    summary: 'Um portfólio com respiro, materiais naturais e imagens que conduzem a visita.',
    detail: 'As imagens dos ambientes orientam a navegação deste portfólio. Tipografia editorial, margens generosas e uma paleta mineral deixam os materiais aparecerem. A proposta apresenta projetos residenciais e interiores, explica as etapas de trabalho e abre espaço para o visitante contar como gostaria de viver.',
    services: ['Casas que acolhem', 'Interiores com intenção', 'Do primeiro traço à obra'], sectionTitle: 'A vida acontece entre os espaços.',
    photoAlt: 'Sala de estar com sofá claro, plantas e materiais naturais.',
  },
  {
    id: 'bicicletas', name: 'Loja de bicicletas', brand: 'VELO.', category: 'Comércio', style: 'Esportivo e expressivo', color: '#d7e95d', ink: '#202721',
    headline: 'A cidade é\nsua pista.', intro: 'Para o caminho de todo dia. Para a estrada que você ainda não conhece.', action: 'Encontre seu ritmo',
    summary: 'Tipografia em movimento e uma vitrine que conecta a bicicleta à vida na rua.',
    detail: 'Catálogo e oficina fazem parte da mesma experiência. Este estudo reúne modelos, revisões e acessórios em uma linguagem esportiva, com contraste forte e títulos largos. O visitante encontra caminhos para escolher uma bicicleta e cuidar da que já tem, com a identidade da loja presente em cada parte.',
    services: ['Mobilidade urbana', 'Estrada e aventura', 'Oficina e cuidado'], sectionTitle: 'Um caminho para cada ritmo.',
    photoAlt: 'Bicicleta de estrada com quadro preto e detalhes em vermelho.',
  },
  {
    id: 'estetica', name: 'Estética e bem-estar', brand: 'aura', category: 'Bem-estar', style: 'Orgânico e delicado', color: '#e4cec3', ink: '#504938',
    headline: 'Seu tempo.\nSeu cuidado.', intro: 'Um espaço para desacelerar e cuidar de você, no seu ritmo.', action: 'Descubra os cuidados',
    summary: 'Formas orgânicas, uma paleta suave e uma experiência de leitura tranquila.',
    detail: 'A página apresenta os cuidados em linguagem simples, sem promessas de resultados. Formas suaves, fotografia e títulos delicados ajudam a comunicar acolhimento. O visitante pode conhecer as opções de atendimento e entender como iniciar uma conversa para escolher o cuidado mais adequado ao seu momento.',
    services: ['Cuidado facial', 'Rituais para o corpo', 'Uma pausa na rotina'], sectionTitle: 'Pequenos rituais. Mais presença.',
    photoAlt: 'Ambiente de spa com toalhas, pedras e elementos de cuidado pessoal.',
  },
  {
    id: 'confeitaria', name: 'Confeitaria', brand: 'mimo', category: 'Gastronomia', style: 'Afetivo e artesanal', color: '#f1d9d6', ink: '#823b4b',
    headline: 'Todo dia merece\num doce motivo.', intro: 'Bolos, encontros e pequenas delícias feitas para compartilhar.', action: 'Escolha seu mimo',
    summary: 'Cores de confeitaria, títulos delicados e o produto como protagonista.',
    detail: 'A vitrine reúne bolos e doces e orienta quem está planejando uma encomenda. A composição destaca a textura dos produtos e sugere informações sobre sabores, ocasiões e prazo. O contato aparece depois das opções para facilitar a conversa sobre os detalhes de cada comemoração.',
    services: ['Bolos para celebrar', 'Doces para dividir', 'Presentes com afeto'], sectionTitle: 'Feito à mão. Pensado em você.',
    photoAlt: 'Bolo de chocolate decorado com cobertura e frutas.',
  },
  {
    id: 'barbearia', name: 'Barbearia', brand: 'LINHA', category: 'Bem-estar', style: 'Urbano e marcante', color: '#d8ab6d', ink: '#272620',
    headline: 'Seu estilo.\nSem rodeios.', intro: 'Corte, barba e uma boa conversa. O resto fica do lado de fora.', action: 'Conheça os serviços',
    summary: 'Fotografia em alto contraste e tipografia forte, com atitude de barbearia.',
    detail: 'O estudo usa a linguagem gráfica das barbearias para apresentar corte, barba e cuidados. Títulos fortes e fotografia em preto e branco dão personalidade à página. Os serviços aparecem de forma direta e a navegação termina em um convite para combinar o próximo atendimento.',
    services: ['Corte na medida', 'Barba com desenho', 'Acabamento e cuidado'], sectionTitle: 'O detalhe faz o corte.',
    photoAlt: 'Interior de barbearia com cadeiras e espelhos alinhados.',
  },
  {
    id: 'climatizacao', name: 'Ar-condicionado', brand: 'brisa', category: 'Profissionais', style: 'Claro e funcional', color: '#cce4ef', ink: '#174461',
    headline: 'Conforto que\nvocê sente.', intro: 'Instalação e cuidado para deixar cada ambiente na temperatura certa.', action: 'Veja como podemos ajudar',
    summary: 'Azuis leves, navegação direta e serviços organizados para facilitar a escolha.',
    detail: 'Este estudo mostra como uma empresa de ar-condicionado pode explicar instalação, limpeza e conserto sem misturar os serviços. A imagem de um ambiente confortável aproxima o serviço do cotidiano. Cada opção explica seu propósito e orienta a conversa para solicitar uma visita ou um orçamento.',
    services: ['Instalação planejada', 'Limpeza e manutenção', 'Diagnóstico e reparo'], sectionTitle: 'Seu conforto começa aqui.',
    photoAlt: 'Ambiente residencial claro com janelas e decoração acolhedora.',
  },
  {
    id: 'contabilidade', name: 'Contabilidade', brand: 'soma', category: 'Profissionais', style: 'Preciso e contemporâneo', color: '#b8cdc0', ink: '#163f35',
    headline: 'Mais clareza.\nNovos caminhos.', intro: 'Contabilidade próxima de quem empreende. Do primeiro passo à próxima decisão.', action: 'Encontre o seu momento',
    summary: 'Verde profundo, formas geométricas e informações organizadas sem complicação.',
    detail: 'A proposta organiza os serviços pelo momento da empresa: abrir um negócio, cuidar da rotina ou planejar os próximos passos. Elementos gráficos representam organização, sem simular resultados financeiros. Uma linguagem acessível ajuda o visitante a entender o tipo de apoio que pode procurar.',
    services: ['Começar um negócio', 'Organizar a rotina', 'Planejar o próximo passo'], sectionTitle: 'Cada fase pede uma boa parceria.',
  },
]

export const conceptCategories = ['Todos', 'Gastronomia', 'Profissionais', 'Bem-estar', 'Comércio']
