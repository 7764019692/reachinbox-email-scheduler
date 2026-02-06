import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import { prisma } from "../db/prisma";
import { redis } from "../config/redis";

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST,
  port: Number(process.env.ETHEREAL_PORT || 587),
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

new Worker(
  "email-queue",
  async (job) => {
    const { emailJobId } = job.data;

    const email = await prisma.emailJob.findUnique({
      where: { id: emailJobId },
    });

    if (!email || email.status === "sent") return;

    // mark processing (optional but clean)
    await prisma.emailJob.update({
      where: { id: emailJobId },
      data: { status: "processing" },
    });

    await transporter.sendMail({
      from: email.senderEmail,
      to: email.toEmail,
      subject: email.subject,
      text: email.body,
    });

    await prisma.emailJob.update({
      where: { id: emailJobId },
      data: {
        status: "sent",
        sentAt: new Date(),
      },
    });
  },
  {
    connection: redis,
    concurrency: 5,
    limiter: { max: 1, duration: 2000 }, // 2 sec gap
  }
);
