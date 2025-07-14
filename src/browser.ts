// Browser-specific utilities
// Currently there are no browser-only modules, but this file is prepared for future additions

// Universal utilities available in browser
export * from './array/chunk';
export * from './string/capitalize';
export * from './number/clamp';
export * from './sleep/sleep';
export * from './time/time';
export * from './utils/environment';

// Note: Network and JWT utilities are not available in browser environment
// They will throw EnvironmentError if imported from the main package
