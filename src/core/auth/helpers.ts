import { Errors } from "..";

export const genPin = (
    length = 6
): string => {
    if (length < 4 || length > 12) throw new Errors.Custom('PIN length must be between 4 and 12', 'INVALID_PIN_LENGTH', 400);

    const max = Math.pow(10, length);
    const min = Math.pow(10, length - 1);
    return Math.floor(Math.random() * (max - min) + min).toString();
};



export const genShort = (
    length = 8, 
    options: { uppercase?: boolean } = {}
): string => {
    const alphabet = options.uppercase
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('');
};

export const genOtp = (
    length = 6,
    expiresInMinutes = 5
) => ({
    code: genPin(length),
    expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
})


export const genSlug = (
    text: string,
    maxLength = 50
) => text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, maxLength)
