import { Router } from "express";
import * as userService from "./user.service.js";
import {
  allowTo,
  haveToken,
  isAuthenticated,
} from "../../middlewares/authentication.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.get(
  "/profile",
  isAuthenticated,
  allowTo(["user"]),
  asyncHandler(userService.getUser)
);
router.get("/edit", haveToken, asyncHandler(userService.getUser));
router.patch(
  "/updatePassword",
  haveToken,
  //   allowTo(["user"]),
  asyncHandler(userService.updatePassword)
);
router.patch(
  "/updateProfile",
  haveToken,
  //   allowTo(["user"]),
  asyncHandler(userService.updateUser)
);

export default router;
