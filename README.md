<p align="center">
  <img src="./ModWarden.svg" alt="ModWarden logo" width="120" />
</p>

<h1 align="center">ModWarden</h1>

<p align="center">
  A Bitwarden-compatible password manager server that runs on Cloudflare Workers.
</p>

<p align="center">
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Powered%20by-Cloudflare-F38020?logo=cloudflare&logoColor=white" alt="Powered by Cloudflare" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-LGPL--3.0-2ea44f" alt="License: LGPL-3.0" /></a>
  <a href="https://github.com/AlphaRomeoMike/modwarden/tags"><img src="https://img.shields.io/github/v/tag/AlphaRomeoMike/modwarden?label=release" alt="Latest release" /></a>
</p>

<p align="center">
  <a href="./README_ZH.md">中文</a> |
  <a href="./RELEASE_NOTES.md">Release notes</a> |
  <a href="./CONTRIBUTING.md">Contributing</a> |
  <a href="./SECURITY.md">Security</a>
</p>

> **Disclaimer**
> ModWarden is not affiliated with Bitwarden. Please don't report ModWarden issues to the Bitwarden team.
> Back up your vault regularly.

---

## Features

| Feature | Bitwarden Free | ModWarden | Notes |
|---|---|---|---|
| Web vault | ✅ | ✅ | Black-and-white Web Vault with keyboard-visible focus |
| TOTP | ❌ | ✅ | Includes `steam://` support |
| **PWA / offline** | ❌ | ✅ | **Installable, offline** |
| **Passkey login** | ✅ | ✅ | **Passwordless auth** |
| API keys | ✅ | ✅ | CLI keys; create and rotate |
| Login 2FA | ✅ | ✅ | TOTP, YubiKey, Passkey |
| 2FA recovery codes | ✅ | ✅ | One-time 2FA disable codes |
| Real-time push sync | ✅ | ✅ | All device sync |
| Attachments / Send | ✅ | ✅ | Cloudflare KV or R2 |
| Import / export | ✅ | ✅ | Bitwarden JSON / CSV / **ZIP** |
| **Cloud backup center** | ❌ | ✅ | **Scheduled WebDAV / S3 incrementals** |
| Device management | ✅ | ✅ | **Remove devices; trust controls** |
| Login requests | ✅ | ✅ | **Cross-device login approval/unlock** |
| **Multi-user** | ✅ | ✅ | Invite-code registration |
| Domain rules | ✅ | ✅ | Equivalent domains, global exclusions |
| Fill-assist | ✅ | ✅ | `POST /fill-assist` |
| Organizations / collections / roles | ✅ | ❌ | Not implemented |
| SSO / SCIM / directory | ✅ | ❌ | Not implemented |

---

## Use it with Bitwarden apps

In the Bitwarden mobile or desktop app or the browser extension, choose **Self-hosted** on the login screen and enter your Worker's address as the server URL, for example `https://modwarden.<your-subdomain>.workers.dev`.

The first account registered becomes the owner. After that, new accounts need an invite code from the **Admin Panel**.

---

## Deploy

Production deploys run in GitHub Actions ([`deploy.yml`](./.github/workflows/deploy.yml)) whenever a `v*` tag is pushed. They use KV storage mode ([`wrangler.kv.toml`](./wrangler.kv.toml)), so no R2 bucket or card on file is needed.

### One-time setup

1. **Cloudflare:** open **Workers & Pages** once so the account gets a `workers.dev` subdomain.
2. **Database:** create a D1 database and put its ID in `wrangler.kv.toml` (`database_id`). The ID in this repository is ModWarden's production database; a fork must use its own.
   ```bash
   npx wrangler d1 create modwarden-db-apac --location apac
   ```
3. **API token:** in Cloudflare, **My Profile → API Tokens → Create Custom Token**, limited to your account:

   | Type | Permission | Access |
   |---|---|---|
   | Account | Workers Scripts | Edit |
   | Account | Workers KV Storage | Edit |
   | Account | D1 | Edit |
   | Account | Account Settings | Read |
   | User | Memberships | Read |
   | User | User Details | Read |

4. **GitHub secret:** save the token in the repository's `production` environment:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --env production
   ```

### Releasing

1. Merge changes into `main` through a pull request. `main` is protected and CI must pass.
2. In a release pull request, bump the version in `package.json`, `package-lock.json` and `shared/app-version.ts`, and add an entry to [`RELEASE_NOTES.md`](./RELEASE_NOTES.md).
3. Tag the merged commit and push only that tag:
   ```bash
   git tag -a v1.2.3 -m "ModWarden v1.2.3"
   git push origin refs/tags/v1.2.3
   ```

The workflow builds the Web Vault, deploys the Worker, and creates the `JWT_SECRET` on the first deploy. To redeploy an existing version, run `gh workflow run deploy.yml --ref v1.2.3`.

- To hide the Web Vault, add a text variable named `HIDE_WEB_VAULT` with the value `1` under **Workers settings → Variables and Secrets**. While enabled, server-hosted frontend pages and static assets return `404 Not Found`, while the login, sync, attachment, icon, notification, and other server endpoints used by Bitwarden clients remain available; an already installed or cached PWA can continue using its local frontend. Delete the variable (or change it to anything other than `1`) to restore the server-hosted Web Vault.

> [!TIP]
> KV (default here) vs R2 ([`wrangler.toml`](./wrangler.toml), `npm run deploy`):
>   | Storage | Card required | Max single attachment / Send file | Free tier |
>   |---|---|---|---|
>   | KV | No | 25 MiB (Cloudflare limit) | 1 GB |
>   | R2 | Yes | 100 MB (soft limit, adjustable) | 10 GB |

---

## Local development

```bash
npm install
npm run dev:kv     # Worker with local D1 and KV at http://localhost:8787 (needs JWT_SECRET in .dev.vars)
npm run dev:demo   # Web Vault with demo data and no backend
npm test           # translations and all test suites
```

---

## FAQ

- **I deleted my deployment and redeployed it. Why does registration require an invite code again?**
  Deleting or redeploying the Worker doesn't delete its data. The users, invite codes and settings in the D1 database and KV namespace are still there, so the new deployment keeps enforcing invite codes. To start from scratch, delete the **D1 database and KV namespace** as well.

- **The site says `JWT_SECRET` is missing. Why?**
  `JWT_SECRET` must be a **Secret** (a runtime value) under **Workers → Settings → Variables and Secrets**, not a build variable, which the Worker can't read at runtime. The deploy workflow creates it on the first deploy; if it was removed, the next deploy creates a new one, which signs everyone out.

---

## License

[LGPL-3.0](./LICENSE)

## Credits

- [Bitwarden](https://bitwarden.com/) - original design and clients
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden) - server implementation reference
- [Cloudflare Workers](https://workers.cloudflare.com/) - serverless platform
