import sharp from "sharp";

// The logo has a light gray/white background (~#e0e0e0+).
// This script removes that background by making light pixels transparent
// and inverting the dark logo to white (for use with screen blend on dark backgrounds).

const input = "public/images/logo-badge.png";
const output = "public/images/logo-badge-transparent.png";

const image = sharp(input);
const { width, height } = await image.metadata();

// Get raw pixel data
const { data, info } = await image
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = Buffer.from(data);

for (let i = 0; i < pixels.length; i += 4) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];

  // Calculate brightness (0-255)
  const brightness = (r + g + b) / 3;

  if (brightness > 180) {
    // Light pixel = background — make fully transparent
    pixels[i + 3] = 0;
  } else {
    // Dark pixel = logo — invert to white
    pixels[i] = 255 - r;
    pixels[i + 1] = 255 - g;
    pixels[i + 2] = 255 - b;
    // Alpha based on how dark the original was (darker = more opaque)
    pixels[i + 3] = Math.min(255, Math.round((255 - brightness) * 1.5));
  }
}

await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(output);

console.log(`Created transparent logo: ${output}`);
