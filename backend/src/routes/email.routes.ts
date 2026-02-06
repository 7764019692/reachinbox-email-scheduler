import { Router } from "express";
import {
  scheduleEmailController,
  getScheduledEmails,
  getSentEmails,
} from "../controllers/email.controller";

const router = Router();

router.post("/schedule", scheduleEmailController);
router.get("/scheduled", getScheduledEmails);
router.get("/sent", getSentEmails);

export default router;
