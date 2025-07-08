# JWT Object-Based API Documentation

## Overview

The JWT module has been refactored to use object-based inputs and return result objects instead of throwing errors. This provides better type safety, cleaner error handling, and a more consistent API.

## Key Changes

### 1. Object-Based Inputs
All JWT functions now take a single object parameter instead of multiple separate parameters:

**Before:**
```typescript
jwtVerify(token, secret, options)
jwtSign(payload, secret, options)
jwtDecode(token, options)
jwtIsExpired(token)
jwtTimeUntilExpiry(token)
```

**After:**
```typescript
jwtVerify({ token, secret, options })
jwtSign({ payload, secret, options })
jwtDecode({ token, options })
jwtIsExpired({ token })
jwtTimeUntilExpiry({ token })
```

### 2. Result Objects
All functions return `JwtResult<T>` objects with discriminated unions:

```typescript
type JwtResult<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: JwtError }
```

### 3. Type-Safe Error Codes
Error codes are now type-safe enums:

```typescript
type JwtErrorCode = 
  | 'invalid_token'
  | 'invalid_secret' 
  | 'invalid_payload'
  | 'verification_failed'
  | 'signing_failed'
  | 'token_expired'
  | 'decode_failed'
  | 'environment_error'
```

## Input Interfaces

### JwtVerifyInput
```typescript
interface JwtVerifyInput {
  token: string;
  secret: Secret;
  options?: VerifyOptions;
}
```

### JwtSignInput
```typescript
interface JwtSignInput<T> {
  payload: T;
  secret: Secret;
  options?: JwtSignOptions;
}
```

### JwtDecodeInput
```typescript
interface JwtDecodeInput {
  token: string;
  options?: { complete?: boolean };
}
```

### JwtExpirationInput
```typescript
interface JwtExpirationInput {
  token: string;
}
```

## Usage Examples

### Basic Token Verification
```typescript
const result = await jwtVerify({
  token: 'your-jwt-token',
  secret: 'your-secret'
});

if (result.status === 'success') {
  console.log('User ID:', result.data.userId);
} else {
  console.log('Error:', result.error.code, result.error.message);
}
```

### Token Signing with Options
```typescript
const result = await jwtSign({
  payload: { userId: '123', role: 'admin' },
  secret: 'your-secret',
  options: {
    expiresIn: '1h',
    issuer: 'my-service',
    audience: 'my-app'
  }
});

if (result.status === 'success') {
  console.log('Token:', result.data);
}
```

### Token Decoding
```typescript
const result = jwtDecode({
  token: 'your-jwt-token',
  options: { complete: true }
});

if (result.status === 'success') {
  console.log('Payload:', result.data);
}
```

### Expiration Checking
```typescript
const result = jwtIsExpired({ token: 'your-jwt-token' });

if (result.status === 'success') {
  console.log('Is expired:', result.data);
}
```

### Time Until Expiry
```typescript
const result = jwtTimeUntilExpiry({ token: 'your-jwt-token' });

if (result.status === 'success') {
  console.log(`Expires in ${result.data} seconds`);
}
```

## Utility Functions

### Type Guards
```typescript
// Check if result is successful
if (isJwtSuccess(result)) {
  // TypeScript knows result.data is available
  console.log(result.data);
}

// Check if result is an error
if (isJwtError(result)) {
  // TypeScript knows result.error is available
  console.log(result.error.code);
}
```

### Unwrap Result
```typescript
// Extract data or throw error (for compatibility with throwing APIs)
try {
  const payload = unwrapJwtResult(result);
  console.log(payload.userId);
} catch (error) {
  console.log('JWT error:', error.message);
}
```

## JWT Namespace

The `jwt` namespace provides aliases for all functions:

```typescript
import { jwt } from 'advanced-js-kit/jwt/jwt';

const verifyResult = await jwt.verify({ token, secret });
const signResult = await jwt.sign({ payload, secret });
const decodeResult = jwt.decode({ token });
const expiredResult = jwt.isExpired({ token });
const timeResult = jwt.timeUntilExpiry({ token });
```

## Error Handling

### Structured Error Objects
```typescript
interface JwtError {
  code: JwtErrorCode;
  message: string;
  originalError?: Error;
}
```

### Error Code Handling
```typescript
function handleJwtError(errorCode: JwtErrorCode) {
  switch (errorCode) {
    case 'invalid_token':
      // Handle invalid token
      break;
    case 'invalid_secret':
      // Handle invalid secret
      break;
    case 'verification_failed':
      // Handle verification failure
      break;
    // ... other cases
  }
}
```

## Benefits

1. **Type Safety**: Object inputs provide better IntelliSense and type checking
2. **Consistent API**: All functions follow the same pattern
3. **Better Error Handling**: No more try/catch blocks required
4. **Structured Errors**: Error codes and messages are type-safe
5. **Cleaner Code**: Result objects make success/error handling explicit
6. **Future-Proof**: Easy to add new options without breaking changes

## Migration Guide

### From Old API
```typescript
// Old way
try {
  const payload = await jwtVerify(token, secret, { audience: 'app' });
  console.log(payload.userId);
} catch (error) {
  console.log('Error:', error.message);
}

// New way
const result = await jwtVerify({
  token,
  secret,
  options: { audience: 'app' }
});

if (result.status === 'success') {
  console.log(result.data.userId);
} else {
  console.log('Error:', result.error.code, result.error.message);
}
```

### Compatibility Layer
If you need to maintain the old throwing behavior, use `unwrapJwtResult()`:

```typescript
// This will throw on error, similar to the old API
const payload = unwrapJwtResult(await jwtVerify({ token, secret }));
```
