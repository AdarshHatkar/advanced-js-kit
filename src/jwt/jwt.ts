import * as jsonwebtoken from "jsonwebtoken";
import { JwtPayload, VerifyOptions, SignOptions, Secret, SignCallback } from "jsonwebtoken";
import { assertNodeEnvironment } from "../utils/environment";

/**
 * Error thrown when JWT operations fail
 */
export class JwtError extends Error {
    constructor(message: string, public readonly originalError?: Error) {
        super(message);
        this.name = "JwtError";
    }
}

/**
 * Generic payload type for JWT tokens
 */
export interface JwtTokenPayload extends JwtPayload {
    [key: string]: any;
}

/**
 * Options for JWT verification
 */
export interface JwtVerifyOptions extends VerifyOptions {
    /** Whether to throw an error or return null on verification failure */
    throwOnError?: boolean;
}

/**
 * Options for JWT signing
 */
export interface JwtSignOptions extends Omit<SignOptions, 'expiresIn'> {
    /** Token expiration time */
    expiresIn?: string | number;
    /** Default expiration time if not specified in payload */
    defaultExpiresIn?: string | number;
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * 
 * @template T - The expected payload type
 * @param token - The JWT token to verify
 * @param secret - The secret key or public key for verification
 * @param options - Additional verification options
 * @returns Promise that resolves to the decoded payload or null if verification fails and throwOnError is false
 * @throws {JwtError} When verification fails and throwOnError is true (default)
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const payload = await jwtVerify<{ userId: string }>(token, 'secret');
 * 
 * // With custom options
 * const payload = await jwtVerify(token, 'secret', { 
 *   audience: 'my-app',
 *   issuer: 'my-service',
 *   throwOnError: false 
 * });
 * ```
 */
export async function jwtVerify<T extends JwtTokenPayload = JwtTokenPayload>(
    token: string,
    secret: Secret,
    options: JwtVerifyOptions = {}
): Promise<T | null> {
    // Check if running in Node.js environment
    assertNodeEnvironment();
    
    const { throwOnError = true, ...verifyOptions } = options;

    return new Promise<T | null>((resolve, reject) => {
        if (!token || typeof token !== 'string') {
            const error = new JwtError('Invalid token: Token must be a non-empty string');
            return throwOnError ? reject(error) : resolve(null);
        }

        if (!secret) {
            const error = new JwtError('Invalid secret: Secret is required for token verification');
            return throwOnError ? reject(error) : resolve(null);
        }

        jsonwebtoken.verify(token, secret, verifyOptions, (err, decoded) => {
            if (err) {
                const jwtError = new JwtError(`JWT verification failed: ${err.message}`, err);
                return throwOnError ? reject(jwtError) : resolve(null);
            }

            // Ensure we have a valid payload object
            if (!decoded || typeof decoded === 'string') {
                const error = new JwtError('Invalid payload: Expected object payload');
                return throwOnError ? reject(error) : resolve(null);
            }

            resolve(decoded as T);
        });
    });
}

/**
 * Signs a payload and creates a JWT token.
 * 
 * @template T - The payload type
 * @param payload - The payload to sign
 * @param secret - The secret key for signing
 * @param options - Additional signing options
 * @returns Promise that resolves to the signed JWT token
 * @throws {JwtError} When signing fails
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const token = await jwtSign({ userId: '123' }, 'secret');
 * 
 * // With expiration
 * const token = await jwtSign(
 *   { userId: '123', role: 'admin' }, 
 *   'secret', 
 *   { expiresIn: '1h' }
 * );
 * 
 * // With default expiration
 * const token = await jwtSign(
 *   { userId: '123' }, 
 *   'secret', 
 *   { defaultExpiresIn: '24h' }
 * );
 * ```
 */
export async function jwtSign<T extends Record<string, any> = Record<string, any>>(
    payload: T,
    secret: Secret,
    options: JwtSignOptions = {}
): Promise<string> {
    // Check if running in Node.js environment
    assertNodeEnvironment();
    
    const { defaultExpiresIn, ...signOptions } = options;

    return new Promise<string>((resolve, reject) => {
        if (!payload || typeof payload !== 'object') {
            return reject(new JwtError('Invalid payload: Payload must be an object'));
        }

        if (!secret) {
            return reject(new JwtError('Invalid secret: Secret is required for token signing'));
        }

        // Apply default expiration if not already set
        const finalOptions = {
            ...signOptions,
            ...(defaultExpiresIn && !signOptions.expiresIn && { expiresIn: defaultExpiresIn })
        };

        jsonwebtoken.sign(payload, secret, finalOptions as SignOptions, (err, token) => {
            if (err) {
                return reject(new JwtError(`JWT signing failed: ${err.message}`, err));
            }

            if (!token) {
                return reject(new JwtError('JWT signing failed: No token generated'));
            }

            resolve(token);
        });
    });
}

/**
 * Decodes a JWT token without verification.
 * Useful for inspecting token contents when verification is not required.
 * 
 * @template T - The expected payload type
 * @param token - The JWT token to decode
 * @param options - Decode options
 * @returns The decoded token object or null if decoding fails
 * 
 * @example
 * ```typescript
 * const decoded = jwtDecode<{ userId: string }>(token);
 * if (decoded) {
 *   console.log('User ID:', decoded.payload.userId);
 *   console.log('Expires at:', new Date(decoded.payload.exp * 1000));
 * }
 * ```
 */
export function jwtDecode<T extends JwtTokenPayload = JwtTokenPayload>(
    token: string,
    options: { complete?: boolean } = {}
): T | null {
    try {
        if (!token || typeof token !== 'string') {
            return null;
        }

        const decoded = jsonwebtoken.decode(token, options);
        
        if (!decoded) {
            return null;
        }

        return decoded as T;
    } catch (error) {
        return null;
    }
}

/**
 * Checks if a JWT token is expired without full verification.
 * 
 * @param token - The JWT token to check
 * @returns True if the token is expired, false if valid, null if token is invalid
 * 
 * @example
 * ```typescript
 * const isExpired = jwtIsExpired(token);
 * if (isExpired === true) {
 *   console.log('Token is expired');
 * } else if (isExpired === false) {
 *   console.log('Token is still valid');
 * } else {
 *   console.log('Invalid token');
 * }
 * ```
 */
export function jwtIsExpired(token: string): boolean | null {
    const decoded = jwtDecode(token);
    
    if (!decoded || !decoded.exp) {
        return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
}

/**
 * Gets the remaining time until token expiration in seconds.
 * 
 * @param token - The JWT token to check
 * @returns Remaining seconds until expiration, or null if token is invalid or has no expiration
 * 
 * @example
 * ```typescript
 * const timeLeft = jwtTimeUntilExpiry(token);
 * if (timeLeft !== null) {
 *   console.log(`Token expires in ${timeLeft} seconds`);
 * }
 * ```
 */
export function jwtTimeUntilExpiry(token: string): number | null {
    const decoded = jwtDecode(token);
    
    if (!decoded || !decoded.exp) {
        return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;
    
    return timeLeft > 0 ? timeLeft : 0;
}

/**
 * JWT utility namespace providing a convenient API for JWT operations.
 * 
 * @example
 * ```typescript
 * import { jwt } from 'advanced-js-kit/jwt/jwt';
 * 
 * // Use jwt.verify instead of jwtVerify
 * const payload = await jwt.verify(token, secret);
 * const newToken = await jwt.sign({ userId: '123' }, secret);
 * ```
 */
export const jwt = {
    /**
     * Verifies a JWT token and returns the decoded payload.
     * Alias for jwtVerify function.
     */
    verify: jwtVerify,
    
    /**
     * Signs a payload and creates a JWT token.
     * Alias for jwtSign function.
     */
    sign: jwtSign,
    
    /**
     * Decodes a JWT token without verification.
     * Alias for jwtDecode function.
     */
    decode: jwtDecode,
    
    /**
     * Checks if a JWT token is expired.
     * Alias for jwtIsExpired function.
     */
    isExpired: jwtIsExpired,
    
    /**
     * Gets the remaining time until token expiration.
     * Alias for jwtTimeUntilExpiry function.
     */
    timeUntilExpiry: jwtTimeUntilExpiry
} as const;
