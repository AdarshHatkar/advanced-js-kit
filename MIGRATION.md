# Migration Guide: Platform-Specific Exports

This guide explains how to migrate from the previous version to the new platform-specific export structure.

## What Changed

Previously, all utilities were exported from the main package, including Node.js-only modules. This could cause issues in browser environments. We've now reorganized exports into:

- **`advanced-js-kit`** - Universal utilities only (works everywhere)
- **`advanced-js-kit/node`** - Node.js-only + Universal utilities  
- **`advanced-js-kit/browser`** - Browser-optimized + Universal utilities

## Migration Examples

### Before (v1.0.2 and earlier)

```typescript
// This could cause errors in browser environments
import { chunk, capitalize, isPortInUse, jwtSign } from 'advanced-js-kit';
```

### After (v1.1.0+)

#### For Universal Code (Recommended)
```typescript
// Only imports utilities that work everywhere
import { chunk, capitalize, clamp, sleep, convertToSeconds } from 'advanced-js-kit';
```

#### For Node.js Applications
```typescript
// Includes Node.js-only utilities + universal utilities
import { 
  chunk, capitalize, clamp, sleep, convertToSeconds,  // Universal
  isPortInUse, findAvailablePort, jwtSign, jwtVerify  // Node.js only
} from 'advanced-js-kit/node';
```

#### For Browser Applications
```typescript
// Browser-optimized bundle (currently same as universal)
import { chunk, capitalize, clamp, sleep, convertToSeconds } from 'advanced-js-kit/browser';
```

#### For Maximum Tree Shaking (No Change)
```typescript
// Individual imports still work the same way
import { chunk } from 'advanced-js-kit/array/chunk';
import { capitalize } from 'advanced-js-kit/string/capitalize';
import { isPortInUse } from 'advanced-js-kit/network/port';  // Node.js only
import { jwtSign } from 'advanced-js-kit/jwt/jwt';           // Node.js only
```

## Breaking Changes

1. **Main Package Export**: The main `advanced-js-kit` import no longer includes Node.js-only modules (`isPortInUse`, `findAvailablePort`, `checkMultiplePorts`, `waitForPort`, `jwtSign`, `jwtVerify`, etc.)

2. **Environment Safety**: Node.js-only modules will throw `EnvironmentError` when used in non-Node.js environments, even when imported from individual modules.

## Migration Strategy

### 1. Quick Fix (Immediate)
Replace your main import with the Node.js-specific import:

```typescript
// Before
import { chunk, isPortInUse, jwtSign } from 'advanced-js-kit';

// After  
import { chunk, isPortInUse, jwtSign } from 'advanced-js-kit/node';
```

### 2. Recommended Approach (Better)
Separate universal and Node.js-specific imports:

```typescript
// Universal utilities (safe everywhere)
import { chunk, capitalize, clamp, sleep } from 'advanced-js-kit';

// Node.js-only utilities (when needed)
import { isPortInUse, jwtSign } from 'advanced-js-kit/node';
```

### 3. Environment-Aware Code (Best)
Use environment detection for truly universal packages:

```typescript
import { chunk, capitalize, isNodeEnvironment } from 'advanced-js-kit';

// Universal code
const data = chunk([1, 2, 3, 4], 2);

// Node.js-specific code
if (isNodeEnvironment()) {
  const { isPortInUse } = await import('advanced-js-kit/node');
  const portInUse = await isPortInUse(3000);
}
```

## Benefits of New Structure

1. **Environment Safety**: No more runtime errors when using the library in browsers
2. **Better Tree Shaking**: Platform-specific bundles reduce unnecessary code
3. **Clear Intent**: Import paths clearly indicate platform requirements  
4. **Future Proof**: Ready for browser-specific optimizations
5. **Backward Compatible**: Individual module imports still work

## Need Help?

- Check the [Environment Compatibility Guide](./ENVIRONMENT-COMPATIBILITY.md)
- Review the [README](./README.md) for updated usage examples
- Open an issue if you encounter migration problems
