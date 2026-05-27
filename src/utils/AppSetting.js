export const AESKeyValue = process.env.NEXT_PUBLIC_AES_KEY;
export const AESIVKey    = process.env.NEXT_PUBLIC_AES_IV;

export const value1 = process.env.NEXT_PUBLIC_AES_KEY;
export const value2 = process.env.NEXT_PUBLIC_AES_IV;
export const value3 = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME;
export const value4 = process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME;
export const value5 = 'BM_BasicToken';

export const InactivityTimeout       = Number(process.env.NEXT_PUBLIC_INACTIVITY_TIMEOUT) || 30;
export const IsEncryption            = process.env.NEXT_PUBLIC_IS_ENCRYPTION === 'true';
export const IsQueryParamsEncryption = process.env.NEXT_PUBLIC_IS_ENCRYPTION === 'true';
export const IsProdMode              = process.env.NEXT_PUBLIC_IS_PROD_MODE === 'true';
export const IsUnderMaintenance      = process.env.NEXT_PUBLIC_IS_UNDER_MAINTENANCE === 'true';
