export const generateColorFromAlphabet = (char: string) => {
  // Get ASCII value of the character
  const asciiValue = char.charCodeAt(0);

  // Map the ASCII value to HSL values
  const hue = (asciiValue * 137) % 360; // Use a large prime number for better distribution
  const saturation = 70 + (asciiValue % 30); // Keep saturation high for vibrant colors
  const lightness = 50 + (asciiValue % 20); // Keep lightness balanced

  // Return the HSL color
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
