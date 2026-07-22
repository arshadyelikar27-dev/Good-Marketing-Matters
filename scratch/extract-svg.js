const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/arsha/OneDrive/Desktop/Demo-GMM/SVG/SVG Genie - AI-Powered SVG Creator';
const content = fs.readFileSync(filePath, 'utf8');

const targetStr = '<svg xmlns="http://www.w3.org/2000/svg" height="1024"';
const startIdx = content.indexOf(targetStr);
const endIdx = content.indexOf('</svg>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const svg = content.substring(startIdx, endIdx + 6);
  fs.writeFileSync('C:/Users/arsha/OneDrive/Desktop/Demo-GMM/public/hero-illustration.svg', svg);
  const paths = svg.match(/<path[\s\S]*?>/g) || [];
  console.log('Successfully extracted SVG! Length:', svg.length, 'Paths:', paths.length);
} else {
  console.log('Target SVG not found in file');
}
