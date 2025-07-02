/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (str.length === 0) {
    return str;
  }
  
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalizes the first letter of each word in a string
 * @param str - The string to capitalize
 * @returns The string with each word capitalized
 */
export function capitalizeWords(str: string): string {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
