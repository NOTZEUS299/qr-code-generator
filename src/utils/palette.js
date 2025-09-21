// --- Contrast Utils ---
function hexToHsl(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Convert HSL → HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
  else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
  else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
  else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
  else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
  else if (300 <= h && h < 360) [r, g, b] = [c, 0, x];

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const bigint = parseInt(hex, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function luminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrast(hex1, hex2) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Ensure color is contrasting enough against bg
function ensureContrast(colorHex, bgHex, minRatio = 2.5) {
  let tries = 0;
  let candidate = colorHex;
  while (contrast(candidate, bgHex) < minRatio && tries < 10) {
    // tweak lightness to force contrast
    const hsl = hexToHsl(candidate);
    hsl.l = hsl.l > 50 ? hsl.l - 20 : hsl.l + 20;
    candidate = hslToHex(hsl.h, hsl.s, hsl.l);
    tries++;
  }
  return candidate;
}

// --- Main Palette Generator ---
export function generateColorPalettes(baseHex, count = 150) {
  const baseHsl = hexToHsl(baseHex);
  const palettes = [];

  for (let i = 0; i < count; i++) {
    const hueShift = (i * 37 + Math.random() * 60) % 360;
    const newHue = (baseHsl.h + hueShift) % 360;

    // --- Decide canvas (QR background) ---
    let background;
    const mode = Math.random();
    if (mode < 0.33) {
      background = baseHex; // same as container
    } else if (mode < 0.66) {
      const shift = Math.random() > 0.5 ? +20 : -20;
      background = hslToHex(
        baseHsl.h,
        baseHsl.s,
        Math.max(5, Math.min(95, baseHsl.l + shift))
      );
    } else {
      background = hslToHex(
        (baseHsl.h + hueShift + 180) % 360,
        50 + Math.random() * 30,
        20 + Math.random() * 60
      );
    }

    // --- Raw color candidates ---
    const color1 = hslToHex((newHue + 180) % 360, 70, 40 + (i % 20));
    const color2 = hslToHex((newHue + 120) % 360, 60, 30 + (i % 25));
    const color3 = hslToHex((newHue + 60) % 360, 65, 35 + (i % 15));

    let eye, square, data;

    if (Math.random() < 0.3) {
      const mono = hslToHex(newHue, 60, 40 + (i % 30));
      eye = square = data = ensureContrast(mono, background);
    } else if (Math.random() < 0.6) {
      eye = square = ensureContrast(color1, background);
      data = ensureContrast(color2, background);
    } else {
      eye = ensureContrast(color1, background);
      square = ensureContrast(color2, background);
      data = ensureContrast(color3, background);
    }

    palettes.push({
      eye,
      square,
      data,
      background,
    });
  }

  return palettes;
}
