export function stringToColor(str: string): string {
    // Ensure the string is not empty
    if (!str) {
      return '#000000'; // Default to black if the string is empty
    }
  
    // Create a hash value from the string
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Generate a hex color code based on the hash
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += value.toString(16).padStart(2, '0'); // Use padStart to ensure 2 digits
    }
  
    return color;
  }
  