import { Router } from "express";
import * as authService from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();
router.get("/", asyncHandler(authService.getAuth));
router.post("/register", asyncHandler(authService.Register));
router.post("/login", asyncHandler(authService.login));
router.post(
  "/activateAccount/:token",
  asyncHandler(authService.activateAccount)
);
router.post("/forgetPassword/", asyncHandler(authService.forgetPassword));
router.post("/resetPassword/:token", asyncHandler(authService.resetPassword));

export default router;
