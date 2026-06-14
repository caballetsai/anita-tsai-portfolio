# Anita Tsai / 蔡靚萱 Portfolio

Bilingual Astro static site for Anita Tsai, designed for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

GitHub Pages base path defaults to the repository name through `GITHUB_REPOSITORY`. Override locally if needed:

```bash
PUBLIC_BASE_PATH=/anita-tsai-portfolio npm run build
```

## Content

- Profile copy: `src/content/profile.zh.json`, `src/content/profile.en.json`
- Experience: `src/content/experience.json`
- Verified works: `src/content/works.json`
- Draft works pending verification: `src/content/draft-works.json`
- Expertise galleries: `src/content/expertise.json`
- Interviewees: `src/content/interviewees.json`

Move a work from draft to verified only after completing `scripts/verify-links.md`.

## Privacy and Source Boundaries

The provided LinkedIn PDF contains mobile phone and email. These are intentionally omitted from the public site. The passport-name field is also omitted unless Anita explicitly approves publication.

Cover images are extracted from the user-provided PPT and retain original publication marks. Public use and credit language should be confirmed with Anita before deployment.
