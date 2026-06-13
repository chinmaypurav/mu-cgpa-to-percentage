# University of Mumbai — CGPA → Percentage Converter

A focused web app that converts a **University of Mumbai CGPA to an equivalent percentage of marks**, implementing the official conversion prescribed in **Circular No. 1883 of 2017**.

> **For the 10-point grading system only.** This tool applies to the University of Mumbai's Choice Based Credit & Grading System (CBCS) on the **ten-point scale**. It does not apply to seven-point or other grading schemes.

**Source code:** https://github.com/chinmaypurav/mu-cgpa-to-percentage

## The formula

Per Circular No. 1883 of 2017, the percentage of marks is a single linear function of the CGPA:

```
Percentage of Marks = 7.1 × CGPA + 11
```

Enter your CGPA for each semester (6 or 8) and the app shows the equivalent percentage per semester. The **overall CGPA** is the mean of the entered semester CGPAs, and the overall percentage is its conversion — equivalently, the mean of the per-semester percentages, since the conversion is linear.

| CGPA | Percentage |
| ---- | ---------- |
| 10.00 | 82.00% |
| 9.00 | 74.90% |
| 8.00 | 67.80% |
| 7.00 | 60.70% |
| 6.00 | 53.60% |
| 5.00 | 46.50% |
| 4.00 | 39.40% |

> Figures are rounded to two decimals for display; the conversion itself is exact. This is an unofficial worksheet — always verify against your official transcript.

## Features

- **6 / 8 semester toggle** (defaults to 6) for the two common programme lengths.
- **Per-semester conversion** — enter each semester's CGPA, read its percentage.
- **Overall CGPA & percentage** rendered as a brass "conversion seal".
- **Print statement** — a clean, official-looking one-page conversion statement.

## Tech stack

Nuxt 4 · Vue 3 · Tailwind CSS v4. The conversion logic lives in the `useCgpa` composable (`app/composables/useCgpa.ts`).

## Setup

Install dependencies:

```bash
pnpm install
```

## Development server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview the production build:

```bash
pnpm preview
```

See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
