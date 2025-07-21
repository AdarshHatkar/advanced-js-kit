/**
 * Clamps a number within the inclusive lower and upper bounds
 * @param number - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns The clamped number
 */
export function clamp(number: number, lower: number, upper: number): number {
  if (typeof number !== 'number' || typeof lower !== 'number' || typeof upper !== 'number') {
    throw new Error('All arguments must be numbers');
  }
  
  if (lower > upper) {
    throw new Error('Lower bound must be less than or equal to upper bound');
  }
  
  return Math.min(Math.max(number, lower), upper);
}

/**
 * Checks if a number is within the inclusive range
 * @param number - The number to check
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns True if the number is within the range
 */
export function inRange(number: number, lower: number, upper: number): boolean {
  if (typeof number !== 'number' || typeof lower !== 'number' || typeof upper !== 'number') {
    throw new Error('All arguments must be numbers');
  }
  
  if (lower > upper) {
    throw new Error('Lower bound must be less than or equal to upper bound');
  }
  
  return number >= lower && number <= upper;
}
