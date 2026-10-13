# FGBMFI Singapore — website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Before going live — replace the placeholders

Nothing factual about FGBMFI Singapore has been invented. Everything that needs
official information is marked in the data files and labelled on the site.

| What | Where | Notes |
| --- | --- | --- |
| Photographs | `public/images/*.jpg`, paths in `data/images.ts` | Overwrite a file with the same name, or change its `src`. Each placeholder is labelled with the photo it stands in for and its size. |
| Logo | `components/ui/Logo.tsx` | FGBMFI emblem (`public/images/logo.png`) beside the wordmark. Favicons are `app/favicon.ico`, `app/icon.png` and `app/apple-icon.png`. |
| Contact details, social links | `data/site.ts` (`contact`, `socials`) | `null` values show "To be confirmed"; social links stay hidden until a URL is set. |
| Leadership | `data/leadership.ts` | Set `isPlaceholder: false` per leader. |
| Chapters | `data/chapters.ts` | Drives cards, detail pages, map markers and the sitemap. |
| Events | `data/events.ts` | Sample listings with illustrative dates; set `isSample: false`. |
| Testimonies | `data/testimonies.ts` | Sample writing, labelled on the site. Replace with real, consented stories. |
| News | `data/news.ts` | Evergreen starter articles; add dates and real updates. |
| Singapore history | `app/history/page.tsx` | "To be added" panel. International milestones should be confirmed with FGBMFI International. |
| Countries figure | `data/site.ts` (`stats`) | Shown as 85+ from public reference material; confirm the current number. |
| Site address | `NEXT_PUBLIC_SITE_URL` env var | Used for canonical URLs, sitemap and Open Graph. |
| Enquiry form delivery | `ENQUIRY_WEBHOOK_URL` env var | See `app/api/enquiry/route.ts`. Without it, production tells visitors enquiries are not yet available rather than dropping messages. |
| Privacy Policy, Terms | `app/privacy`, `app/terms` | Drafts — need legal review. |

## Structure

```
app/            routes (12 pages + event, chapter and article detail pages, sitemap, robots, API)
components/
  animations/   Reveal, Stagger, ImageReveal, TextReveal, Counter, Parallax
  cards/        Event, Leader, Chapter, Testimonial, News, Image
  layout/       PageHero, LegalPage
  navigation/   Navbar, MobileNav
  footer/       Footer
  sections/     home and page sections, gallery lightbox, slider, forms, map
  ui/           Button, SectionHeading, Breadcrumbs, Logo, SampleTag
data/           all content and image paths
lib/            helpers and metadata builder
scripts/        placeholder image generator (npm run placeholders)
```

Design tokens (colours, fonts, spacing utilities) live in `app/globals.css`.
All animations respect `prefers-reduced-motion`.
