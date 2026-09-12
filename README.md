# StudySpark

StudySpark is an original AI study app for turning school notes into summaries, flashcards and quizzes. It is designed to deploy on Vercel with PostgreSQL.

## Production deployment

1. Create a PostgreSQL database (Neon is a good Vercel-friendly option).
2. Copy `.env.example` values into Vercel → Project Settings → Environment Variables.
3. Set `DATABASE_URL` and `OPENAI_API_KEY` for Production.
4. Import this repository into Vercel. The included `vercel.json` uses the normal Next.js build.
5. After the first deployment, run the Prisma schema against the production database with `npx prisma db push` using the production `DATABASE_URL`, or use your CI migration workflow.

Never put `OPENAI_API_KEY` or `DATABASE_URL` in client code or `NEXT_PUBLIC_*` variables.

## Local

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

## Scope

The public v1 runs without login and includes PDF/TXT/MD/image ingestion, server-side AI generation, summaries, sections, flashcards, study mode, quizzes, document library, and Word export. File uploads are processed in-memory and are limited to 10 MB; production at larger scale should move uploads/background AI work to durable object storage and a job queue.
