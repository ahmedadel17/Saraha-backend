import CryptoJs from "crypto-js";
export const encrypt = ({ plaintext }, key = process.env.KEY) => {
  const cipherText = CryptoJs.AES.encrypt(plaintext, key).toString();
  return cipherText;
};
export const decrypt = ({ cipherText }, key = process.env.KEY) => {
  const plaintext = CryptoJs.AES.decrypt(cipherText, key).toString(
    CryptoJs.enc.Utf8
  );
  return plaintext;
};
