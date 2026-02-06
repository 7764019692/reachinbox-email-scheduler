import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { scheduleEmail } from "../services/email.service";

export const scheduleEmailController = async (req: Request, res: Response) => {
  try {
    const email = await scheduleEmail(req.body);
    res.status(201).json(email);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to schedule email" });
  }
};

export const getScheduledEmails = async (_req: Request, res: Response) => {
  const emails = await prisma.emailJob.findMany({
    where: { status: "scheduled" },
    orderBy: { scheduledAt: "asc" },
  });
  res.json(emails);
};

export const getSentEmails = async (_req: Request, res: Response) => {
  const emails = await prisma.emailJob.findMany({
    where: { status: "sent" },
    orderBy: { sentAt: "desc" },
  });
  res.json(emails);
};
