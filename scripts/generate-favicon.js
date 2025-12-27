const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/hprc_logo.png');
const outputDir = path.join(__dirname, '../src/app');

async function generateFavicon() {
  try {
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error('Logo file not found at:', logoPath);
      process.exit(1);
    }

    // Generate icon.png (512x512) for Next.js app directory
    await sharp(logoPath)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(outputDir, 'icon.png'));

    console.log('✓ Generated icon.png (512x512)');

    // Generate apple-icon.png (180x180) for Apple devices
    await sharp(logoPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(outputDir, 'apple-icon.png'));

    console.log('✓ Generated apple-icon.png (180x180)');

    // Generate favicon.ico with multiple sizes
    // Note: sharp doesn't support ICO format directly, so we'll create a PNG
    // Next.js will handle the ICO conversion or we can use it as is
    const sizes = [16, 32, 48];
    const icoImages = [];

    for (const size of sizes) {
      const buffer = await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toBuffer();
      icoImages.push({ size, buffer });
    }

    // For Next.js, we can use a single PNG as favicon
    // The largest size (48x48) will be used
    await sharp(logoPath)
      .resize(48, 48, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(path.join(outputDir, 'favicon.png'));

    console.log('✓ Generated favicon.png (48x48)');
    console.log('\n✅ Favicon generation complete!');
    console.log('\nFiles created:');
    console.log('  - src/app/icon.png (512x512)');
    console.log('  - src/app/apple-icon.png (180x180)');
    console.log('  - src/app/favicon.png (48x48)');
    console.log('\nNext.js will automatically use these files.');

  } catch (error) {
    console.error('Error generating favicon:', error);
    process.exit(1);
  }
}

generateFavicon();



