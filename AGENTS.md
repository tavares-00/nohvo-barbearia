# AGENTS.md — Nohvo Barbearia

## Missão
Construir e manter um site comercial premium, responsivo, acessível e rápido para a Nohvo Barbearia, em Atibaia/SP. Priorizar identidade visual autêntica e conversão para agendamentos externos.

## Verdade e conteúdo
- Não inventar fotografias, depoimentos, avaliações, prêmios, profissionais, horários, promoções, especialidades ou informações comerciais.
- Utilizar somente imagens reais fornecidas e autorizadas; frames extraídos do vídeo devem ser fiéis ao original. Não gerar ambientes ou pessoas fictícias.
- Não reutilizar imagens de referência como se fossem imagens da Nohvo.
- Dados pendentes devem ficar documentados em `docs/PENDENCIAS.md`, sem criar fatos fictícios.
- Profissionais confirmados: Felipe, Guilherme, Leonardo e Mario. Não atribuir fotos ou especialidades sem identificação.
- Não inserir imagem ou card chamado “Recepção” sem solicitação explícita.
- Não adicionar o selo com ícone N e texto “Precisão no corte. Personalidade no resultado.” à abertura.

## Identidade
- Referência: logotipo oficial fornecido pelo usuário.
- Base visual: azul-marinho profundo e champagne/prata, com tipografia editorial sofisticada, contraste legível e microinterações discretas.
- Evitar templates genéricos, excesso de gradientes, carrosséis automáticos e animações que prejudiquem performance.
- Não redesenhar nem modificar a marca sem aprovação.

## Produto e navegação
- Site single-page com seções Início, Sobre, Serviços, Profissionais, Galeria, Localização/Contato.
- CTA principal: Agendar horário em https://sites.appbarber.com.br/barbearianohvo-urbb
- Links externos com segurança adequada; não afirmar disponibilidade de horários sem consulta real.
- WhatsApp comercial informado: (11) 96737-7994. Instagram: https://www.instagram.com/barbearianohvo/
- Endereço informado: R. Nova Atibaia, 20, Nova Cerejeira, Atibaia/SP, 12950-600.
- Horários completos não confirmados; não inventar.

## Engenharia
- Preferir HTML semântico, CSS modular e JavaScript simples, sem dependências desnecessárias.
- Organizar código em `index.html`, `css/`, `js/`, `assets/` e `docs/`.
- Usar caminhos relativos consistentes, respeitar maiúsculas/minúsculas, não depender de caminhos locais absolutos.
- Imagens otimizadas, dimensões explícitas, lazy-loading fora da primeira dobra e formatos modernos quando apropriado.
- Responsividade: testar 320, 375, 768, 1024 e 1440 px; sem overflow horizontal.
- Acessibilidade: navegação por teclado, foco visível, contraste, labels, alt apropriado, prefers-reduced-motion.
- SEO local: title, description, canonical apenas com domínio confirmado, Open Graph e dados estruturados apenas com fatos confirmados.
- Não incluir trackers/cookies desnecessários nem coletar dados pessoais sem finalidade e aviso adequados.
- Não publicar, hospedar, comprar domínio ou alterar visibilidade sem aprovação expressa.

## Fluxo de trabalho
1. Inspecionar arquivos existentes e listar recursos disponíveis antes de codificar.
2. Criar plano curto e registrar pendências.
3. Implementar a menor versão completa e funcional antes de efeitos adicionais.
4. Executar verificações de links locais, arquivos de imagem, console, navegação, responsividade e acessibilidade básica quando houver ferramentas disponíveis.
5. Não declarar testes executados se não foram executados; registrar limites e próximos passos.
6. Preservar funcionalidades existentes em alterações futuras e evitar mudanças não solicitadas.
7. Entregar resumo objetivo dos arquivos alterados, testes e pendências.
