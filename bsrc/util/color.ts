function generateRandomHexColor() {
   // Generate a random number between 0 and 16777215 (number of possible colors)
   const randomColor = Math.floor(Math.random() * 16777215);

   // Convert the number to a hexadecimal string with 6 digits
   const hexColor = '#' + randomColor.toString(16).padStart(6, '0');

   return hexColor;
}
export const color = generateRandomHexColor();
