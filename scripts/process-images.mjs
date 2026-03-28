import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SOURCE = 'C:/Users/david/.claude/dead-pixel-redesign-3';
const DEST = 'public/images';

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const tasks = [
  // Main TV page - keep at original res, just compress
  { src: 'main-page.png', out: 'tv-main.webp', width: 1920, quality: 82 },
  { src: 'main-page.png', out: 'tv-main-mobile.webp', width: 768, quality: 78 },

  // TV Eyes (for About + Contact pages)
  { src: 'tv-eyes-1.png', out: 'tv-eyes-1.webp', width: 1920, quality: 80 },
  { src: 'tv-eyes-1.png', out: 'tv-eyes-1-mobile.webp', width: 768, quality: 75 },
  { src: 'tv-eyes-2.png', out: 'tv-eyes-2.webp', width: 1920, quality: 80 },
  { src: 'tv-eyes-2.png', out: 'tv-eyes-2-mobile.webp', width: 768, quality: 75 },

  // Static Shadow (for Work + Services pages)
  { src: 'static-shadow-1.png', out: 'tv-shadow-1.webp', width: 1920, quality: 80 },
  { src: 'static-shadow-1.png', out: 'tv-shadow-1-mobile.webp', width: 768, quality: 75 },
  { src: 'static-shadow-2.png', out: 'tv-shadow-2.webp', width: 1920, quality: 80 },
  { src: 'static-shadow-2.png', out: 'tv-shadow-2-mobile.webp', width: 768, quality: 75 },

  // Logo - badge circle (keep PNG for transparency, just resize)
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'logo-badge.png', width: 400, format: 'png' },
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'logo-badge-sm.png', width: 120, format: 'png' },

  // Favicon sizes
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'favicon-32.png', width: 32, format: 'png' },
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'favicon-180.png', width: 180, format: 'png' },
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'favicon-192.png', width: 192, format: 'png' },
  { src: 'logo-standalone-claudes-lazy-ass.png', out: 'favicon-512.png', width: 512, format: 'png' },

  // OG image - main TV scene cropped for social sharing
  { src: 'main-page.png', out: 'og-image.webp', width: 1200, quality: 85 },
];

for (const t of tasks) {
  const input = join(SOURCE, t.src);
  const output = join(DEST, t.out);
  const fmt = t.format || 'webp';

  try {
    let pipeline = sharp(input).resize(t.width, null, { withoutEnlargement: false });

    if (fmt === 'webp') {
      pipeline = pipeline.webp({ quality: t.quality || 80 });
    } else {
      pipeline = pipeline.png({ quality: t.quality || 90 });
    }

    await pipeline.toFile(output);
    const stats = await sharp(output).metadata();
    console.log(`OK  ${t.out}  (${t.width}w, ${Math.round(stats.size / 1024)}KB)`);
  } catch (e) {
    console.error(`FAIL  ${t.out}: ${e.message}`);
  }
}

console.log('\nDone. Images ready in public/images/');
