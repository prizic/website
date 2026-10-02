import { chromium } from "playwright-core";
import fs from "node:fs";
import os from "node:os";

const svg = fs.readFileSync(new URL("../../public/brand/prizic-mark-on-light.svg", import.meta.url), "utf8")
  .replace(/fill="#[0-9A-Fa-f]+"/g, 'fill="currentColor" stroke="currentColor" stroke-width="40" stroke-linejoin="round"')
  .replace(/<title[\s\S]*?<\/desc>/, "")
  .replace(/width="500" height="500"/, 'class="mark"');

const FPS = 30, LOOP = 3.6;
const clamp = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => 1 - Math.pow(1 - clamp(x), 3);
const ramp = (t, a, b) => ease((t - a) / (b - a));
const exe = `${os.homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const browser = await chromium.launch({ executablePath: fs.existsSync(exe) ? exe : undefined });

for (const [name, fg, bg] of [["black-on-white", "#000", "#fff"], ["white-on-black", "#fff", "#000"]]) {
  const page = await browser.newPage({ viewport: { width: 600, height: 240 }, deviceScaleFactor: 2 });
  await page.setContent(`<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=block" rel="stylesheet">
<style>
html,body{margin:0;height:100%;background:${bg};color:${fg}}
body{display:grid;place-items:center}
.logo{display:inline-flex;align-items:center;gap:1.4rem}
.mark{width:5.6rem;height:5.6rem}
.word{display:inline-flex;font-family:"Space Grotesk",sans-serif;font-size:5.1rem;font-weight:500;letter-spacing:-0.04em;line-height:1}
.identity-i,.z{position:relative;display:inline-block}
.identity-i__stem{display:inline-block;clip-path:inset(27% -10% -10%)}
.eye{position:absolute;inset-block-start:.13em;inset-inline-start:50%;inline-size:.095em;block-size:.095em;border-radius:50%;background:currentColor;transform:translateX(-50%)}
.smile{position:absolute;left:50%;top:58%;width:.4em;transform:translate(-50%,-50%);overflow:visible;fill:none;stroke:currentColor;stroke-linecap:round;stroke-width:10}
@keyframes prizic-eye-blink{0%,34%,58%,100%{transform:translateX(-50%) scaleY(1)}44%,50%{transform:translateX(-50%) scaleY(.08)}}
</style></head><body><span class="logo">${svg}<span class="word"><span>Pr</span><span class="identity-i"><span class="identity-i__stem">i</span><span class="eye"></span></span><span class="z"><span class="zg">z</span><svg class="smile" viewBox="0 0 48 18"><path pathLength="1" stroke-dasharray="1" d="M4 3c8 15 28 15 40 0"/></svg></span><span class="identity-i"><span class="identity-i__stem">i</span><span class="eye"></span></span><span>c</span></span></span></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(`smile-${name}`, { recursive: true });
  for (let i = 0; i < FPS * LOOP; i++) {
    const t = i / FPS;
    // ponytail: z out + smile draws (1.0-1.5s), hold, smile out + z back (2.5-2.9s); blink lands while smiling
    const z = 1 - ramp(t, 1.0, 1.3) + ramp(t, 2.6, 2.9);
    const draw = ramp(t, 1.1, 1.5);
    const smileOpacity = 1 - ramp(t, 2.5, 2.75);
    await page.evaluate(([z, draw, so, d]) => {
      document.querySelector(".zg").style.opacity = z;
      const p = document.querySelector(".smile path");
      p.style.strokeDashoffset = 1 - draw;
      document.querySelector(".smile").style.opacity = so;
      document.querySelectorAll(".eye").forEach((e) => { e.style.animation = `prizic-eye-blink .72s ease-out ${d}s 1 paused both`; });
    }, [z, draw, smileOpacity, 1.55 - t]);
    await page.screenshot({ path: `smile-${name}/${String(i).padStart(3, "0")}.png` });
  }
  await page.close();
}
await browser.close();
