# Security Policy

## Reporting a Vulnerability

Thank you for helping keep ModWarden safe.

Please **do not report security vulnerabilities through public GitHub issues, discussions, pull requests, or chat groups**.

Report it privately through GitHub Private Vulnerability Reporting:
https://github.com/AlphaRomeoMike/modwarden/security/advisories/new
(the repository's **Security** tab, then **Report a vulnerability**).

ModWarden is independent from Bitwarden. Please do not report ModWarden-specific issues to the official Bitwarden team.

## What to Include

Please include as much detail as possible:

* A clear description of the vulnerability.
* Steps to reproduce.
* Affected version, commit, or deployment method.
* Affected area, such as login, sync, vault data, attachments, Send, import/export, backup/restore, Passkey, WebAuthn, or API routes.
* Expected behavior and actual behavior.
* Security impact, such as authentication bypass, authorization bypass, replay, cross-user access, token misuse, data leakage, or secret exposure.
* Proof of concept, logs, screenshots, or request examples, if safe to share privately.

Please redact real passwords, tokens, private keys, recovery keys, vault data, and other secrets before submitting.

## Scope

Security reports are welcome for issues affecting ModWarden itself, including:

* Authentication and session handling.
* User authorization and cross-user access.
* Vault data, cipher sync, attachments, and Send.
* Import, export, backup, and restore.
* Passkey, WebAuthn, and two-factor authentication.
* Secret handling and provider credentials.
* Cloudflare Workers, D1, R2, KV, WebDAV, or S3 behavior caused by ModWarden code or documentation.

## Out of Scope

The following are usually out of scope:

* Issues only affecting third-party services or user infrastructure.
* Misconfigured personal deployments not caused by ModWarden defaults.
* Social engineering or phishing.
* Denial-of-service testing.
* Scanner-only reports without a practical exploit path.
* Reports that only mention outdated dependencies without showing real impact.

## Response

ModWarden is maintained on a best-effort basis.

We aim to acknowledge valid private reports within 72 hours, investigate the issue, and release a fix or mitigation when appropriate.

Please do not publicly disclose vulnerability details before a fix or mitigation is available.

## Supported Versions

Security fixes are generally provided for the latest release and the latest code on the default branch.

| Version        | Supported              |
| -------------- | ---------------------- |
| Latest release | Yes                    |
| `main` branch  | Yes                    |
| Older releases | Best effort            |
| Modified forks | Not directly supported |

## Rewards

ModWarden does not currently operate a paid bug bounty program.
