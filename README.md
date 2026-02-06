Perfect 👍
neeche company-level, submission-ready FULL README.md de raha hoon.
Tum direct copy–paste kar sakte ho GitHub repo me.
Isme ReachInbox assignment ke saare points mapped hain.

📧 ReachInbox – Full-Stack Email Scheduler

A production-grade email scheduling system inspired by ReachInbox’s core outreach workflows.
This project demonstrates reliable delayed email sending at scale, with persistence, rate limiting, and a clean dashboard UI.

🚀 Features Overview
✅ Backend

Email scheduling via API

Delayed job execution using BullMQ + Redis (❌ no cron jobs)

Persistent storage using PostgreSQL + Prisma

Restart-safe scheduling (jobs survive server restarts)

Worker concurrency & throttling

Hourly rate limiting

Ethereal SMTP integration (fake email testing)

Idempotent email sending

✅ Frontend

Next.js (App Router) + TypeScript

Tailwind CSS dashboard

Schedule new emails

View Scheduled Emails

View Sent Emails

Clean UX with loading & empty states

🏗️ Tech Stack
Backend

Node.js + TypeScript

Express.js

BullMQ

Redis

PostgreSQL

Prisma ORM

Ethereal Email (SMTP)

Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

🧠 System Architecture
Frontend (Next.js)
        |
        |  REST APIs
        v
Backend (Express + TS)
        |
        |  Delayed Jobs
        v
BullMQ Queue (Redis)
        |
        |  Concurrency + Rate Limit
        v
Worker → SMTP (Ethereal)
        |
        v
PostgreSQL (Persistence)

⏳ How Scheduling Works (No Cron)

Emails are stored in PostgreSQL with scheduledAt

A BullMQ delayed job is created for each email

Redis ensures job persistence

Worker processes jobs when delay expires

On server restart:

BullMQ reloads pending jobs from Redis

No duplicate emails are sent

✔️ Fully restart-safe
✔️ No OS or Node cron jobs used

⚙️ Rate Limiting & Concurrency
Worker Concurrency

Configurable BullMQ worker concurrency

Multiple jobs processed safely in parallel

Delay Between Emails

Minimum delay enforced between sends

Prevents SMTP throttling

Hourly Rate Limit

Configurable via environment variables

Redis-backed counters (safe across workers)

When limit is hit:

Jobs are delayed to next available window

No jobs are dropped

📁 Project Structure
reachinbox-email-scheduler/
│
├── backend/
│   ├── src/
│   │   ├── config/        # Redis & env config
│   │   ├── db/            # Prisma client
│   │   ├── queues/        # BullMQ queues
│   │   ├── workers/       # Email workers
│   │   ├── services/      # Business logic
│   │   ├── controllers/   # API handlers
│   │   ├── routes/        # Express routes
│   │   └── index.ts       # App entry
│   └── prisma/
│       └── schema.prisma
│
├── frontend/
│   └── src/
│       ├── app/
│       │   └── page.tsx   # Dashboard
│       └── lib/
│           └── api.ts     # API helpers
│
└── README.md

🧪 API Endpoints
Schedule Email
POST /emails/schedule


Body

{
  "toEmail": "test@ethereal.email",
  "subject": "Test Email",
  "body": "Hello from ReachInbox Scheduler",
  "senderEmail": "sender@reachinbox.com",
  "scheduledAt": "2026-02-07T04:45:00Z"
}

Get Scheduled Emails
GET /emails/scheduled

Get Sent Emails
GET /emails/sent

🖥️ Running the Project Locally
1️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/reachinbox
REDIS_HOST=127.0.0.1
REDIS_PORT=6379


Run Prisma:

npx prisma migrate dev
npx prisma generate


Start backend:

npm run dev


Backend runs on:

http://localhost:3000

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev -- -p 3001


Frontend runs on:

http://localhost:3001

📬 Ethereal Email Setup

Emails are sent using Ethereal (fake SMTP)

Each email generates a preview URL in logs

No real emails are delivered

Perfect for testing & demos.

🔄 Restart Safety Demo

Schedule an email 5 minutes in the future

Stop backend server

Restart backend

Email is still sent at scheduled time

✔️ No duplication
✔️ No rescheduling from scratch

🎥 Demo Video (Submission)

The demo video shows:

Scheduling emails from UI

Viewing Scheduled & Sent tabs

Backend restart without job loss

Rate limiting behavior

⚠️ Assumptions & Trade-offs

Google OAuth UI not implemented (can be added)

Single-tenant rate limiting (extendable to per-user)

Ethereal SMTP used instead of real provider

Basic UI error handling for clarity

👨‍💻 Author Notes


