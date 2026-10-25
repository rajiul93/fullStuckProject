import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public/images/project/dream');
const chrome =
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : undefined);
const browser = await chromium.launch({
  headless: true,
  ...(chrome ? { executablePath: chrome } : {}),
});
try {
  await mkdir(output, { recursive: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.goto('https://dreamtourism.co.uk/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });
  await page.waitForFunction(
    () =>
      Array.from(document.querySelectorAll('h1')).some((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.width < 50 || rect.height < 10 || rect.top > innerHeight)
          return false;
        for (
          let node = heading;
          node && node !== document.body;
          node = node.parentElement
        )
          if (Number(getComputedStyle(node).opacity) < 0.99) return false;
        return true;
      }),
    null,
    { timeout: 30000 },
  );
  await page.evaluate(() => document.fonts.ready);
  await page
    .waitForLoadState('networkidle', { timeout: 15000 })
    .catch(() => undefined);
  await page
    .waitForFunction(
      () =>
        Array.from(document.images)
          .filter(
            (image) =>
              image.currentSrc &&
              image.getBoundingClientRect().top < innerHeight &&
              image.getBoundingClientRect().width > 80,
          )
          .every((image) => image.complete && image.naturalWidth > 0),
      null,
      { timeout: 15000 },
    )
    .catch(() => undefined);
  const capture = path.join(output, 'dream-tourism-uk-desktop.png');
  await page.screenshot({ path: capture });
  const image = `data:image/png;base64,${(await readFile(capture)).toString('base64')}`;
  const mockup = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 1,
  });
  await mockup.setContent(`<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; } body { margin: 0; font-family: Arial, sans-serif; }
  .artboard { position: relative; width: 1440px; height: 960px; overflow: hidden; color: #f4f7fb; background: radial-gradient(ellipse at 85% 5%, #3162a14d, transparent 60%), radial-gradient(ellipse at 5% 100%, #617da324, transparent 65%), #101b2b; }
  .heading { position: absolute; top: 42px; left: 65px; } h1 { margin: 0; font-size: 34px; letter-spacing: -.7px; } .heading p { font-size: 13px; color: #a5b8cd; margin-top: 10px; }
  .domain { position: absolute; top: 62px; right: 65px; font-size: 12px; color: #9cb2ce; letter-spacing: 1.4px; }
  .browser { position: absolute; left: 63px; right: 63px; top: 137px; height: 728px; overflow: hidden; border-radius: 14px; border: 1px solid #7792b35c; background: white; box-shadow: 0 35px 85px #0008; transform: perspective(2400px) rotateX(1deg); }
  .chrome { position: relative; display: flex; align-items: center; gap: 6px; height: 37px; padding-inline: 15px; background: #e7edf4; border-bottom: 1px solid #cfd9e4; }
  .chrome i { width: 7px; height: 7px; border-radius: 50%; background: #fa7c73; } .chrome i:nth-child(2) { background: #efc153; } .chrome i:nth-child(3) { background: #65bf83; }
  .address { position: absolute; left: 32%; top: 7px; display: grid; place-items: center; width: 36%; height: 23px; border: 1px solid #d8e1eb; border-radius: 5px; background: #f8fbfd; color: #647b94; font-size: 10px; }
  img { width: 100%; height: auto; display: block; }
  footer { position: absolute; bottom: 42px; left: 68px; right: 68px; display: flex; justify-content: space-between; align-items: center; color: #90a9c4; font-size: 10px; letter-spacing: 1.7px; }
  footer div { display: flex; gap: 8px; letter-spacing: .3px; } footer span { padding: 8px 12px; border: 1px solid #415b78; border-radius: 5px; background: #1b2c42; color: #bfd0e3; }
  </style></head><body><main class="artboard"><header class="heading"><h1>Dream Tourism UK</h1><p>European tours &amp; UK day trips</p></header><div class="domain">DREAMTOURISM.CO.UK</div><section class="browser"><div class="chrome"><i></i><i></i><i></i><div class="address">dreamtourism.co.uk</div></div><img alt="Actual Dream Tourism UK homepage" src="${image}"></section><footer>TRAVEL &amp; TOUR DISCOVERY<div><span>Destination search</span><span>UK &amp; Europe</span><span>Tour collections</span></div></footer></main></body></html>`);
  await mockup.evaluate(() =>
    Promise.all(Array.from(document.images).map((image) => image.decode())),
  );
  await mockup.screenshot({
    path: path.join(output, 'dream-tourism-uk-thumbnail.png'),
  });
  console.log(
    'Captured Dream Tourism UK desktop UI and created its thumbnail.',
  );
} finally {
  await browser.close();
}
