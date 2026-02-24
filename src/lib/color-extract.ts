import { rgbToHex } from "./color-convert";

interface Point { r: number; g: number; b: number }

function kMeans(pixels: Point[], k: number, maxIter: number = 20): Point[] {
  // Initialize centroids randomly from actual pixels
  const centroids: Point[] = [];
  const used = new Set<number>();
  while (centroids.length < k) {
    const idx = Math.floor(Math.random() * pixels.length);
    if (!used.has(idx)) {
      used.add(idx);
      centroids.push({ ...pixels[idx] });
    }
  }

  for (let iter = 0; iter < maxIter; iter++) {
    const clusters: Point[][] = Array.from({ length: k }, () => []);

    // Assign pixels to nearest centroid
    for (const p of pixels) {
      let minDist = Infinity;
      let closest = 0;
      for (let c = 0; c < k; c++) {
        const d = (p.r - centroids[c].r) ** 2 + (p.g - centroids[c].g) ** 2 + (p.b - centroids[c].b) ** 2;
        if (d < minDist) { minDist = d; closest = c; }
      }
      clusters[closest].push(p);
    }

    // Update centroids
    let converged = true;
    for (let c = 0; c < k; c++) {
      if (clusters[c].length === 0) continue;
      const avg = clusters[c].reduce((acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }), { r: 0, g: 0, b: 0 });
      const newC = { r: avg.r / clusters[c].length, g: avg.g / clusters[c].length, b: avg.b / clusters[c].length };
      if (Math.abs(newC.r - centroids[c].r) > 1 || Math.abs(newC.g - centroids[c].g) > 1 || Math.abs(newC.b - centroids[c].b) > 1) {
        converged = false;
      }
      centroids[c] = newC;
    }
    if (converged) break;
  }

  return centroids;
}

export function extractColorsFromImageData(imageData: ImageData, count: number = 5): string[] {
  const pixels: Point[] = [];
  // Sample every 4th pixel for performance
  for (let i = 0; i < imageData.data.length; i += 16) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3];
    if (a < 128) continue; // skip transparent
    pixels.push({ r, g, b });
  }

  if (pixels.length < count) {
    return Array.from({ length: count }, () => "#808080");
  }

  const centroids = kMeans(pixels, count);
  return centroids.map((c) => rgbToHex(Math.round(c.r), Math.round(c.g), Math.round(c.b)));
}

export async function extractColorsFromImage(img: HTMLImageElement, count: number = 5): Promise<string[]> {
  const canvas = document.createElement("canvas");
  const maxSize = 200; // downsample for speed
  const scale = Math.min(1, maxSize / Math.max(img.naturalWidth, img.naturalHeight));
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return extractColorsFromImageData(imageData, count);
}
