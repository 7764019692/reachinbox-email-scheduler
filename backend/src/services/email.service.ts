import { prisma } from "../db/prisma";
import { emailQueue } from "../queues/email.queue";

export const scheduleEmail = async (data: any) => {
  const email = await prisma.emailJob.create({
    data: {
      toEmail: data.toEmail,
      subject: data.subject,
      body: data.body,
      senderEmail: data.senderEmail,
      scheduledAt: new Date(data.scheduledAt),
      status: "scheduled",
    },
  });

  const delay = new Date(data.scheduledAt).getTime() - Date.now();

  await emailQueue.add(
    "send-email",
    { emailJobId: email.id },
    {
      delay: Math.max(delay, 0),
      jobId: email.id,
    }
  );

  return email;
};
