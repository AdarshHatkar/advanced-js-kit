/**
 * Example usage of the new JWT API with object-based inputs and result objects
 */

import { 
    jwtSign, 
    jwtVerify, 
    jwtDecode, 
    jwtIsExpired, 
    jwtTimeUntilExpiry,
    jwt,
    isJwtSuccess,
    isJwtError,
    unwrapJwtResult,
    JwtErrorCode
} from './src/jwt/jwt';

async function jwtExamples() {
    const secret = 'your-secret-key';
    const payload = { userId: '123', role: 'admin' };

    // Signing a token with object input
    console.log('=== JWT Signing ===');
    const signResult = await jwtSign({
        payload,
        secret,
        options: { expiresIn: '1h' }
    });
    
    if (isJwtSuccess(signResult)) {
        console.log('✅ Token signed successfully:', signResult.data);
    } else {
        console.log('❌ Signing failed:', signResult.error.code, signResult.error.message);
        return;
    }

    const token = signResult.data;

    // Verifying a token with object input
    console.log('\n=== JWT Verification ===');
    const verifyResult = await jwtVerify<{ userId: string; role: string }>({
        token,
        secret,
        options: {
            audience: 'my-app',
            issuer: 'my-service'
        }
    });
    
    if (verifyResult.status === 'success') {
        console.log('✅ Token verified successfully:', verifyResult.data);
        console.log('User ID:', verifyResult.data.userId);
        console.log('Role:', verifyResult.data.role);
    } else {
        console.log('❌ Verification failed:', verifyResult.error.code, verifyResult.error.message);
    }

    // Decoding without verification with object input
    console.log('\n=== JWT Decoding ===');
    const decodeResult = jwtDecode({
        token,
        options: { complete: false }
    });
    
    if (isJwtSuccess(decodeResult)) {
        console.log('✅ Token decoded successfully:', decodeResult.data);
    } else {
        console.log('❌ Decoding failed:', decodeResult.error.code, decodeResult.error.message);
    }

    // Checking expiration with object input
    console.log('\n=== JWT Expiration Check ===');
    const expiredResult = jwtIsExpired({ token });
    
    if (expiredResult.status === 'success') {
        console.log('✅ Expiration check:', expiredResult.data ? 'Token is expired' : 'Token is valid');
    } else {
        console.log('❌ Expiration check failed:', expiredResult.error.code, expiredResult.error.message);
    }

    // Time until expiry with object input
    console.log('\n=== Time Until Expiry ===');
    const timeResult = jwtTimeUntilExpiry({ token });
    
    if (isJwtSuccess(timeResult)) {
        console.log(`✅ Token expires in ${timeResult.data} seconds`);
    } else {
        console.log('❌ Time check failed:', timeResult.error.code, timeResult.error.message);
    }

    // Using the jwt namespace with object inputs
    console.log('\n=== Using JWT Namespace ===');
    const namespaceResult = await jwt.verify({
        token,
        secret
    });
    
    if (isJwtSuccess(namespaceResult)) {
        console.log('✅ Namespace verification successful:', namespaceResult.data);
    } else {
        console.log('❌ Namespace verification failed:', namespaceResult.error.code);
    }

    // Error handling examples
    console.log('\n=== Error Handling Examples ===');
    
    // Invalid token
    const invalidTokenResult = await jwtVerify({
        token: 'invalid-token',
        secret
    });
    if (isJwtError(invalidTokenResult)) {
        console.log('Expected error for invalid token:', invalidTokenResult.error.code); // 'verification_failed'
    }

    // Invalid secret
    const invalidSecretResult = await jwtVerify({
        token,
        secret: ''
    });
    if (invalidSecretResult.status === 'error') {
        console.log('Expected error for invalid secret:', invalidSecretResult.error.code); // 'invalid_secret'
    }

    // Using unwrapJwtResult for simpler error handling
    try {
        const payload = unwrapJwtResult(verifyResult);
        console.log('✅ Unwrapped payload:', payload.userId);
    } catch (error) {
        console.log('❌ Unwrap failed:', error.message);
    }

    // Advanced usage examples
    console.log('\n=== Advanced Usage Examples ===');
    
    // Signing with complex options
    const advancedSignResult = await jwt.sign({
        payload: { 
            userId: '456', 
            permissions: ['read', 'write'],
            metadata: { source: 'api' }
        },
        secret,
        options: {
            expiresIn: '2h',
            issuer: 'my-service',
            audience: 'my-app',
            subject: 'user-auth'
        }
    });

    if (isJwtSuccess(advancedSignResult)) {
        console.log('✅ Advanced token created');
        
        // Verify with matching options
        const advancedVerifyResult = await jwt.verify({
            token: advancedSignResult.data,
            secret,
            options: {
                issuer: 'my-service',
                audience: 'my-app',
                subject: 'user-auth'
            }
        });

        if (isJwtSuccess(advancedVerifyResult)) {
            console.log('✅ Advanced token verified:', advancedVerifyResult.data.permissions);
        }
    }

    // Batch operations
    console.log('\n=== Batch Operations ===');
    const tokens = [
        token, 
        'invalid-token', 
        ...(isJwtSuccess(advancedSignResult) ? [advancedSignResult.data] : [])
    ];
    
    for (const [index, testToken] of tokens.entries()) {
        const batchResult = jwt.isExpired({ token: testToken });
        console.log(`Token ${index + 1}:`, 
            batchResult.status === 'success' 
                ? `Valid: ${!batchResult.data}` 
                : `Error: ${batchResult.error.code}`
        );
    }

    // Error code type safety demonstration
    function handleJwtError(errorCode: JwtErrorCode) {
        switch (errorCode) {
            case 'invalid_token':
                console.log('Handle invalid token');
                break;
            case 'invalid_secret':
                console.log('Handle invalid secret');
                break;
            case 'verification_failed':
                console.log('Handle verification failure');
                break;
            case 'signing_failed':
                console.log('Handle signing failure');
                break;
            case 'invalid_payload':
                console.log('Handle invalid payload');
                break;
            case 'decode_failed':
                console.log('Handle decode failure');
                break;
            case 'token_expired':
                console.log('Handle token expiration');
                break;
            case 'environment_error':
                console.log('Handle environment error');
                break;
            default:
                // TypeScript will catch if we miss any error codes
                const _exhaustive: never = errorCode;
                console.log('Unknown error code:', _exhaustive);
        }
    }

    if (isJwtError(invalidTokenResult)) {
        handleJwtError(invalidTokenResult.error.code);
    }
}

// Run examples
if (require.main === module) {
    jwtExamples().catch(console.error);
}

export { jwtExamples };
