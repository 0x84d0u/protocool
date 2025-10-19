import jwt from "jsonwebtoken";
import type { SignOptions, VerifyOptions, JwtPayload } from "jsonwebtoken";
import { Errors } from "..";

export {
    SignOptions,
    VerifyOptions,
    JwtPayload as Payload,
} from 'jsonwebtoken'

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export const sign = (
    payload: JwtPayload,
    secret: string,
    options: SignOptions = {}
): string => {
    try {
        return jwt.sign(payload, secret, {
            expiresIn: options.expiresIn || '1h',
            algorithm: options.algorithm || 'HS256',
            ...options,
        });
    } catch (error) {
        throw new Errors.Custom('JWT signing failed', 'JWT_SIGN_ERROR', 500, { error });
    }
};

export const verify = <T = unknown>(
    token: string,
    secret: string,
    options: VerifyOptions = {}
): T => {
    try {
        return jwt.verify(token, secret, options) as T;
    } catch (error) {
        const err = error as Error;
        if (err.name === 'TokenExpiredError') {
            throw new Errors.Authentication('Token has expired');
        }
        if (err.name === 'JsonWebTokenError') {
            throw new Errors.Authentication('Invalid token');
        }
        throw new Errors.Authentication('Token verification failed');
    }
};

export const decode = <T = unknown>(token: string): T | null => {
    try {
        return jwt.decode(token) as T;
    } catch {
        return null;
    }
};

export const genPair = (
    payload: JwtPayload,
    secret: string,
    accessExpiresIn: SignOptions['expiresIn'] = '15m',
    refreshExpiresIn: SignOptions['expiresIn'] = '7d'
): TokenPair => ({
    accessToken: sign(payload, secret, { expiresIn: accessExpiresIn }),
    refreshToken: sign(payload, secret, { expiresIn: refreshExpiresIn }),
});