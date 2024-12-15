<<<<<<< HEAD
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
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" fill="#f4f4f9" />
  <text x="100" y="30" font-size="20" font-family="Arial, sans-serif" fill="#333" text-anchor="middle">
    $${price.toFixed(2)} USD
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

    console.log(`Fetched ADA Price: $${price.toFixed(2)}`);

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
=======
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
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" fill="#f4f4f9" />
  <text x="100" y="30" font-size="20" font-family="Arial, sans-serif" fill="#333" text-anchor="middle">
    $${price.toFixed(2)} USD
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

    console.log(`Fetched ADA Price: $${price.toFixed(2)}`);

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
>>>>>>> cf6fb676f88d5369b955ecd7bd35735e5bbc95ee
