import { config } from 'dotenv';
config({ path: '../.env' });
import * as crypto from 'crypto';

export const encryptUserPassword = function (key: string, password: string) {
   const iv = crypto.randomBytes(12); // AES-GCM requires a 12-byte IV
   const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'base64'), iv);

   let cipherText = cipher.update(password, 'utf-8', 'hex');
   cipherText += cipher.final('hex');
   const tag = cipher.getAuthTag().toString('base64');

   return { cipherText, iv: iv.toString('base64'), tag };
};

export const decryptUserPassword = function (key: string, cipherText: string, iv: string, tag: string) {
   const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'base64'), Buffer.from(iv, 'base64'));
   decipher.setAuthTag(Buffer.from(tag, 'base64'));
   let plainText = decipher.update(cipherText, 'hex', 'utf-8');
   plainText += decipher.final('utf-8');
   return plainText;
};
