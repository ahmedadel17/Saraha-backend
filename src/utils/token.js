import jwt from "jsonwebtoken";

export const generateToken = (
  payload,
  secretKey = process.env.JWT_SECRET,
  expiresIn = "1d"
) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
};
export const verifyToken = (token, secretKey = process.env.JWT_SECRET) => {
  try {
    if (jwt.verify(token, secretKey)) {
      return jwt.verify(token, secretKey);
    }
    // return false;
  } catch (error) {
    console.log(error);
  }
};
