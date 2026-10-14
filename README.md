# The Mastery Dr — LMS & Institute Platform

A comprehensive Learning Management System (LMS) and Institute platform built for **The Mastery Dr & Gain Mastery Institute**.

## Features

- **Course Management & LMS**: Video lessons, progress tracking, and module organization.
- **Student Authentication & Sessions**: JWT-based session security with bcrypt credential hashing.
- **Payment Gateway Integration**: Secure Paystack checkout and webhook verification.
- **PostgreSQL Database**: Powered by Neon serverless PostgreSQL.
- **Admin & Instructor Portal**: User management, analytics, and course authoring.
- **QR Code Verification**: Certificate and credentials verification.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon Database Serverless)
- **Styling**: Vanilla CSS / Modular Design System
- **Icons**: Lucide React

## Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/TheMasteryDr/themasterydr.git
cd themasterydr
npm install
```

### 3. Environment Setup

Copy `.env.example` to `.env.local` and configure your credentials:

```bash
cp .env.example .env.local
```

Fill in your:
- `DATABASE_URL` (Neon PostgreSQL)
- `JWT_SECRET`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` & `PAYSTACK_SECRET_KEY`
- Other service keys as required

### 4. Database Migration & Seeding

```bash
npm run migrate
npm run seed
```

### 5. Running Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

Private and proprietary. All rights reserved by The Mastery Dr & Gain Mastery Institute.
