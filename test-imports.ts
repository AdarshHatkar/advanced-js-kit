// Test file to verify imports work correctly

// Universal imports (work in all environments)
import { capitalize } from "advanced-js-kit/string/capitalize";
import { chunk } from "advanced-js-kit/array/chunk";
import { clamp } from "advanced-js-kit/number/clamp";
import { sleep } from "advanced-js-kit/sleep/sleep";
import { convertToSeconds } from "advanced-js-kit/time/time";

// Universal imports from main package (recommended)
import { 
  capitalize as cap2, 
  chunk as chunk2, 
  clamp as clamp2, 
  sleep as sleep2,
  convertToSeconds as convertToSeconds2 
} from "advanced-js-kit";

// Node.js-only imports (will work only in Node.js)
import { isPortInUse, jwtSign } from "advanced-js-kit/node";

// Browser-specific imports (currently same as universal, but future-proof)
import { capitalize as cap3 } from "advanced-js-kit/browser";

console.log("Testing universal imports:");
console.log("capitalize('hello'):", capitalize('hello'));
console.log("chunk([1,2,3,4], 2):", chunk([1,2,3,4], 2));
console.log("clamp(15, 0, 10):", clamp(15, 0, 10));
console.log("convertToSeconds({ minutes: 2 }):", convertToSeconds({ minutes: 2 }));

console.log("\nTesting Node.js-only imports:");
try {
  // These will only work in Node.js environment
  isPortInUse(3000).then(inUse => console.log("Port 3000 in use:", inUse)).catch(err => console.log("Port check error:", err.message));
  const token = jwtSign({ test: true }, 'secret');
  console.log("JWT signed successfully");
} catch (error) {
  console.log("Node.js-only features not available:", error);
}
