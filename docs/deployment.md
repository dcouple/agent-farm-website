# Agent Farm hosting

The site is deployed as a Next.js static export to Firebase Hosting in Google Cloud.

- Organization: `dcouple.ai` (`927195599360`)
- Project and Hosting site: `dcouple-agent-farm` (`146232287470`)
- Live URL: https://dcouple-agent-farm.web.app
- Primary domain: https://getagentfarm.com
- `www.getagentfarm.com` is configured to redirect to `getagentfarm.com`.
- Console: https://console.firebase.google.com/project/dcouple-agent-farm/hosting

## Namecheap DNS

Domain List → Manage → Advanced DNS → Host Records. Keep Namecheap BasicDNS nameservers.

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `199.36.158.100` | Automatic |
| TXT | `@` | `hosting-site=dcouple-agent-farm` | Automatic |
| CNAME | `www` | `dcouple-agent-farm.web.app` | Automatic |

Replace the existing root parking/URL redirect record resolving to `162.255.119.211` and the `www` CNAME to `parkingpage.namecheap.com`. Leave mail/MX/SPF records intact. These values came from the Hosting custom domain API, not generic defaults. Firebase automatically checks DNS and provisions HTTPS; certificate provisioning can take up to 24 hours after the correct DNS reaches Firebase.

[Firebase domain setup](https://firebase.google.com/docs/hosting/custom-domain)

## Deploy updates

`.github/workflows/website.yml` runs lint, build/TypeScript, and `docs:check` on
pull requests and pushes to `main`. After a successful main build, a separate job
downloads the verified `out/` artifact and deploys it to Firebase Hosting.
`workflow_dispatch` can redeploy `main`. Pull requests run checks only.

The final job runs `python3 scripts/check-live.py`, comparing all 16 public HTML
pages, Markdown exports, AI indexes, sitemap, robots, and the social image at
`https://getagentfarm.com` with the artifact. A mismatch fails the deployment run.
Deployments are serialized per branch and use actions pinned to commit hashes.

### GitHub authentication

Google Workload Identity Federation exchanges GitHub's identity token for a
short-lived service account token. GitHub stores no service account key.

- Pool: `projects/146232287470/locations/global/workloadIdentityPools/github-website`
- Provider: `github` (GitHub's OIDC issuer)
- Service account: `github-hosting@dcouple-agent-farm.iam.gserviceaccount.com`
- Project roles: `roles/firebasehosting.admin` and `roles/serviceusage.serviceUsageConsumer`
- Service account impersonation: `roles/iam.workloadIdentityUser`, restricted to
  repository ID `1373776482` in this pool.
- Provider conditions require repository ID `1373776482`, owner ID `264294815`,
  ref `refs/heads/main`, and workflow
  `dcouple/agent-farm-website/.github/workflows/website.yml@refs/heads/main`.

The workflow passes the temporary access token as `FIREBASE_ACCESS_TOKEN` to the
existing deployment script. These settings are scoped to the website project.

### Manual deployment

Using the authenticated `parsa@dcouple.ai` gcloud account:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm build
pnpm docs:check
python3 scripts/deploy-hosting.py
python3 scripts/check-live.py
```

The deploy script uploads only `out/`, finalizes a version, then releases it. It uses short-lived gcloud credentials in memory and does not change gcloud's default project or persist tokens. The same `firebase.json` configuration can also be deployed with the official Firebase CLI when separately authenticated.

Rollback to a prior release through the Hosting console. To keep a rollback in
place, revert the corresponding code change before the next main deployment.

## Image delivery

The original artwork is retained under `docs/design/`. Production serves WebP variants through `<picture>`:

| Artwork | Desktop | Mobile |
| --- | --- | --- |
| Workbench | 163,362 bytes, 1254px | 98,256 bytes, 768px |
| Configuration shed | 188,624 bytes, 1400px | 77,958 bytes, 768px |
| Total | 351,986 bytes | 176,214 bytes |

Encoded with Sharp WebP quality 82, effort 6. Filenames include SHA-256 content hashes. Images and Next.js static assets have `Cache-Control: public,max-age=31536000,immutable`, verified from deployed HTTP responses. The hero loads eagerly with high fetch priority; the shed is lazy-loaded. Fonts are self-hosted by Next.js. All interaction runs in the browser; no application server or AI API is needed.

## Initial release

- Version: `sites/dcouple-agent-farm/versions/3d8ea1b9711d1881`
- Release: `sites/dcouple-agent-farm/releases/1789611472854000`
- Date: September 16, 2026 (America/Los_Angeles)
- Lint, production static build, responsive overflow check, mobile image selection, install disclosure, and live asset/HTML checks passed.

## Open-source badge release and audit

Published the GitHub-linked Open source badge above the hero headline:

- Version: `sites/dcouple-agent-farm/versions/f94428cc92161c3f`
- Release: `sites/dcouple-agent-farm/releases/1789611660556000`
- Confirmed visible on the public Hosting URL; lint/build passed.

Lighthouse 13.4.1 measured the optimized deployment immediately before the badge-only update, using default simulated mobile throttling and the desktop preset. These are local lab measurements of `https://dcouple-agent-farm.web.app`, not field metrics for the custom domain.

| Category | Mobile | Desktop |
| --- | --- | --- |
| Performance | 95 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

Mobile: FCP 1.0s, LCP 2.8s, TBT 70ms, CLS 0. Desktop: FCP 0.3s, LCP 0.6s, TBT 0ms, CLS 0. Reports: `docs/qa/lighthouse-mobile.html`, `docs/qa/lighthouse-desktop.html`, and `docs/qa/lighthouse-summary.json`.

After the user updated DNS, authoritative queries to `dns1.registrar-servers.com` confirmed all three records exactly match the table above, and the SPF record remains intact. Firebase subsequently confirmed active ownership and hosting while its certificate was validating. At 03:03 UTC on September 17, 2026, `curl -I https://getagentfarm.com` verified HTTPS successfully and returned HTTP 200. Certificate provisioning has completed for the primary domain.
