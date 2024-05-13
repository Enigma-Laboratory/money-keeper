export const generateColorFromAlphabet = (char: string) => {
  // Get ASCII value of the character
  var asciiValue = char.charCodeAt(0);

  // Map the ASCII value to RGB values
  var red = (asciiValue * 13) % 256; // Adjusting by 13
  var green = (asciiValue * 17) % 256; // Adjusting by 17
  var blue = (asciiValue * 23) % 256; // Adjusting by 23

  // Return the RGB color
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
};
