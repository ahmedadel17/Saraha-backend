import bcrypt from "bcrypt";
export const hashing = ({ plaintext }, salt = process.env.SALT) => {
  const hashedText = bcrypt.hashSync(plaintext, parseInt(salt));
  return hashedText;
};
export const compareHashing = ({ hashedText, plaintext }) =>
  bcrypt.compareSync(plaintext, hashedText);
