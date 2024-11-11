import { AES, enc } from "crypto-js";
import { RandomStringProps } from '../interfaces/ComponentInterfaces';
import Environment from './../environments/Environment';

const { SECRET_KEY, PUBLIC_KEY } = Environment;

export const encryptData = (data: any) => AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

export const decryptData = (ciphertext: string) => JSON.parse(AES.decrypt(ciphertext, SECRET_KEY).toString(enc.Utf8));

export const encodeBase64 = (data: any, count: number = 1): string => {
  const b64 = btoa(JSON.stringify(data))
  return count === 1 ? b64 : encodeBase64(b64, count - 1)
}

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

// export const generateAESKey = async (): Promise<CryptoKey> => {
//   return await window.crypto.subtle.generateKey(
//     { name: "AES-GCM", length: 128 },
//     true,
//     ["encrypt", "decrypt"]
//   );
// };

// export const generateIV = (): Uint8Array => {
//   const iv = new Uint8Array(12);
//   window.crypto.getRandomValues(iv);
//   return iv;
// };


// const encryptAES = async (text: string, key: CryptoKey): Promise<{ encryptedData: string; iv: string }> => {
//   const iv = generateIV();
//   const encoder = new TextEncoder();
//   const encodedText = encoder.encode(text);

//   const encryptedBuffer = await window.crypto.subtle.encrypt(
//     {
//       name: "AES-GCM",
//       iv: iv,
//     },
//     key,
//     encodedText
//   );

//   // Codificar los datos cifrados y el IV en Base64 para facilitar el envío o almacenamiento
//   const encryptedData = btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
//   const ivBase64 = btoa(String.fromCharCode(...iv));

//   return {
//     encryptedData,
//     iv: ivBase64,
//   };
// };

// export const encryptKeyRSA = async (aesKey: CryptoKey): Promise<string> => {
//   const exportedKey = new Uint8Array(await window.crypto.subtle.exportKey("raw", aesKey));

//   const publicKey = forge.pki.publicKeyFromPem(PUBLIC_KEY);
//   const encryptedKey = publicKey.encrypt(forge.util.binary.raw.encode(exportedKey), 'RSA-OAEP', {
//     md: forge.md.sha256.create(),
//   });
//   return forge.util.encode64(encryptedKey);
// }


// export const encryptAES_RSA = async (data: any): Promise<string> => {
//   const plainData = JSON.stringify(data)
//   console.log("plainData", plainData);

//   const key = await generateAESKey();
//   console.log("key", key);
//   const { encryptedData, iv } = await encryptAES(plainData, key);
//   console.log("iv", iv);
//   console.log("encryptedData", encryptedData);
//   const encryptedKey = await encryptKeyRSA(key);
//   console.log("encryptedKey", encryptedKey);

//   const resp = {
//     iv,
//     key: encryptedKey,
//     data: encryptedData,
//   }
//   console.log("resp", resp);


//   // Convertir el objeto a JSON y luego a Base64
//   const jsonString = JSON.stringify(resp);
//   const base64String = btoa(jsonString);
//   console.log("base64String", base64String);
//   console.log(base64String.length / 4);

//   return base64String;

// }




