# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── algeria2malaysia/   # Algeria2Malaysia website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Algeria2Malaysia Website

A smart sales funnel website for the Algeria2Malaysia education agency.

### Features
- Full Arabic RTL homepage with hero, why Malaysia, services, institutes, CTA
- Smart multi-step application funnel for English institutes
- Goal selection (IELTS / General English / University Pathway)
- Budget-based institute recommendation (Stratford, Big Ben, Erican)
- Accommodation selector (Studio, Master Room, Medium Room, Small Room)
- Intake month selector
- University application flow (separate simpler flow)
- Google Forms integration (links in `src/data/institutes.ts`)
- WhatsApp redirect with pre-filled message
- Thank you page after submission

### Key Files
- `artifacts/algeria2malaysia/src/data/institutes.ts` — All institute data, pricing, Google Form links, WhatsApp number
- `artifacts/algeria2malaysia/src/pages/HomePage.tsx` — Landing page
- `artifacts/algeria2malaysia/src/pages/ApplyPage.tsx` — Multi-step funnel
- `artifacts/algeria2malaysia/src/pages/ThankYouPage.tsx` — Success page
- `artifacts/algeria2malaysia/src/hooks/useNavigate.ts` — Simple SPA navigation store

### To Update Google Form Links
Edit `GOOGLE_FORM_LINKS` in `src/data/institutes.ts`:
```ts
export const GOOGLE_FORM_LINKS = {
  institute: "https://docs.google.com/forms/d/e/YOUR_REAL_ID/viewform",
  university: "https://docs.google.com/forms/d/e/YOUR_REAL_ID/viewform",
};
```

### WhatsApp Number
`+601112200603` — defined in `WHATSAPP_NUMBER` constant in `src/data/institutes.ts`

### Multi-Language Support (i18n)
- **Languages**: Arabic (default, RTL), English (LTR), French (LTR)
- **Language files**: `src/i18n/translations.ts` — all UI translations (ar/en/fr)
- **Language context**: `src/i18n/LanguageContext.tsx` — useLanguage() hook, t() function, dir state
- **Language switcher**: In Navbar (desktop: inline, mobile: top of drawer)
- **Persistence**: saved to localStorage (`a2m_lang`)
- **Translated pages**: Navbar, InstituteQuiz, ApplyPage (type selection), key UI strings
- **Data pages** (university courses, institute details): remain in Arabic

### Key Files (updated)
- `artifacts/algeria2malaysia/src/i18n/translations.ts` — all AR/EN/FR translations
- `artifacts/algeria2malaysia/src/i18n/LanguageContext.tsx` — language state provider
- `artifacts/algeria2malaysia/src/components/Navbar.tsx` — includes lang switcher
- `artifacts/algeria2malaysia/src/components/InstituteQuiz.tsx` — fully translated quiz
- `artifacts/algeria2malaysia/src/pages/ApplyPage.tsx` — type selection translated
- `artifacts/algeria2malaysia/src/pages/GlobalSearchPage.tsx` — now searches by university name too
- `artifacts/algeria2malaysia/src/pages/SheffieldPage.tsx` — adult fees table mobile fix (min-width)

### Branding
- Colors: Green (#166534) and White
- Font: Cairo (Arabic) + Tajawal
- Direction: RTL by default (Arabic), switches to LTR for EN/FR
- Logo: `/public/logo.jpeg`

### University Count
- Currently 12 universities (updated from 11 in all relevant places)
