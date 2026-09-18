# The Mastery Dr — Official Platform & Digital Ecosystem

The official personal brand authority, education ecosystem, and leadership community platform for **Moses Oladoye (The Mastery Dr)** — Leadership Strategist, Author, Executive Coach, and Founder of Gain Mastery Institute.

---

## 🏛️ Ecosystem Overview

The platform integrates six core operational engines into a unified, dark luxury digital ecosystem:

1. **Personal Brand Authority & Biography** (`/`, `/about`)
   - Interactive bio, credentials, philosophy, signature quotes, and curated photoshoot imagery.
2. **Gain Mastery Institute (LMS & Marketplace)** (`/institute`, `/institute/course/[slug]`)
   - High-ticket and accessible leadership courses, interactive curriculum browser, preview lessons, syllabus timeline, and Paystack payment gateway integration.
3. **The Bereans Reading Community** (`/bereans`, `/bereans/apply`)
   - Rigorous reading culture, quarterly book archives, core principles, reading syllabus, and multi-step screening application.
4. **Speaking Invitation CRM Engine** (`/speaking`, `/speaking/invite`)
   - 20-field structured speaking inquiry pipeline with automated inquiry tracking codes (`SPK-XXXXXX`), honorarium classification, and host logistics.
5. **Credentials & Certification Verification** (`/verify/certificate/[code]`)
   - Public cryptographic verification portal for Gain Mastery Institute graduates and alumni.
6. **Executive Admin Command Center** (`/admin`)
   - Real-time management of speaking inquiries, Bereans screening admissions, course enrollments, testimonials moderation, and revenue metrics.
7. **Student Classroom & Learning Dashboard** (`/dashboard`, `/dashboard/course/[slug]`)
   - Video curriculum playback, lesson navigation, interactive multi-question knowledge check quizzes, and project assignment submissions.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Vanilla CSS Design System with custom dark luxury tokens (Honeydew Gold `#C8AA6E`, Emerald `#0E8A5E`, Obsidian `#08090C`, Deep Slate `#0F1217`)
- **Typography**: Fraunces (Display Serif), Manrope (Body Sans), Space Mono (Monospace)
- **Database ORM**: Drizzle ORM with Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Payments**: Paystack API integration with HMAC SHA512 webhook signature verification
- **Validation**: Schema-level verification with safe data handling and RESTful endpoints

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18.18+ or 20+
- A Neon PostgreSQL account (or compatible Postgres instance)
- A Paystack developer account (Test or Live keys)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/the-mastery-dr.git
cd the-mastery-dr

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your configuration keys:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://[user]:[password]@[endpoint].neon.tech/themasterydr?sslmode=require
AUTH_SECRET=your-secure-secret-minimum-32-characters
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
```

### 4. Database Setup
Push the Drizzle ORM schema to your Neon PostgreSQL instance:
```bash
npx drizzle-kit push
```

### 5. Running the Application
```bash
# Start development server
npm run dev

# Or build for production
npm run build
npm start
```
Visit `http://localhost:3000` in your browser.

---

## 📂 Project Structure

```
├── public/
│   └── images/              # Authentic photoshoot imagery of Moses Oladoye
├── src/
│   ├── app/
│   │   ├── (site pages)/    # App router routes (/, /about, /speaking, etc.)
│   │   ├── admin/           # Executive command center
│   │   ├── dashboard/       # Student LMS classroom & progress
│   │   ├── institute/       # Course catalog & Paystack checkout
│   │   ├── api/v1/          # RESTful APIs (speaking, bereans, reviews, payments)
│   │   └── globals.css      # Luxury dark tokens, typography, component utilities
│   ├── components/          # Reusable UI components (Header, Footer, Modals)
│   └── lib/
│       ├── data/            # Course catalogs, books, curriculum definitions
│       └── db/              # Drizzle ORM schema and Neon DB client
├── drizzle.config.ts        # Drizzle Kit database configuration
├── package.json
└── tsconfig.json
```

---

## 🌐 Production Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the project into **Vercel**.
3. Under **Environment Variables**, add the variables specified in `.env.example`.
4. Deploy the project.
5. In **Domain Settings**, map `themasterydr.com` and `www.themasterydr.com`.

> **IMPORTANT (DNS & Email Preservation)**:
> In your Namecheap DNS management console, **only update the `@` (A) and `www` (CNAME) records** pointing to Vercel.
> **DO NOT modify or remove the existing MX, TXT, or SPF records** for `gainmastery.org` / `themasterydr.com` to guarantee uninterrupted delivery of domain emails (such as `moses@gainmastery.org`).

---

## 🔒 Security & Paystack Webhooks

- Webhooks are securely verified via HMAC SHA512 signature matching using `PAYSTACK_SECRET_KEY` in `/api/v1/payments/webhook`.
- Idempotency is enforced: duplicate webhook notifications will not duplicate student enrollments or receipts.

---

© 2026 Moses Oladoye (The Mastery Dr). All rights reserved.
Gain Mastery Institute is an initiative of Moses Oladoye.
