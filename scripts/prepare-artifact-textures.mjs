import sharp from "sharp";
import fs from "fs";
import path from "path";

const brainDir = "C:\\Users\\ahmad\\.gemini\\antigravity-ide\\brain\\ec9cdc8e-2caa-4d1e-b1fb-c46855227556";
const brainFiles = fs.readdirSync(brainDir);

const bowlSrc = path.join(brainDir, brainFiles.find(f => f.startsWith("nabataean_bowl_hd") && f.endsWith(".jpg")));
const coinFrontSrc = path.join(brainDir, brainFiles.find(f => f.startsWith("decapolis_coin_front") && f.endsWith(".jpg")));
const coinRevSrc = path.join(brainDir, brainFiles.find(f => f.startsWith("decapolis_coin_reverse") && f.endsWith(".jpg")));
const mosaicSrc = path.join(brainDir, brainFiles.find(f => f.startsWith("byzantine_mosaic_hd") && f.endsWith(".jpg")));
const statueSrc = path.join(brainDir, brainFiles.find(f => f.startsWith("ain_ghazal_statue_hd") && f.endsWith(".jpg")));

async function updateArtifactMedia() {
  console.log("Upgrading Artifact Showcase photography & 3D textures...");

  // 1. Copy pristine photography directly to public/images/artifacts
  await sharp(bowlSrc).jpeg({ quality: 95 }).toFile("public/images/artifacts/nabataean-bowl.jpg");
  await sharp(coinFrontSrc).jpeg({ quality: 95 }).toFile("public/images/artifacts/decapolis-coin.jpg");
  await sharp(mosaicSrc).jpeg({ quality: 95 }).toFile("public/images/artifacts/byzantine-mosaic.jpg");
  await sharp(statueSrc).jpeg({ quality: 95 }).toFile("public/images/artifacts/ain-ghazal-statue.jpg");
  console.log("✓ Updated high-res display photos (Bowl, Coin, Mosaic, Statue)");

  // 2. High-resolution Decapolis Coin 3D Textures (1024x1024)
  // Coin front is centered at cx=511, cy=506, r=436.
  const coinR = 434;
  const coinSize = coinR * 2; // 868
  const coinLeft = 511 - coinR;
  const coinTop = 506 - coinR;

  const coinMask = Buffer.from(
    `<svg width="${coinSize}" height="${coinSize}"><circle cx="${coinR}" cy="${coinR}" r="${coinR - 3}" fill="white"/></svg>`
  );

  // High-res Coin Face Texture
  await sharp(coinFrontSrc)
    .extract({ left: coinLeft, top: coinTop, width: coinSize, height: coinSize })
    .resize(1024, 1024)
    .modulate({ brightness: 1.08, saturation: 1.15 })
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/decapolis-coin-face.png");

  // High-res Coin Bump Map (micro-embossed Marcus Aurelius relief & lettering)
  await sharp(coinFrontSrc)
    .extract({ left: coinLeft, top: coinTop, width: coinSize, height: coinSize })
    .resize(1024, 1024)
    .grayscale()
    .normalise()
    .linear(2.4, -40)
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/decapolis-coin-bump.png");

  // Coin Reverse Texture (Tyche holding cornucopia & GERASA)
  const revR = 434;
  const revSize = revR * 2;
  const revLeft = Math.max(0, Math.floor(512 - revR));
  const revTop = Math.max(0, Math.floor(512 - revR));

  await sharp(coinRevSrc)
    .extract({ left: revLeft, top: revTop, width: revSize, height: revSize })
    .resize(1024, 1024)
    .modulate({ brightness: 1.05, saturation: 1.12 })
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/decapolis-coin-back.png");

  // Coin Reverse Bump Map
  await sharp(coinRevSrc)
    .extract({ left: revLeft, top: revTop, width: revSize, height: revSize })
    .resize(1024, 1024)
    .grayscale()
    .normalise()
    .linear(2.2, -35)
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/decapolis-coin-back-bump.png");

  console.log("✓ Generated 1024x1024 Roman Decapolis coin textures & bump maps");

  // 3. High-resolution Byzantine Mosaic 3D Textures (1024x1024)
  const mosaicR = 470;
  const mosaicSize = mosaicR * 2; // 940
  const mosaicLeft = 512 - mosaicR;
  const mosaicTop = 505 - mosaicR;

  // Mosaic Face Texture
  await sharp(mosaicSrc)
    .extract({ left: mosaicLeft, top: mosaicTop, width: mosaicSize, height: mosaicSize })
    .resize(1024, 1024)
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/byzantine-mosaic-face.png");

  // Mosaic Bump Map (tactile relief of individual stone tesserae cubes)
  await sharp(mosaicSrc)
    .extract({ left: mosaicLeft, top: mosaicTop, width: mosaicSize, height: mosaicSize })
    .resize(1024, 1024)
    .grayscale()
    .normalise()
    .linear(2.6, -50)
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/byzantine-mosaic-bump.png");

  // Weathered Quarry Stone Back
  await sharp(mosaicSrc)
    .extract({ left: mosaicLeft, top: mosaicTop, width: mosaicSize, height: mosaicSize })
    .resize(1024, 1024)
    .blur(16)
    .modulate({ brightness: 0.82, saturation: 0.65 })
    .composite([{ 
      input: Buffer.from(`<svg width="1024" height="1024"><circle cx="512" cy="512" r="508" fill="white"/></svg>`), 
      blend: "dest-in" 
    }])
    .png()
    .toFile("public/images/artifacts/byzantine-mosaic-back.png");

  console.log("✓ Generated 1024x1024 Byzantine Mosaic textures & bump maps");
}

updateArtifactMedia().catch(console.error);
