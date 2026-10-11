'use strict';
const bookingUrl = 'https://sites.appbarber.com.br/barbearianohvo-urbb';
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const list = document.querySelector('#service-list');
const count = document.querySelector('#service-count');
const filters = document.querySelector('.filters');
function renderServices(category = 'all') {
  const services = window.NOHVO_SERVICES.filter(service => category === 'all' || service.category === category);
  list.replaceChildren(...services.map(service => {
    const item = document.createElement('li');
    const info = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = service.name;
    const time = document.createElement('span');
    time.className = 'service-duration';
    time.textContent = `${service.minutes} min`;
    info.append(title, time);
    const action = document.createElement('div');
    action.className = 'service-action';
    const price = document.createElement('span');
    price.className = 'service-price';
    price.textContent = service.price === null ? 'Preço a confirmar' : `${service.from ? 'A partir de ' : ''}${currency.format(service.price)}`;
    const link = document.createElement('a');
    link.className = 'service-book';
    link.href = bookingUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Agendar ${service.name} pelo AppBarber (abre em nova aba)`);
    link.textContent = '↗';
    action.append(price, link);
    item.append(info, action);
    return item;
  }));
  count.textContent = `${services.length} serviços`;
}
renderServices();
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderServices(button.dataset.filter);
});
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.hidden = false;
document.documentElement.classList.add('js');
function closeMenu(restoreFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  const anchor = event.target.closest('a');
  if (!anchor) return;
  closeMenu();
  const section = document.querySelector(anchor.hash);
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.querySelector('.site-header').addEventListener('focusout', event => {
  if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
});
window.matchMedia('(min-width: 1100px)').addEventListener('change', () => closeMenu());
document.querySelector('#year').textContent = new Date().getFullYear();

// Uma reprodução por carregamento. Sem autoplay quando há preferência por menos movimento.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector('#hero-video');
let videoFinished = false;
function finishHeroVideo() {
  videoFinished = true;
  heroVideo.classList.add('is-finished');
}
function startHeroVideo() {
  if (motionPreference.matches || videoFinished) return;
  if (!heroVideo.getAttribute('src')) heroVideo.src = heroVideo.dataset.src;
  heroVideo.muted = true;
  // Uma abertura decorativa de menos de cinco segundos.
  heroVideo.playbackRate = 1.65;
  heroVideo.play().catch(finishHeroVideo);
}
heroVideo.addEventListener('ended', finishHeroVideo);
heroVideo.addEventListener('error', finishHeroVideo);
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    heroVideo.pause();
    finishHeroVideo();
  } else startHeroVideo();
});
startHeroVideo();

// Conteudo acessivel sem observer e com movimento reduzido.
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .about-grid, .person, .gallery-grid, .contact-grid').forEach(element => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
