# Nohvo Barbearia

Site estático, sem framework, instalação ou build. Abra `index.html` com um navegador (duplo clique). CSS, JavaScript e imagens usam caminhos relativos e funcionam por abertura direta.

Para servir localmente, se Python estiver no PATH: `python -m http.server 4173 --bind 127.0.0.1`, nesta pasta. Acesse http://127.0.0.1:4173. Encerre com Ctrl+C.

## Manutenção

- `index.html`: conteúdo, contato, metadados e dados estruturados.
- `css/styles.css`: identidade visual, componentes e responsividade.
- `js/services.js`: fonte única dos 18 serviços; `price` em reais, `minutes` em minutos, `from: true` para preços iniciais e `null` para preço pendente.
- `js/main.js`: renderização, filtros e navegação. Nenhum serviço é pré-selecionado no AppBarber: a escolha ocorre na plataforma externa.
- `assets/images/`: cinco imagens fornecidas, reencodificadas em WebP sem alteração do conteúdo ou dimensões. Enquadramento visual feito por CSS. Logo exibida com recorte do espaço periférico, sem redesenhar a marca.
- `docs/PENDENCIAS.md`: informações a confirmar.
- `docs/VALIDACAO.md`: evidências e limites da verificação.
- `scripts/validate.cjs`: teste de navegador com Node, Playwright e Edge instalados; não é dependência do site. Execute `node scripts/validate.cjs` com Playwright resolvível pelo Node.
- `scripts/optimize_images.py`: registro da conversão inicial; requer Pillow e os arquivos originais nos caminhos de origem. O site não depende desses caminhos.

## Publicação

Não publicado. Após autorização, servir `index.html`, `css/`, `js/` e `assets/` no mesmo diretório. Não disponibilizar scripts ou evidências de testes como conteúdo público. Confirmar domínio para canonical, og:url e imagem social absoluta. Não há analytics, cookies ou coleta própria de dados. Fontes do sistema, sem downloads externos. Agendamento externo no AppBarber.

## Vídeo, movimento e fotos dos profissionais

- `css/enhancements.css`: estilos desta iteração separados dos estilos originais.
- `assets/video/nohvo-abertura.mp4`: vídeo original fornecido, 8 segundos, 720 × 1280, 2.013.067 bytes. Reproduz uma vez por carregamento, sem áudio e sem loop; ao terminar, a marca oficial estática permanece, porque o vídeo termina sem o logotipo. Controle permite pausar e continuar. Se autoplay for bloqueado, o controle permite iniciar. Com movimento reduzido, mostra o poster e não carrega o vídeo.
- Animações de entrada usam CSS e IntersectionObserver, sem bibliotecas. São desativadas por prefers-reduced-motion. O conteúdo continua acessível sem JavaScript.
- WhatsApp fixo: `https://wa.me/5511967377994`, sem mensagem automática ou envio de dados.
- Retratos: espaços 3:4 com iniciais decorativas até o recebimento de fotos reais identificadas. Não há perfis individuais do Instagram.

Para incluir uma foto, salve o WebP em `assets/images/team/` e localize o elemento `.person-portrait` pelo atributo `data-professional` em `index.html`. Remova `aria-hidden="true"` desse elemento e substitua seus dois spans por uma imagem. Exemplo para Felipe:

```html
<div class="person-portrait" data-professional="felipe">
  <img src="assets/images/team/felipe.webp" width="600" height="800" alt="Felipe, profissional da Nohvo Barbearia" loading="lazy">
</div>
```

Use as dimensões reais do arquivo e ajuste `object-position` individualmente caso necessário. Os nomes de arquivo acima são exemplos; nenhuma foto inexistente é carregada.


O favicon fica em `assets/favicon.svg` e incorpora a imagem original da marca com enquadramento do símbolo. O título da aba está em `index.html`. A fonte da abertura usa fontes de sistema, sem download externo; pode variar conforme o dispositivo. A foto da fachada na galeria mantém a proporção completa, com altura automática.

### Estado atual da abertura

O controle de pausa foi removido a pedido do usuário. A reprodução automática muda acontece uma vez, a 1,65× (aproximadamente 4,85 s), seguida da marca estática. Bloqueio de autoplay resulta na imagem estática. A área desktop do vídeo tem no máximo 640 px de largura; o arquivo original 720p foi preservado, sem upscale. Estas instruções substituem as notas anteriores sobre o botão de reprodução/pausa. Título atual: Nohvo Barbearia Atibaia.

### Fotos de cortes

A seção #cortes em index.html usa imagens de assets/images/cortes/, em duas larguras WebP com srcset. Fotos completas, sem cortes de enquadramento. Consulte docs/MIDIAS_INSTAGRAM.md para os links originais e a procedência. Ao substituir, atualize src, srcset, dimensões, descrição alt e link da publicação correspondente.

## Estado atual — 12/10/2026

A abertura usa fotografia real de corte com gradiente, substituindo o vídeo. O MP4 foi preservado nos arquivos para eventual uso futuro, mas não é carregado pelo site. O catálogo de cortes vem imediatamente após a abertura, seguido por Serviços, Sobre, Profissionais, Galeria e Contato. `css/enhancements.css` concentra a composição atual; `js/main.js` aplica entradas individuais por IntersectionObserver e respeita mudanças de prefers-reduced-motion. Para SEO e publicação futura, consulte `docs/SEO.md`. Estas notas substituem as descrições anteriores do comportamento do vídeo.

### Composição atual do hero e atalhos sociais

Foto real como base + vídeo da marca sobreposto em `.hero-signature`, com mesclagem screen e bordas suavizadas. Em celular a marca aparece acima do título. Reprodução única, muda e breve; movimento reduzido/autoplay bloqueado mantém a marca estática. Estes detalhes substituem a nota anterior de que o vídeo não é carregado. A seção Cortes é branca. `.social-float` agrupa Instagram e WhatsApp lado a lado no canto inferior direito.

### Estado atual: hero em tela cheia e mapa

A abertura agora ocupa no mínimo a altura da tela e usa somente o vídeo oficial da marca, com poster estático, sem a fotografia de corte. O vídeo permanece mudo, breve e sem repetição. A foto continua na seção Cortes. O contato inclui iframe Google Maps com endereço confirmado, carregamento diferido e link de rota alternativo. Esse mapa carrega conteúdo externo do Google e depende de conexão; substitui a situação anterior sem incorporações externas. Sobre e Profissionais têm uma divisória visível.
