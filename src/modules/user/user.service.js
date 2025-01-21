import User from "../../DB/models/user.model.js";
import { decrypt, encrypt } from "../../utils/encryption.js";
import { compareHashing, hashing } from "../../utils/hashing.js";
export const getUser = async (req, res, next) => {
  const user = req.user;
  if (!user) return next(new Error("user not found", { cause: 404 }));
  res.status(200).json({
    message: "get user",
    user: {
      ...user,
      address: decrypt({ cipherText: user.address }),
    },
  });
};
export const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  // console.log(user);
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  if (
    compareHashing({
      plaintext: req.body.newPassword,
      hashedText: user.password,
    })
  ) {
    return next(
      new Error("you cannot enter the same password", {
        cause: 409,
      })
    );
  }
  if (
    !compareHashing({
      plaintext: req.body.currentPassword,
      hashedText: user.password,
    })
  ) {
    return next(
      new Error("invalid password", {
        cause: 400,
      })
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id, // The ID of the user to update
    { password: hashing({ plaintext: req.body.newPassword }) }, // The fields to update
    { new: true } // Return the updated document
  );
  if (!updatedUser) {
    return next(new Error("password error", { cause: 404 }));
  }
  return res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
};
export const updateUser = async (req, res, next) => {
  console.log(req.user);
  const user = req.user;
  // const user = await User.findById(req.user._id);
  if (!user) return next(new Error("user not found", { cause: 404 }));
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id, // The ID of the user to update
    { ...req.body, address: encrypt({ plaintext: req.body.address }) }, // The fields to update
    { new: true } // Return the updated document
  );
  if (!updatedUser) {
    return next(new Error("user not found", { cause: 404 }));
  }
  return res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
};
