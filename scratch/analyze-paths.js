const fs = require('fs');

const svg = fs.readFileSync('C:/Users/arsha/OneDrive/Desktop/Demo-GMM/public/hero-illustration.svg', 'utf8');
const pathRegex = /<path\s+d="([^"]+)"\s+fill="([^"]+)"/g;

let match;
let pathsInfo = [];
let idx = 0;

while ((match = pathRegex.exec(svg)) !== null) {
  const d = match[1];
  const fill = match[2];
  
  // extract coordinates
  const numbers = d.match(/-?\d+(\.\d+)?/g);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  if (numbers) {
    for (let i = 0; i < numbers.length - 1; i += 2) {
      const x = parseFloat(numbers[i]);
      const y = parseFloat(numbers[i+1]);
      if (!isNaN(x) && !isNaN(y)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  pathsInfo.push({
    index: idx++,
    fill,
    minX: Math.round(minX),
    maxX: Math.round(maxX),
    minY: Math.round(minY),
    maxY: Math.round(maxY),
    width: Math.round(maxX - minX),
    height: Math.round(maxY - minY),
    pathStr: match[0]
  });
}

console.log('Total parsed paths:', pathsInfo.length);
console.log('Sample path positions & fills:');
console.table(pathsInfo.slice(0, 20).map(p => ({ idx: p.index, fill: p.fill, minX: p.minX, maxX: p.maxX, minY: p.minY, maxY: p.maxY, w: p.width, h: p.height })));
