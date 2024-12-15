const fs = require('fs');
const { JSDOM } = require('jsdom'); // For DOM manipulation
const sharp = require('sharp'); // For PNG generation

// File paths
const inputFilePath = './price.svg';
const outputSVGPath = './price-static.svg';
const outputPNGPath = './price.png';

// Function to extract price from the original SVG
function extractPriceFromSVG(svgContent) {
  const dom = new JSDOM(svgContent, { contentType: 'text/xml' });
  const priceElement = dom.window.document.querySelector('#price');
  return priceElement ? priceElement.textContent.trim() : null;
}

// Function to generate a new static SVG
function generateStaticSVG(price) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" fill="#f4f4f9" />
  <text x="100" y="30" font-size="20" font-family="Arial, sans-serif" fill="#333" text-anchor="middle">
    ${price}
  </text>
</svg>`;
}

// Main function
(async function generateStaticFiles() {
  try {
    // Step 1: Read the original SVG
    const svgContent = fs.readFileSync(inputFilePath, 'utf8');

    // Step 2: Extract the ADA price
    const price = extractPriceFromSVG(svgContent);
    if (!price) {
      throw new Error('Failed to extract price from the SVG.');
    }

    console.log(`Extracted Price: ${price}`);

    // Step 3: Generate a new static SVG
    const staticSVG = generateStaticSVG(price);
    fs.writeFileSync(outputSVGPath, staticSVG, 'utf8');
    console.log(`Static SVG generated at: ${outputSVGPath}`);

    // Step 4: Generate a PNG using Sharp
    const buffer = Buffer.from(staticSVG, 'utf8');
    await sharp(buffer)
      .toFormat('png')
      .toFile(outputPNGPath);
    console.log(`Static PNG generated at: ${outputPNGPath}`);
  } catch (error) {
    console.error('Error generating static files:', error);
  }
})();
