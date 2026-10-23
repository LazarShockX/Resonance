# 🎙️ Resonance - AI Voice Studio

Resonance is an AI-powered text-to-speech and voice cloning platform for creating natural-sounding audio from text. It combines a curated library of system voices with organization-scoped custom voices, adjustable generation controls, audio previews, and generation history in a focused studio workflow.

Users can select a voice, write or paste text, tune expressiveness and delivery controls, and generate speech through a Chatterbox TTS API. Resonance stores voice samples and generated audio in Cloudflare R2, persists metadata in PostgreSQL, and uses Polar for subscription and usage-based billing.

<p align="center">
  <img width="1405" height="713" alt="Screenshot 2026-10-23 at 12 54 33" src="https://github.com/user-attachments/assets/36d35263-5c7c-4491-bfda-c1b02b5540fb" />
</p>

## ✨ Features

### Text-to-Speech Studio
- Generate speech from text with configurable length validation
- Choose from system voices or organization-specific custom voices
- Adjust creativity, voice variety, expression range, and natural flow
- Preview generated audio directly in the browser
- Reopen previous generations with their original text and voice settings
- Suggested prompts and quick actions for common voice-generation scenarios

### Voice Library
- Browse and search system voices by name and description
- Create custom voices by uploading an audio sample or recording directly in the browser
- Add voice metadata including name, category, language, and description
- Preview voice samples before generating speech
- Delete organization-owned custom voices
- Enforce a 20 MB upload limit and a minimum ten-second sample duration

### Organizations and Billing
- Clerk authentication with sign-in and sign-up flows
- Organization-scoped voices, generations, and audio access
- Subscription checks before creating custom voices or generating speech
- Polar checkout and customer portal integration
- Usage metering based on generated character count
- Current-period estimated usage displayed in the dashboard

### Audio and Data
- Private signed audio URLs backed by Cloudflare R2
- PostgreSQL persistence through Prisma
- Protected audio endpoints with organization-level authorization
- Automatic API type generation from the Chatterbox OpenAPI specification
- Error monitoring and structured logging with Sentry

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Interactive application UI
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** and **Base UI** - Accessible interface primitives
- **[TanStack Form](https://tanstack.com/form)** and **TanStack Query** - Form state and server-state management

### Backend and API
- **[tRPC](https://trpc.io/)** - End-to-end type-safe application procedures
- **[Prisma](https://www.prisma.io/)** - PostgreSQL ORM and generated client
- **[Zod](https://zod.dev/)** - Runtime input validation
- **[openapi-fetch](https://openapi-ts.dev/openapi-fetch/)** - Typed communication with the TTS API

### Speech and Audio
- **Chatterbox TTS API** - Speech synthesis and voice-conditioned generation
- **[wavesurfer.js](https://wavesurfer.xyz/)** - Audio waveform and playback experiences
- **[RecordRTC](https://recordrtc.org/)** - Browser voice recording
- **music-metadata** - Audio format and duration validation

### Storage, Auth, and Billing
- **[Clerk](https://clerk.com/)** - Authentication and organization management
- **[Cloudflare R2](https://developers.cloudflare.com/r2/)** - Object storage for voice samples and generated audio
- **[Polar](https://polar.sh/)** - Subscription checkout, customer portal, and usage metering
- **[Sentry](https://sentry.io/)** - Error monitoring and application logging

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- A PostgreSQL database
- A Clerk application with organizations enabled
- A Cloudflare R2 bucket and S3-compatible credentials
- A reachable Chatterbox TTS API
- A Polar product configured for the application

### Environment Variables

Create a `.env` file with the following values. Do not commit credentials or production secrets.

```env
# Application
APP_URL="http://localhost:3000"

# Clerk
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# PostgreSQL
DATABASE_URL=

# Cloudflare R2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

# Chatterbox TTS API
CHATTERBOX_API_URL=
CHATTERBOX_API_KEY=

# Polar
POLAR_ACCESS_TOKEN=
POLAR_SERVER="sandbox"
POLAR_PRODUCT_ID=
```

`POLAR_SERVER` should be set to `production` when using a production Polar environment. The Chatterbox API must expose the `/generate` endpoint and an `/openapi.json` document.

### Available Scripts

- `npm install` - Install dependencies and generate the Prisma client
- `npm run dev` - Start the Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run sync-api` - Fetch the Chatterbox OpenAPI document and regenerate typed API definitions
- `npx prisma generate` - Generate the Prisma client
- `npx prisma migrate dev` - Create and apply development migrations
- `npx prisma studio` - Open Prisma Studio
- `npx tsx scripts/seed-system-voices.ts` - Upload and register bundled system voice samples

## 🗂️ Project Structure

```text
src/
├── app/                 # Next.js routes, dashboard pages, and API endpoints
├── components/          # Shared UI components
├── features/
│   ├── billing/         # Polar checkout and usage display
│   ├── dashboard/       # Dashboard layout and quick actions
│   ├── text-to-speech/  # Generation form, settings, previews, and history
│   └── voices/          # Voice library, recording, upload, and management
├── lib/                 # Database, storage, billing, and Chatterbox clients
├── trpc/                # Type-safe server routers and client providers
└── types/               # Generated Chatterbox API types
prisma/
└── schema.prisma        # PostgreSQL data model and migrations
scripts/
├── seed-system-voices.ts
└── sync-api.ts
```
