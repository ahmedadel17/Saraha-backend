import { Router } from "express";
import * as messageService from "./messages.service.js";
import {
  haveToken,
  isAuthenticated,
} from "../../middlewares/authentication.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = Router();

router.get(
  "/sentMessages",
  haveToken,
  asyncHandler(messageService.getSentMessage)
);
router.get(
  "/receivedMessages",
  haveToken,
  asyncHandler(messageService.getReceivedMessage)
);
router.post("/create", haveToken, asyncHandler(messageService.createMessage));
router.delete(
  "/delete/:id",
  haveToken,
  asyncHandler(messageService.deleteMessage)
);

export default router;
