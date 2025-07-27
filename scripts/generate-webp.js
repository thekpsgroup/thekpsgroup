import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateWebPImages() {
  const teamDir = path.join(__dirname, '..', 'public', 'team');
  
  // Function to process a directory recursively
  async function processDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        await processDirectory(fullPath);
      } else if (item.isFile() && /\.(jpg|jpeg|png)$/i.test(item.name)) {
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Skip if WebP already exists
        if (fs.existsSync(webpPath)) {
          console.log(`Skipping ${item.name} - WebP already exists`);
          continue;
        }
        
        try {
          await sharp(fullPath)
            .webp({ 
              quality: 85, 
              effort: 6,
              smartSubsample: true 
            })
            .toFile(webpPath);
          
          console.log(`✅ Generated: ${path.basename(webpPath)}`);
        } catch (error) {
          console.error(`❌ Error processing ${item.name}:`, error.message);
        }
      }
    }
  }
  
  console.log('🚀 Starting WebP generation for team images...\n');
  
  if (fs.existsSync(teamDir)) {
    await processDirectory(teamDir);
  } else {
    console.log('❌ Team directory not found');
  }
  
  console.log('\n✨ WebP generation complete!');
}

generateWebPImages().catch(console.error);
