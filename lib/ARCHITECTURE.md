# Architectuur

## Kernflow
Dashboard → upload foto/PDF/tekst → validatie → OCR/tekstextractie → AI study pack → opslag → document → Study Mode → resultaten → zwakke topics → Word.

## Security boundary
Browser → Next.js route → server-side AI/Prisma. Geen API key in client bundle.

## Data
User 1:N Document; Document 1:N Section/Flashcard/Quiz/StudySession; Quiz 1:N Question; StudySession 1:N StudyResult; User 1:1 Progress.

## Volgende uitbreidingen
- spaced repetition scheduler
- echte quiz UI met antwoordvalidatie
- weak-topic analyse
- bibliotheek zoeken/sorteren/verwijderen
- upload object storage
- job queue voor OCR/AI
- Auth.js + email verification
