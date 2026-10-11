// Executar com Node e Playwright disponÃ­veis no ambiente de desenvolvimento.
const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const url = pathToFileURL(path.resolve('index.html')).href;
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage();
  await page.emulateMedia({reducedMotion:'reduce'});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto(url);
  await page.locator('#service-list li').last().waitFor();
  assert.equal(await page.locator('#service-list li').count(), 18);
  assert.equal(await page.title(), 'Nohvo Barbearia Atibaia');
  const results = [];
  for (const width of [320,375,768,1024,1440]) {
    await page.setViewportSize({width,height:1000});
    await page.evaluate(() => document.fonts.ready);
    const photo = await page.locator('.about-photo img').evaluate(i => ({ratio:i.getBoundingClientRect().width/i.getBoundingClientRect().height,original:i.width/i.height}));
    assert.ok(Math.abs(photo.ratio-photo.original)<0.01);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    assert.equal(overflow, false, `Overflow at ${width}`);
    const floating = await page.locator('.whatsapp-float').boundingBox();
    assert.ok(floating.x >= 0 && floating.x + floating.width <= width && floating.y + floating.height <= 1000);
    assert.equal(await page.locator('.whatsapp-float').getAttribute('href'),'https://wa.me/5511967377994');
    assert.equal(await page.locator('.person-portrait').count(),4);
    if (width < 1100) {
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      await page.locator('.menu-toggle').click();
      await page.locator('#navigation a[href="#servicos"]').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
    }
    await page.evaluate(async () => {
      for (const img of document.images) img.loading = 'eager';
      await Promise.all([...document.images].map(img => img.decode()));
      document.activeElement.blur();
      window.scrollTo(0,0);
    });
    await page.screenshot({path:`docs/preview-${width}.png`,fullPage:true});
    results.push({width, overflow, menu: width < 1100 ? 'open, Escape and anchor passed' : 'desktop navigation'});
  }
  for (const [category, amount] of [['barba',3],['cabelo',9],['combos',1],['cuidados',5],['all',18]]) {
    await page.locator(`[data-filter="${category}"]`).click();
    assert.equal(await page.locator('#service-list li').count(), amount);
    assert.equal(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed'),'true');
  }
  const audit = await page.evaluate(() => ({
    brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.querySelector(a.hash)).map(a => a.hash),
    failedImages: [...document.images].filter(i => !i.complete || !i.naturalWidth || !i.alt || !i.width || !i.height).map(i => i.src),
    unsafeLinks: [...document.querySelectorAll('a[target="_blank"]')].filter(a => !a.rel.includes('noopener')).map(a => a.href),
    headingCount: document.querySelectorAll('h1').length
  }));
  assert.deepEqual(audit.brokenAnchors,[]);
  assert.deepEqual(audit.failedImages,[]);
  assert.deepEqual(audit.unsafeLinks,[]);
  assert.equal(audit.headingCount,1);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  await page.goto(url);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className),'skip-link');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => location.hash),'#conteudo');
  assert.equal(await page.locator('#hero-video').getAttribute('src'),null);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(url);
  await page.waitForFunction(() => document.querySelector('video').currentTime > 0.2);
  assert.equal(await page.locator('.video-control').count(),0);
  await page.waitForFunction(() => document.querySelector('video').ended, { timeout: 15000 });
  assert.equal(await page.locator('video').evaluate(v => v.loop),false);
  assert.equal(await page.locator('video').evaluate(v => v.muted),true);
  assert.ok(await page.locator('video').evaluate(v => v.duration / v.playbackRate <= 5));
  await page.waitForTimeout(600);
  assert.equal(await page.locator('video').evaluate(v => v.ended),true);
  await page.screenshot({path:'docs/hero-video-desktop.png'});
  await page.setViewportSize({width:375,height:1000});
  await page.screenshot({path:'docs/hero-video-mobile.png'});
  await page.locator('#profissionais').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  assert.equal(await page.locator('.person').first().evaluate(el => getComputedStyle(el).opacity),'1');
  assert.deepEqual(errors,[]);
  fs.writeFileSync('docs/test-results.json',JSON.stringify({results,audit,errors,filters:'passed',reducedMotion:'passed: no video source loaded',keyboardSkipLink:'passed',video:'muted playback under five seconds, no pause button, end without loop passed',portraits:4,whatsapp:'visible in viewport at five widths',reveals:'passed'},null,2));
  console.log('PASS',JSON.stringify(results));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
