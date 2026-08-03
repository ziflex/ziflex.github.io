# tvoronov.dev

A static personal site for Timofei Voronov, built as a workshop ledger rather than a conventional portfolio. It uses Astro 7, TypeScript, content collections, MDX where components are useful, and plain CSS. There are no framework islands or client-side scripts; Google Analytics is the only optional JavaScript.

## Requirements

- Node.js 22.12 or newer
- npm (the committed `package-lock.json` is the source of dependency resolution)

## Local development

```sh
npm install
cp .env.example .env
npm run dev
```

Astro serves the development site at `http://localhost:4321` by default.

## Production build

Build and inspect the static output:

```sh
npm run build
npm run preview
```

The production files are written to the ignored `dist/` directory. Generated build artifacts are
not committed to the repository.

## Public environment variables

All variables are optional. An empty or absent variable emits no corresponding UI or script.

```dotenv
PUBLIC_CONTACT_EMAIL=
PUBLIC_GOOGLE_ANALYTICS_ID=
PUBLIC_RESUME_URL=
```

- `PUBLIC_CONTACT_EMAIL` adds a restrained `mailto:` link in the site header. No address is included by default.
- `PUBLIC_GOOGLE_ANALYTICS_ID` adds the asynchronous GA4 loader and its small inline initialization. No analytics markup is emitted by default.
- `PUBLIC_RESUME_URL` adds a résumé link on the About page. The repository does not contain a placeholder résumé.

Because these variables are prefixed with `PUBLIC_`, their configured values are written into the static site. Do not use them for secrets.

## Quality commands

```sh
npm run format:check  # Prettier
npm run lint          # ESLint
npm run check         # Astro and TypeScript diagnostics
npm run test          # Vitest content-utility tests
npm run build         # Production static build
npm run check:links   # Links, anchors, canonicals, sitemap, and asset references
npm run test:e2e      # Playwright, keyboard behavior, metadata, themes, and axe
npm run lighthouse    # Lighthouse CI thresholds
npm run verify        # Main checks through Playwright
```

Playwright uses a production preview and expects its Chromium browser to be installed. If needed:

```sh
npx playwright install chromium
```

The Lighthouse configuration audits the homepage, project index, and Ferret story. Thresholds are at least 95 for performance and best practices and 100 for accessibility and SEO.

## Routes

- `/` — editorial homepage
- `/projects/` — selected projects
- `/projects/[slug]/` — six project stories
- `/archive/` — current utilities and grouped historical work
- `/about/` — professional and personal draft
- `/writing/` — local writing index and verified external writing
- `/writing/[slug]/` — future local article template
- `/now/` — manually maintained current focus
- `/rss.xml` — published local writing feed
- `/sitemap-index.xml` — generated sitemap index
- `/404.html` — static custom not-found page

## Content authoring

### Projects

Project stories live in `src/content/projects/`. Their schema is defined in `src/content.config.ts`. A project requires explicit taxonomy flags, a stable `slug`, display order, factual metadata, and at least one `sources` URL.

`sources` are build-time evidence for future review; project pages never display them. Keep repository facts static and deterministic. Do not add runtime GitHub requests, counters, badges, or inferred activity. `status` describes the reviewed lifecycle of the project or body of work; it does not have to mirror GitHub’s repository-level archive switch.

`homepage` controls the primary current-project area on the homepage. `featured` controls current inclusion on the selected-project index. Archived projects cannot be `homepage` or `featured`; they belong in the archive. `order` controls editorial order. The build rejects duplicate project slugs.

### Writing

Writing lives in `src/content/writing/` as Markdown or MDX. Use Markdown unless an article needs an Astro component such as `Callout.astro`. Frontmatter includes:

- `title`, `slug`, and `description`
- `publishedAt` and optional `updatedAt`
- `categories`
- `draft`
- optional external `canonical`

The shared helpers in `src/lib/writing.ts` apply the publication filter to generated routes, the index, adjacent navigation, and RSS. Because draft routes are not generated, Astro’s sitemap also excludes them. The included `typography-sample.mdx` is intentionally unpublished and exercises headings, inline styles, code, a callout, a quote, and a footnote.

Before publishing an article:

1. Replace sample or draft copy with approved writing.
2. Set a unique slug and accurate dates/categories.
3. Set `draft: false`.
4. Run `npm run verify` and inspect the generated RSS and sitemap.

Potential essay titles belong in `WRITING_TODO.md`, which is never served.

## Social and search metadata

Site identity is configured centrally in `src/data/site.ts`. `BaseLayout.astro` emits canonical URLs, descriptions, Open Graph and X/Twitter metadata, the default 1200×630 `public/og.png`, and RSS autodiscovery. Project pages may supply a future `socialImage` override.

The homepage and About page emit `Person` JSON-LD. Project stories emit `SoftwareSourceCode` JSON-LD and omit unavailable properties. `robots.txt` points to Astro’s generated sitemap.

## GitHub Pages deployment

The [deployment workflow](.github/workflows/deploy.yml) runs for every push to `main` and can also
be started manually with **Run workflow** from the repository’s Actions tab. It installs the locked
dependencies with Node.js 24, builds the Astro site, uploads `dist/` as a GitHub Pages artifact, and
deploys that artifact through the `github-pages` environment. It does not use a deployment branch or
commit generated files.

To include any optional public configuration in the production build, create repository variables
under **Settings → Secrets and variables → Actions → Variables** with the same names shown in
[Public environment variables](#public-environment-variables). Missing variables remain empty. These
values are compiled into public files and must not contain secrets.

Configure **Settings → Pages** with:

- Source: **GitHub Actions**
- Custom domain: **tvoronov.dev**
- **Enforce HTTPS** enabled after GitHub recognizes the DNS records and provisions the certificate

The custom apex domain is configured in `astro.config.mjs` as `https://tvoronov.dev`. No repository
base path or `CNAME` file is needed: an Actions-based deployment takes the custom domain from the
repository’s Pages settings.

Configure the following records for `tvoronov.dev` with the domain’s DNS provider:

| Type   | Name | Value                 |
| ------ | ---- | --------------------- |
| `A`    | `@`  | `185.199.108.153`     |
| `A`    | `@`  | `185.199.109.153`     |
| `A`    | `@`  | `185.199.110.153`     |
| `A`    | `@`  | `185.199.111.153`     |
| `AAAA` | `@`  | `2606:50c0:8000::153` |
| `AAAA` | `@`  | `2606:50c0:8001::153` |
| `AAAA` | `@`  | `2606:50c0:8002::153` |
| `AAAA` | `@`  | `2606:50c0:8003::153` |

DNS changes can take up to 24 hours to propagate. See the official guides for
[Astro deployments to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/),
[publishing with GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site),
and [custom-domain DNS configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
