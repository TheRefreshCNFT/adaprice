const fs = require('fs');
const fetch = require('node-fetch'); // Ensure this is installed
const sharp = require('sharp'); // For PNG generation

// Output file paths
const outputSVGPath = './price-static.svg';
const outputPNGPath = './price.png';

// API configuration
const apiURL = 'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd';

// Function to fetch the ADA price
async function fetchAdaPrice() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data.cardano.usd;
  } catch (error) {
    console.error('Error fetching ADA price:', error);
    return null;
  }
}

// Function to generate the SVG content
function generateSVG(price) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
  <rect width="800" height="400" fill="#f4f4f9" />
  <text x="50%" y="50%" font-size="80" font-family="Arial, sans-serif" fill="#333" text-anchor="middle" dominant-baseline="middle">
    $${price.toFixed(3)} USD
  </text>
</svg>`;
}

// Main function to fetch price and generate files
(async function generateStaticFiles() {
  try {
    // Step 1: Fetch the ADA price
    const price = await fetchAdaPrice();
    if (price === null) {
      console.error('Failed to fetch the price. Exiting.');
      return;
    }

    console.log(`Fetched ADA Price: $${price.toFixed(3)}`);

    // Step 2: Generate and write the static SVG file
    const svgContent = generateSVG(price);
    fs.writeFileSync(outputSVGPath, svgContent, 'utf8');
    console.log(`Static SVG written to: ${outputSVGPath}`);

    // Step 3: Generate and write the PNG file
    const buffer = Buffer.from(svgContent, 'utf8');
    await sharp(buffer).toFormat('png').toFile(outputPNGPath);
    console.log(`Static PNG written to: ${outputPNGPath}`);
  } catch (error) {
    console.error('Error generating static files:', error);
  }
})();
