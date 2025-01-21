import User from "../../DB/models/user.model.js";
import { decrypt, encrypt } from "../../utils/encryption.js";
import { compareHashing, hashing } from "../../utils/hashing.js";
import { generateToken, verifyToken } from "../../utils/token.js";
import { sendEmail, subjects } from "../../utils/sendEmail.js";
import { emailTemplate } from "../../utils/emailtemplate.js";
import { emailEmitter } from "../../utils/emailemitter.js";

export const getAuth = (req, res) =>
  res.status(500).json({ message: "get auth" });
export const Register = async (req, res) => {
  const { email, userName, password, confirmPassword, gender, address } =
    req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.status(409).json({ message: "user already exists" });
  }
  const user = await User.create({
    email,
    userName,
    password: hashing({ plaintext: password }),
    confirmPassword,
    gender,
    address: encrypt({ plaintext: address }),
  });
  const token = generateToken({ id: user._id, email: user.email });
  const link = ` http://localhost:5173/activateAccount/${token}`;
  emailEmitter.emit("sendEmail", email, userName, link);
  if (user) {
    return res
      .status(201)
      .json({ message: "user created successfully", user: user });
  }
  return next(new Error("something went wrong", { cause: 500 }));
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("user Not found", { cause: 404 }));
  }
  if (user) {
    const checkPassword = compareHashing({
      plaintext: password,
      hashedText: user.password,
    });
    user.address = user.address ? decrypt({ cipherText: user.address }) : "";

    if (!checkPassword) {
      return next(new Error("invalid password", { cause: 400 }));
    }
    const token = generateToken({ id: user._id, email: user.email });

    return res.status(200).json({ message: "sign in successfully", token });
  }
  return next(new Error("something went wrong", { cause: 500 }));
};
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("user Not found", { cause: 404 }));
  }
  if (user) {
    const token = generateToken({ id: user._id, email: user.email });
    const link = ` http://localhost:5173/auth/resetPassword/${token}`;
    emailEmitter.emit("resetPassword", email, user.userName, link);
    return res.status(200).json({ message: "email sent successfully" });
  }
};
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken(token, process.env.JWT_SECRET);
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new Error("password does not match", { cause: 400 }));
  }
  const user = await User.findOneAndUpdate(
    { email },
    {
      password: hashing({ plaintext: password }),
    },
    { new: true }
  );
  return res.status(200).json({ message: "password reset successfully" });
};
export const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  const { email } = verifyToken(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("user Not found", { cause: 404 }));
  }
  if (user) {
    user.confirmEmail = true;
    await user.save();
    return res.status(200).json({ message: "account activated successfully" });
  }
};
