import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logosDir = join(__dirname, '../public/logos');

async function convertToWebP() {
  try {
    const files = await readdir(logosDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));
    
    console.log(`Found ${pngFiles.length} PNG files to convert...`);
    
    for (const file of pngFiles) {
      const inputPath = join(logosDir, file);
      const outputPath = join(logosDir, file.replace('.png', '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: 90, effort: 6 })
        .toFile(outputPath);
      
      console.log(`✅ Converted ${file} to WebP`);
    }
    
    console.log('🎉 All images converted successfully!');
  } catch (error) {
    console.error('❌ Error converting images:', error);
  }
}

convertToWebP();
