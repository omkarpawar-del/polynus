import crypto from 'crypto';
const key = () => Buffer.from(process.env.TOKEN_ENCRYPTION_KEY!, 'base64');
export function encrypt(value: string) { const iv = crypto.randomBytes(12); const cipher = crypto.createCipheriv('aes-256-gcm', key(), iv); const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]); return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString('base64'); }
export function decrypt(value: string) { const body=Buffer.from(value,'base64'), iv=body.subarray(0,12), tag=body.subarray(12,28), data=body.subarray(28); const decipher=crypto.createDecipheriv('aes-256-gcm',key(),iv); decipher.setAuthTag(tag); return Buffer.concat([decipher.update(data),decipher.final()]).toString('utf8'); }
