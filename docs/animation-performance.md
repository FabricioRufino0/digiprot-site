# Animações: carrossel e notebook

Verificação local em 02/10/2026, com Playwright, Chromium e servidor Vite na porta 5173. Comparação com viewport de 1440 × 1000, movimento normal, imagens carregadas e sem limitação artificial de CPU ou rede. Os números descrevem esta execução local, não dispositivos reais de visitantes.

| Interação | Antes | Depois |
| --- | ---: | ---: |
| Nova prévia começa a aparecer após Próximo estudo | 477 ms | Primeiro quadro (4 ms na amostra) |
| Cartão central se acomoda após a troca | 765 ms | 298 ms |
| Cena do notebook se acomoda após rolar para 730 px | 648 ms | 160 ms |
| Duração programada da abertura completa | 2,3 s | 1,3 s |

O gargalo observado era a coreografia: `AnimatePresence` aguardava a saída de 460 ms antes da entrada; os cartões laterais trocavam de imagem durante essa espera. O carrossel agora move quatro cartões persistentes e substitui o destino da mola quando uma nova seleção chega. Uma camada escura preserva a opacidade das capturas, e o espaço do texto mantém os controles imóveis. A pequena carga das quatro prévias fica pronta antes da navegação.

O notebook tinha suavização de rolagem de 650 ms, além de uma conclusão forçada da abertura no primeiro movimento de scroll. A suavização caiu para 160 ms, ou 120 ms no celular. A abertura e a rolagem usam propriedades distintas, sem o salto para o final. A flutuação começa depois da montagem.

As duas amostras de movimento tiveram intervalo entre quadros no percentil 95 de 6 ms, sem intervalo acima de 34 ms. Isso sustenta a conclusão sobre atraso programado nesta sessão; não é uma garantia de taxa de quadros em outros computadores.

## Verificação de interação

- Nove cliques em Próximo estudo, separados por 35 ms: Confeitaria, indicador 02/04 e cartão ativo coincidem; permanecem apenas quatro cartões no DOM.
- Os quatro botões de seleção exibem a prévia e o título correspondentes. A linha dos controles mantém a mesma posição vertical.
- Próximo estudo em Bicicletas volta para Climatização.
- Enter em Estudo anterior volta para Bicicletas.
- Arraste para a esquerda em Bicicletas avança para Climatização.
- Viewports de 320 e 390 px mantêm a largura do documento igual à do viewport.
- Movimento reduzido permite trocar as prévias imediatamente e desativa o capítulo prolongado do notebook.
- Pausar movimento alterna para Retomar movimento; retomar restaura o controle de pausa.

Para reproduzir as medidas: abrir `/exemplos/`, aguardar a entrada da seção, acionar Próximo estudo e amostrar a opacidade e a matriz do cartão Confeitaria com `requestAnimationFrame` até se acomodar. Na página principal, aguardar a montagem, rolar instantaneamente para 730 px e amostrar a matriz de `.hero-device-scroll` até parar de mudar.
