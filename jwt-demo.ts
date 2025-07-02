// Example usage of the improved JWT utilities
import { 
    jwtSign, 
    jwtVerify, 
    jwtDecode, 
    jwtIsExpired, 
    jwtTimeUntilExpiry,
    JwtError,
    jwt // Import the namespace object
} from './src/jwt/jwt';

// Example of how to use the new JWT utilities

async function demonstrateJwtUtilities() {
    const secret = 'your-secret-key';
    
    try {
        // 1. Sign a JWT token
        console.log('=== JWT Signing ===');
        const token = await jwtSign(
            { userId: '123', role: 'admin', email: 'user@example.com' },
            secret,
            { expiresIn: '1h', issuer: 'my-app' }
        );
        console.log('Generated token:', token);

        // 2. Verify a JWT token
        console.log('\n=== JWT Verification ===');
        const payload = await jwtVerify<{ userId: string; role: string; email: string }>(
            token,
            secret,
            { issuer: 'my-app' }
        );
        console.log('Verified payload:', payload);

        // 3. Decode without verification
        console.log('\n=== JWT Decoding ===');
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        // 4. Check if token is expired
        console.log('\n=== Expiration Check ===');
        const isExpired = jwtIsExpired(token);
        console.log('Is token expired?', isExpired);

        // 5. Get time until expiry
        const timeLeft = jwtTimeUntilExpiry(token);
        console.log('Time until expiry (seconds):', timeLeft);

        // 6. Error handling example
        console.log('\n=== Error Handling ===');
        try {
            await jwtVerify('invalid-token', secret);
        } catch (error) {
            if (error instanceof JwtError) {
                console.log('JWT Error:', error.message);
                console.log('Original error:', error.originalError?.message);
            }
        }

        // 7. Non-throwing verification
        const nullResult = await jwtVerify('invalid-token', secret, { throwOnError: false });
        console.log('Non-throwing verification result:', nullResult);

        // 8. Using the jwt namespace (alternative syntax)
        console.log('\n=== JWT Namespace Usage ===');
        const namespaceToken = await jwt.sign(
            { userId: '456', role: 'user' },
            secret,
            { expiresIn: '2h' }
        );
        console.log('Token from jwt.sign:', namespaceToken);

        const namespacePayload = await jwt.verify<{ userId: string; role: string }>(
            namespaceToken,
            secret
        );
        console.log('Payload from jwt.verify:', namespacePayload);

        const namespaceDecoded = jwt.decode(namespaceToken);
        console.log('Decoded from jwt.decode:', namespaceDecoded);

        console.log('Is expired (jwt.isExpired):', jwt.isExpired(namespaceToken));
        console.log('Time until expiry (jwt.timeUntilExpiry):', jwt.timeUntilExpiry(namespaceToken));

    } catch (error) {
        console.error('Demo error:', error);
    }
}

// Uncomment to run the demo:
// demonstrateJwtUtilities();
