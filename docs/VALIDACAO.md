# Validação — 11/10/2026

## Executado

- Edge headless via Playwright, abertura direta de `index.html` com protocolo file.
- Larguras 320, 375, 768, 1024 e 1440 px: sem overflow horizontal.
- Menu nas quatro larguras abaixo de 1100 px: abertura, aria-expanded, fechamento por Escape e seleção de âncora.
- Filtros: Todos 18, Cabelo 9, Barba 3, Combos 1, Cuidados 5; estados aria-pressed conferidos.
- Navegação por teclado: primeiro Tab acessa o link de pular conteúdo; Enter segue para o conteúdo.
- Todos os destinos de âncoras existem; todos os arquivos locais referenciados existem.
- Cinco imagens carregadas, com alt e dimensões explícitas. Lazy-loading fora da abertura.
- Todos os links em nova aba têm noopener. Links externos também têm noreferrer.
- Um único h1; idioma pt-BR; dados estruturados apenas com nome, endereço, telefone e Instagram fornecidos.
- prefers-reduced-motion: scroll automático, sem transições.
- Console: nenhum erro JavaScript ou mensagem de erro durante os testes.
- Contrastes calculados dos pares principais de texto/fundo: 15,08:1 (off-white/marinho), 9,58:1 (texto secundário/marinho), 10,48:1 (champagne/marinho), 12,88:1 (tinta/off-white), 4,91:1 (destaque marrom/off-white), 5,43:1 (texto secundário/off-white).
- Capturas das cinco larguras salvas em `preview-*.png`. Revisão visual da composição desktop e mobile.
- Imagens: conversão de PNG para WebP preservando dimensões e conteúdo. Total entregue: 194.144 bytes.

## Evidências e limites

Resultados automatizados: `test-results.json`. Script: `../scripts/validate.cjs`.

O Edge precisou ser executado fora do sandbox. A conexão HTTP a 127.0.0.1:4173 expirou neste ambiente; os testes foram concluídos por abertura direta do arquivo. Não foi validada uma implantação HTTP/HTTPS.

Os destinos externos usam as URLs fornecidas ou formatos oficiais de telefone, WhatsApp e rota. Não foi verificada a disponibilidade dos serviços externos, nem realizado agendamento ou envio de mensagem.

Verificação de acessibilidade básica, sem certificação WCAG, auditoria integral com leitor de tela ou teste em aparelhos físicos. Não foram executados Lighthouse, Safari ou Firefox. O catálogo e os filtros dependem de JavaScript; sem JavaScript é exibido um link para consultar o catálogo no AppBarber.

Sem publicação, domínio configurado, trackers, cookies ou formulário de coleta de dados.

## Iteração — WhatsApp, vídeo e retratos (11/10/2026)

- Validação repetida no Edge via file:// em 320, 375, 768, 1024 e 1440 px; sem overflow horizontal ou erros de console.
- WhatsApp fixo de 48–52 px dentro da viewport nas cinco larguras; destino conferido, sem enviar mensagem.
- Quatro espaços 3:4 com iniciais decorativas e instruções para inclusão das fotos reais no README.
- Vídeo real fornecido: 8 segundos, 720 × 1280, aproximadamente 2 MB. Testada reprodução muda, pausa, continuação e término sem loop. Ao terminar, transição para a marca oficial estática, pois o vídeo termina sem o logotipo.
- Movimento reduzido: confirmado que o src do vídeo não é carregado. Exibe poster estático.
- Animações de entrada: confirmado conteúdo visível ao entrar na viewport. Sem bibliotecas adicionais.
- Menu, filtros, âncoras, imagens, teclado e links seguros continuaram passando.
- Revisão visual das capturas desktop e mobile, incluindo estado final do vídeo.
- Limites anteriores permanecem: sem teste em aparelhos físicos, Safari, Firefox ou hospedagem HTTP; links externos não visitados.

## Iteração — fachada completa, favicon e título

- Título da aba e título Open Graph: “Nohvo barbearia atibaia”. Confirmado no Edge.
- Favicon SVG autocontido: enquadramento do símbolo da imagem oficial, sem redesenho. Preview renderizado em docs/favicon-preview.png.
- Foto da fachada com altura automática e object-fit: contain. Proporção exibida 0,5612 e original 0,5615 (diferença de arredondamento em pixels); imagem inteira. Captura: docs/gallery-full-facade.png.
- Título da abertura em família geométrica de sistema (Century Gothic, Futura, Avenir Next, Arial), maiúsculas sem itálico. Não é a fonte original confirmada da marca; aparência pode variar conforme fontes disponíveis no dispositivo.
- Verificação no Edge nas cinco larguras: sem overflow e sem erros de console. Menu, filtros, WhatsApp, vídeo e movimento reduzido passaram. Revisão visual desktop e mobile.

## Refinamento — foto do Sobre e abertura

Foto do Sobre exibida inteira, com altura automática e proporção original. Título: Nohvo Barbearia Atibaia. Controle de pausa removido conforme solicitado. O vídeo original permanece em 720 × 1280, sem reencodificação ou aumento artificial de resolução; sua área de exibição desktop foi limitada a 640 px de largura para reduzir ampliação. A reprodução a 1,65× dura aproximadamente 4,85 segundos e termina na marca estática. Se autoplay falhar ou movimento reduzido estiver ativo, permanece a imagem estática. Não há promessa de recuperação de detalhes inexistentes no arquivo; para resolução superior é necessário um original de maior qualidade.

Adicionados acabamento de borda na foto e sublinhado discreto no hover/foco da navegação. Verificação repetida em cinco larguras no Edge: layout sem overflow, menu, filtros, WhatsApp e reprodução sem loop; título e ausência do botão conferidos. Resultados em test-results.json. Limites de navegador e hospedagem documentados acima continuam aplicáveis.

## Galeria de cortes — 11/10/2026

Nova seção #cortes com três fotos do perfil oficial, imagens locais WebP responsivas, dimensões e lazy-loading. Publicações e procedência em MIDIAS_INSTAGRAM.md. Imagens preservadas por inteiro; links abrem os posts originais. Incluído item Cortes no menu e mantidas as demais seções.

Teste Edge/file:// repetido em 320, 375, 768, 1024 e 1440 px: sem overflow ou erros de console, imagens carregadas, âncoras válidas, menu e filtros passando. Vídeo, movimento reduzido e WhatsApp preservados. Revisão visual das capturas cortes-desktop.png e cortes-mobile.png. Não houve publicação.

## Revisão — 12/10/2026: cortes em destaque e conteúdo direto

- Nova ordem confirmada por teste: Início, Cortes, Serviços, Sobre, Profissionais, Galeria e Contato. Menu acompanha a sequência.
- Hero com foto real responsiva e gradiente. Sem vídeo carregado. Imagem derivada da publicação DeKblAhv9F5; original preservado, sem conteúdo gerado.
- Textos genéricos substituídos por serviços, localização e instruções de agendamento. Título da aba preservado: Nohvo Barbearia Atibaia.
- Entradas individuais com IntersectionObserver, translate/opacity e pequenos atrasos; sem bloquear rolagem. Fotos, serviços, equipe e contato verificados visíveis ao entrar na viewport.
- Testes Edge/file:// em 320, 375, 768, 1024 e 1440 px: sem overflow, imagens carregadas, menu/Escape/âncoras, filtros e WhatsApp passando, sem erros de console.
- Movimento reduzido: conteúdo visível e transições desativadas, inclusive ao mudar a preferência durante a visita. Filtros continuam revelando serviços após renderização.
- Abertura e seção de cortes visíveis com JavaScript desativado. Os serviços ainda usam JavaScript e o fallback para AppBarber permanece.
- Capturas atualizadas em preview-*.png; abertura em hero-photo-desktop.png e hero-photo-mobile.png. Revisão visual concluída.
- Guia de SEO em SEO.md. Domínio, indexação real, Search Console, hospedagem e Perfil da Empresa não configurados nem testados.

## Foto + vídeo e redes sociais — 12/10/2026

- Cortes com fundo branco (#fff), texto marinho, títulos e legendas em marrom de contraste legível, CTA marinho.
- Foto de corte continua como base integral do hero. Vídeo original da marca sobreposto em área pequena, com composição screen e bordas suaves; no celular fica acima do título. O vídeo não substitui a foto e não tem controles.
- Reprodução muda, única e com duração efetiva aproximada de 4,85 s; encerra na marca estática. Sem carregamento de src quando movimento reduzido está ativo. Falha de autoplay preserva a versão estática.
- Instagram à esquerda do WhatsApp, ambos fixos com labels acessíveis, foco visível e links seguros.
- Edge/file:// nas cinco larguras: sem overflow, botões dentro da tela e separados, animação sem sobreposição com o título, fundo branco verificado. Console sem erros, menu/filtros/âncoras preservados. Reprodução até o fim, muted, ausência de loop e de controles verificados.
- Capturas: hero-combined-desktop.png, hero-photo-mobile.png e preview-*.png. Revisão visual desktop/mobile concluída. Não realizado teste de aparelhos físicos ou publicação.

## Hero em tela cheia, divisória e Google Maps — 12/10/2026

- Hero ocupa no mínimo 100svh, com fallback 100vh. Somente vídeo oficial da marca e poster estático; foto de corte removida da abertura e preservada na galeria/arquivos. Texto maior e CTA secundário contornado; referência usada apenas para composição, sem copiar fotos ou informações comerciais.
- Em desktop, texto e marca lado a lado; no celular, marca acima e texto abaixo. Reprodução única, muda, breve e respeitando movimento reduzido, conforme configuração anterior.
- Borda entre Sobre e Profissionais com detalhe champagne de 3 px. Verificado estilo solid.
- Google Maps incorporado ao final do contato, lazy-loading, título acessível, dimensão reservada e rota externa alternativa. Consulta pelo endereço confirmado; sem coordenadas inventadas.
- Mapa efetivamente carregado no Edge; conferida visualmente a identificação “R. Nova Atibaia, 20”, Nova Cerejeira, Atibaia/SP, 12950-600. Captura em location-map.png. É conteúdo externo do Google e depende de internet.
- Testes nas cinco larguras: hero com altura mínima da viewport, ausência de foto no hero, sem overflow, navegação e filtros preservados, sem erros de console. Capturas fullscreen-hero.png e hero-photo-mobile.png revisadas. Sem publicação.
