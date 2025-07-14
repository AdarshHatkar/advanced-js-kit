/**
 * Example: Platform-Specific Import Patterns
 * This demonstrates the new recommended import patterns for different use cases
 */

// ================================================================================
// 1. UNIVERSAL CODE (Works everywhere: Node.js, Browser, Web Workers)
// ================================================================================

console.log("=== Universal Code ===");

// Recommended: Import only universal utilities from main package
import { 
  chunk, 
  capitalize, 
  clamp, 
  sleep, 
  convertToSeconds,
  isNodeEnvironment 
} from 'advanced-js-kit';

// These work in all environments
const data = [1, 2, 3, 4, 5, 6, 7, 8];
const chunks = chunk(data, 3);
console.log("Chunked data:", chunks);

const text = "hello world";
const capitalized = capitalize(text);
console.log("Capitalized:", capitalized);

const bounded = clamp(15, 0, 10);
console.log("Clamped 15 to [0,10]:", bounded);

const totalSeconds = convertToSeconds({ minutes: 2, seconds: 30 });
console.log("2 minutes 30 seconds =", totalSeconds, "seconds");

// ================================================================================
// 2. NODE.JS-SPECIFIC CODE
// ================================================================================

console.log("\n=== Node.js-Specific Code ===");

if (isNodeEnvironment()) {
  // Recommended: Import Node.js-specific utilities from /node
  import('advanced-js-kit/node').then(async ({ isPortInUse, jwtSign, findAvailablePort }) => {
    
    // Network operations (Node.js only)
    try {
      const port3000InUse = await isPortInUse(3000);
      console.log("Port 3000 in use:", port3000InUse);
      
      const availablePort = await findAvailablePort({ startPort: 8000, endPort: 8010 });
      console.log("Found available port:", availablePort);
    } catch (error) {
      console.log("Network operation error:", error.message);
    }
    
    // JWT operations (Node.js only)
    try {
      const payload = { userId: '123', name: 'John Doe' };
      const result = await jwtSign({ payload, secret: 'your-secret-key' });
      console.log("JWT token generated:", result.status === 'success' ? 'Success' : 'Failed');
    } catch (error) {
      console.log("JWT operation error:", error.message);
    }
  });
} else {
  console.log("Node.js-specific features not available in this environment");
}

// ================================================================================
// 3. BROWSER-OPTIMIZED CODE
// ================================================================================

console.log("\n=== Browser-Optimized Code ===");

// Future-proof: Use browser-specific import (currently same as universal)
import('advanced-js-kit/browser').then(({ chunk: browserChunk, capitalize: browserCap }) => {
  console.log("Browser-optimized chunk:", browserChunk([1, 2, 3, 4], 2));
  console.log("Browser-optimized capitalize:", browserCap("browser code"));
});

// ================================================================================
// 4. PROGRESSIVE ENHANCEMENT PATTERN
// ================================================================================

console.log("\n=== Progressive Enhancement ===");

// Start with universal features, progressively enhance with platform-specific ones
const processData = async (data: number[]) => {
  // Universal processing
  const chunkedData = chunk(data, 4);
  console.log("Base processing complete:", chunkedData.length, "chunks");
  
  // Enhance with Node.js features if available
  if (isNodeEnvironment()) {
    const { findAvailablePort } = await import('advanced-js-kit/node');
    const port = await findAvailablePort({ startPort: 3000 });
    console.log("Enhanced: Could start server on port", port);
  }
  
  return chunkedData;
};

processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

// ================================================================================
// 5. ERROR HANDLING PATTERN
// ================================================================================

console.log("\n=== Error Handling ===");

const safeNetworkOperation = async () => {
  try {
    if (isNodeEnvironment()) {
      const { isPortInUse } = await import('advanced-js-kit/node');
      return await isPortInUse(3000);
    }
    return null;
  } catch (error) {
    console.log("Network operation not available:", error.message);
    return null;
  }
};

safeNetworkOperation().then(result => {
  if (result !== null) {
    console.log("Port check result:", result);
  } else {
    console.log("Port checking not supported in this environment");
  }
});
