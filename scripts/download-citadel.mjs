import fs from 'fs';
import path from 'path';

const imagesDir = path.resolve('public/images/citadel');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const items = [
  {
    name: 'citadel-main.jpg',
    url: 'https://lh3.googleusercontent.com/grass-cs/ACvplmNxB2Dc13Ntk-07UKYdWWpl7P4efBNyf4PPkAirPd7VchOeJxy3bLp5pzUoUDrWkRuC2x3l2yclYpwhzfVrA6O3tPi1j1m3qfyugjCtwdNJpmzZ76Q35jzzLTBdUo_m6KgkFoW9=s1600'
  },
  {
    name: 'ain-ghazal.jpg',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA0PWvvXX2OetA6fEQAaxra_6FUhIncwcxutTfRaZJvw5WqFdznKiVkEQ9&s=10'
  },
  {
    name: 'hellenistic.jpg',
    url: 'https://universes.art/fileadmin/user_upload/Art-Destinations/Jordan/Amman/Jordan-Museum/08-Hellenistic-Period/00-25-12-IMG_0927-B.jpg'
  },
  {
    name: 'roman-hercules.jpg',
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/cc/64/53/the-temple-of-hercules.jpg?w=900&h=500&s=1'
  },
  {
    name: 'byzantine-basilica.jpg',
    url: 'https://universes.art/fileadmin/_processed_/c/5/csm_12-IMG_1175-A_7fdc186cd4.jpg'
  },
  {
    name: 'umayyad-palace.jpg',
    url: 'https://universes.art/fileadmin/_processed_/0/a/csm_16-IMG_1373-A_c9a58e26cc.jpg'
  }
];

async function download() {
  for (const item of items) {
    try {
      console.log(`Fetching ${item.name}...`);
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      });
      if (!res.ok) {
        console.error(`Failed ${item.name}: ${res.status} ${res.statusText}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(imagesDir, item.name);
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${item.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${item.name}:`, err.message);
    }
  }
}

download();
