function hexToRgb(hex) {
  // Remove the hash if present
  hex = hex.replace("#", "");

  // Parse the hex values
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Return RGB object
  return { r, g, b };
}

// Alternative function that returns RGB string format
function hexToRgbString(hex) {
  const rgb = hexToRgb(hex);
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

// Function that returns RGBA string format with custom alpha
function hexToRgba(hex, alpha = 1) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export { hexToRgb, hexToRgbString, hexToRgba };
