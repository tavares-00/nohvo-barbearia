// Executar com Node e Playwright disponíveis no ambiente de desenvolvimento.
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
    const instagram = await page.locator('.instagram-float').boundingBox();
    assert.ok(instagram.x >= 0 && instagram.x + instagram.width < floating.x && instagram.y + instagram.height <= 1000);
    assert.equal(await page.locator('.instagram-float').getAttribute('href'),'https://www.instagram.com/barbearianohvo/');
    const signature = await page.locator('.hero-photo').boundingBox();
    const heading = await page.locator('#hero-title').boundingBox();
    assert.ok(signature.x + signature.width <= width && signature.x >= 0);
    assert.ok((await page.locator('#inicio').boundingBox()).height >= 1000);
    assert.equal(await page.locator('.hero-background').count(),0);
    assert.equal(await page.locator('#profissionais').evaluate(el => getComputedStyle(el).borderTopStyle),'solid');

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
  assert.equal(await page.locator('#hero-video').count(),0);
  assert.equal(await page.locator('.hero-actions .text-link').getAttribute('href'),'#servicos');
  assert.ok(await page.locator('.hero-photo img').evaluate(i => i.complete && i.naturalWidth > 0));
  assert.equal(await page.locator('#cortes').evaluate(el => getComputedStyle(el).backgroundColor),'rgb(255, 255, 255)');
  assert.deepEqual(await page.locator('main > section').evaluateAll(els => els.map(el => el.id)), ['inicio','cortes','servicos','sobre','profissionais','galeria','contato']);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto(url);
  await page.locator('.hero-photo img').evaluate(img => img.decode());
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-photo img')).opacity === '1');
  await page.screenshot({path:'docs/hero-editorial-desktop.png'});

  for (const selector of ['.cut-photo', '.service-list li', '.about-photo', '.person', '.gallery-grid figure', '.contact-grid > div']) {
    const element = page.locator(selector).first();
    await element.scrollIntoViewIfNeeded();
    await page.waitForFunction(sel => getComputedStyle(document.querySelector(sel)).opacity === '1', selector);
  }
  await page.locator('[data-filter="barba"]').click();
  await page.locator('#service-list li').first().scrollIntoViewIfNeeded();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#service-list li')).opacity === '1');
  assert.equal(await page.locator('#service-list li').count(),3);
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.reveal').evaluateAll(els => els.every(el => getComputedStyle(el).opacity === '1')),true);
  await page.setViewportSize({width:375,height:1000});
  await page.goto(url);
  assert.equal(await page.locator('.location-map iframe').count(),1);
  assert.ok((await page.locator('.location-map iframe').getAttribute('src')).startsWith('https://maps.google.com/maps?')); 
  await page.screenshot({path:'docs/hero-photo-mobile.png'});
  const noScript = await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:1000}});
  const fallback = await noScript.newPage();
  await fallback.goto(url);
  assert.equal(await fallback.locator('#hero-title').isVisible(),true);
  assert.equal(await fallback.locator('#cortes').isVisible(),true);
  await noScript.close();
  assert.deepEqual(errors,[]);
  fs.writeFileSync('docs/test-results.json',JSON.stringify({results,audit,errors,filters:'passed',reducedMotion:'passed: content visible and transitions disabled',keyboardSkipLink:'passed',hero:'approved real photo, editorial heading, booking and services CTAs',sectionOrder:'cuts immediately after hero',noJavaScript:'hero and cuts visible',portraits:4,socialLinks:'WhatsApp and Instagram side by side at five widths',reveals:'passed'},null,2));
  console.log('PASS',JSON.stringify(results));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
