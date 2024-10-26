import { AES, enc } from 'crypto-js';


import { RandomStringProps } from '../interfaces/ComponentInterfaces';
import Environment from './../environments/Environment';

const { SECRET_KEY } = Environment;

export const encryptData = (data: any) => AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

export const decryptData = (ciphertext: string) => JSON.parse(AES.decrypt(ciphertext, SECRET_KEY).toString(enc.Utf8));

export const generateRandomString = ({
  length = 15,
  useLowercase = true,
  useUppercase = true,
  useNumbers = true,
  useSpecialChars = true
}: RandomStringProps): string => {
  const charTypes = [
    { use: useLowercase, chars: 'abcdefghijklmnopqrstuvwxyz' },
    { use: useUppercase, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
    { use: useNumbers, chars: '0123456789' },
    { use: useSpecialChars, chars: '!@#$%^&*()_+-={}[]|:;"<>,.?/' }
  ];
  const allChars = charTypes
    .filter(charType => charType.use)
    .map(charType => charType.chars)
    .join('');
  if (allChars.length === 0) {
    throw new Error('At least one character type must be selected');
  }
  return Array.from({ length }, () => allChars[Math.floor(Math.random() * allChars.length)]).join('');
};
