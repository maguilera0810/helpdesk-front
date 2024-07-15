import { AES, enc } from 'crypto-js';
import Environment from './../environments/Environment';
const { SECRET_KEY } = Environment;

export const encryptData = (data: any) => {
  return AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string) => {
  return JSON.parse(AES.decrypt(ciphertext, SECRET_KEY).toString(enc.Utf8));
};
