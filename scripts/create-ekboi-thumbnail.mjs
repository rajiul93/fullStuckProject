import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Capture actual public UI, then render a browser/phone composition in HTML/CSS.
// No generated UI, substituted dashboard results, or authenticated screens are used.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/images/project');
const chrome =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : undefined);
const browser = await chromium.launch({
  headless: true,
  ...(chrome ? { executablePath: chrome } : {}),
});
await mkdir(output, { recursive: true });

async function ready(page) {
  await page.goto('https://www.ekboi.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page
    .getByRole('heading', { level: 1 })
    .waitFor({ state: 'visible', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  await page
    .waitForLoadState('networkidle', { timeout: 12000 })
    .catch(() => undefined);
  // Await visible images, not the page's endlessly animated/provider sections.
  await page.waitForFunction(
    () =>
      Array.from(document.images)
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          return rect.top < innerHeight && rect.width > 100;
        })
        .every((image) => image.complete && image.naturalWidth > 0),
    null,
    { timeout: 20000 },
  );
}

try {
  const desktop = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await ready(desktop);
  const desktopPath = path.join(output, 'ekboi-desktop.png');
  await desktop.screenshot({ path: desktopPath });
  const templates = desktop.getByRole('heading', {
    name: '৫টি কারণে Ekboi সম্পূর্ণ আলাদা',
    exact: true,
  });
  await templates.waitFor({ state: 'visible', timeout: 20000 });
  await templates.evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 130,
      behavior: 'instant',
    }),
  );
  await desktop
    .waitForFunction(
      () =>
        Array.from(document.images)
          .filter((image) => {
            const rect = image.getBoundingClientRect();
            return (
              image.currentSrc &&
              rect.top >= 0 &&
              rect.top < innerHeight &&
              rect.width > 80
            );
          })
          .every((image) => image.complete && image.naturalWidth > 0),
      null,
      { timeout: 15000 },
    )
    .catch(() => undefined);
  await desktop.screenshot({
    path: path.join(output, 'ekboi-learning.png'),
  });
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  const mobile = await mobileContext.newPage();
  await ready(mobile);
  const mobilePath = path.join(output, 'ekboi-mobile.png');
  await mobile.screenshot({ path: mobilePath });
  const desktopImage = `data:image/png;base64,${(await readFile(desktopPath)).toString('base64')}`;
  const mobileImage = `data:image/png;base64,${(await readFile(mobilePath)).toString('base64')}`;
  const mockup = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  await mockup.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; } body { margin: 0; font-family: Arial, sans-serif; }
    .artboard { position: relative; width: 1440px; height: 960px; overflow: hidden; background: radial-gradient(ellipse at 85% 10%, #20534277, transparent 55%), radial-gradient(ellipse at 5% 95%, #299e6a18, transparent 60%), #101b29; color: #eff4f7; }
    .grid { position: absolute; inset: 0; opacity: .14; background-image: linear-gradient(#6c859955 1px, transparent 1px), linear-gradient(90deg, #6c859955 1px, transparent 1px); background-size: 70px 70px; mask-image: radial-gradient(ellipse, black, transparent 75%); }
    .heading { position: absolute; top: 38px; left: 62px; display: flex; align-items: center; gap: 19px; }
    .mark { display: grid; place-items: center; width: 49px; height: 49px; border: 1px solid #6dd6a966; border-radius: 13px; background: #6dd6a912; color: #80e5b8; }
    .heading h1 { font-size: 30px; margin: 0; letter-spacing: -.6px; font-weight: 700; }
    .heading p { font-size: 12px; margin: 7px 0 0; color: #9badbf; letter-spacing: .3px; }
    .domain { position: absolute; right: 66px; top: 58px; font-size: 12px; color: #9badbf; letter-spacing: 1.2px; }
    .desktop { position: absolute; left: 63px; top: 132px; width: 1214px; height: 726px; overflow: hidden; background: white; border-radius: 15px; border: 1px solid #8b9eae66; box-shadow: 0 38px 85px #0007, 0 4px 16px #0004; transform: perspective(2400px) rotateY(-3deg) rotateX(1deg); transform-origin: center; }
    .chrome { display: flex; align-items: center; height: 37px; gap: 6px; padding: 0 15px; background: #e8edf2; border-bottom: 1px solid #d3dce3; }
    .chrome > span { width: 7px; height: 7px; border-radius: 50%; background: #fc766d; } .chrome > span:nth-child(2) { background: #f4bf4f; } .chrome > span:nth-child(3) { background: #62bd78; }
    .url { position: absolute; left: 31%; top: 7px; width: 38%; height: 23px; display: grid; place-items: center; color: #617283; border: 1px solid #dce3e9; background: #f7fafc; border-radius: 5px; font-size: 9px; }
    .desktop img { display: block; width: 100%; height: auto; }
    .phone { position: absolute; top: 304px; right: 49px; width: 248px; height: 536px; overflow: hidden; background: #0e1520; border: 7px solid #152335; border-radius: 35px; box-shadow: 0 27px 50px #0008, 0 0 0 1px #7d92a56b; transform: rotate(3deg); }
    .phone img { display: block; width: 100%; min-height: 100%; object-fit: cover; object-position: top; }
    .phone::before { content: ''; position: absolute; top: 0; left: 50%; width: 83px; height: 18px; background: #152335; transform: translateX(-50%); border-radius: 0 0 12px 12px; z-index: 1; }
    .phone::after { content: ''; position: absolute; bottom: 7px; left: 50%; width: 77px; height: 4px; background: #e5eaf4c9; transform: translateX(-50%); border-radius: 5px; }
    .bottom { position: absolute; bottom: 45px; left: 68px; right: 68px; display: flex; align-items: center; justify-content: space-between; color: #8298ad; font-size: 10px; letter-spacing: 2.2px; }
    .chips { display: flex; gap: 9px; letter-spacing: .4px; } .chips span { padding: 8px 13px; border: 1px solid #455b6e; background: #1d2d3e; color: #c0cedb; border-radius: 6px; font-size: 10px; }
  </style></head><body><main class="artboard"><div class="grid"></div><div class="heading"><span class="mark"><svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5C8 2 4 3 2 4v15c3-1 6-1 10 2 4-3 7-3 10-2V4c-2-1-6-2-10 1Zm0 0v16M5 8l4 1M5 12l4 1M15 9l4-1M15 13l4-1"/></svg></span><div><h1>Ekboi</h1><p>Adaptive learning & exam preparation</p></div></div><span class="domain">EKBOI.COM</span><section class="desktop"><div class="chrome"><span></span><span></span><span></span><div class="url">www.ekboi.com</div></div><img alt="Actual Ekboi desktop homepage" src="${desktopImage}"></section><aside class="phone"><img alt="Actual Ekboi mobile homepage" src="${mobileImage}"></aside><div class="bottom"><span>EDUCATION &amp; PRACTICE PLATFORM</span><div class="chips"><span>Practice</span><span>Spaced repetition</span><span>Bangla UI</span></div></div></main></body></html>`);
  await mockup.evaluate(() =>
    Promise.all(Array.from(document.images).map((image) => image.decode())),
  );
  const thumbnailPath = path.join(output, 'ekboi-thumbnail.png');
  await mockup.screenshot({ path: thumbnailPath });
  for (const file of [thumbnailPath, desktopPath, mobilePath]) {
    console.log(
      `${path.relative(root, file)} (${Math.round((await stat(file)).size / 1024)} KB)`,
    );
  }
} finally {
  await browser.close();
}
