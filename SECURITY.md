# Security Policy for Trajectory IR Documentation

This repository contains the Next.js frontend documentation website for Trajectory IR. It does *not* contain the core Python engine or execution logic.

## 1. Supported Versions

We only support the latest deployed version of the website. If you find a security issue in the website's source code (e.g., Cross-Site Scripting (XSS) in MDX processing, vulnerable npm dependencies, etc.), please report it immediately.

## 2. Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in this website repository, please send an e-mail to the core maintainers: `siddharthagithub0007@gmail.com`.

We will acknowledge receipt of your vulnerability report within 48 hours. 

## 3. Scope of Security Concerns for this Repo

Because this is a static-generated Next.js documentation site, the threat model is much smaller than the core Trajectory IR execution engine. We are actively monitoring for:
- **Supply Chain Attacks**: Malicious updates to Next.js, Fumadocs, Tailwind, or other `npm` dependencies.
- **XSS via MDX**: Vulnerabilities where maliciously crafted Pull Requests could inject executable scripts into the documentation pages.
- **Exposure of Secrets**: Accidental commits containing Vercel deployment tokens or API keys.

If you are looking to report a vulnerability regarding Agent Tool Execution, Seal Tampering, or Durable State Bypasses, please report that to the **Main Trajectory-IR Engine Repository**.
