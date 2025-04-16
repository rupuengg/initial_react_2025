const SECERT_SALT = '7c606d287b6d6b7a6d7c287b7c7a61666f';

const cipher = (salt: any) => {
  const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
  const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);

  return (text: any) => text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

const decipher = (salt: any) => {
  const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0));
  const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code);
  return (encoded: any) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex: any) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode: any) => String.fromCharCode(charCode))
      .join('');
};

export const encryption = cipher(SECERT_SALT);

export const decryption = decipher(SECERT_SALT);
