import bcrypt from 'bcryptjs';
import { Errors } from "..";

export const hash = async (password: string, rounds = 10): Promise<string> => {
  try {
    return await bcrypt.hash(password, rounds);
  } catch (error) {
    throw new Errors.Custom('Password hashing failed', 'HASH_ERROR', 500, { error });
  }
};

export const compare = async (password: string, hash: string): Promise<boolean> => {
  try {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Errors.Custom('Password comparison failed', 'COMPARE_ERROR', 500, { error });
  }
};

// export const valStrength = (
//   password: string,
//   options: {
//     minLength?: number;
//     requireUppercase?: boolean;
//     requireLowercase?: boolean;
//     requireNumbers?: boolean;
//     requireSpecialChars?: boolean;
//   } = {}
// ): { valid: boolean; errors: string[] } => {
//   const {
//     minLength = 8,
//     requireUppercase = true,
//     requireLowercase = true,
//     requireNumbers = true,
//     requireSpecialChars = true,
//   } = options;

//   const errors: string[] = [];

//   if (password.length < minLength)
//     errors.push(`Password must be at least ${minLength} characters`);
//   if (requireUppercase && !/[A-Z]/.test(password))
//     errors.push('Password must contain at least one uppercase letter');
//   if (requireLowercase && !/[a-z]/.test(password))
//     errors.push('Password must contain at least one lowercase letter');
//   if (requireNumbers && !/\d/.test(password))
//     errors.push('Password must contain at least one number');
//   if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
//     errors.push('Password must contain at least one special character');

//   return { valid: errors.length === 0, errors };
// };