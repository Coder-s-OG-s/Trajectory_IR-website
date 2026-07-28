# Contributing to the Trajectory IR Documentation

Thank you for your interest in improving the Trajectory IR documentation! 

This repository houses the **Next.js and Fumadocs-based website** that serves as the official portal for Trajectory IR. It does *not* contain the core Python engine code. If you want to contribute to the core runtime, please head over to the main Trajectory-IR repository.

## 1. How to Contribute Content

All documentation content is written in [MDX](https://mdxjs.com/) and stored in the `content/docs/` directory.

### Adding or Editing Pages
- Create a new `.mdx` file in `content/docs/` or edit an existing one.
- Always include the standard Fumadocs frontmatter at the top of the file:
```yaml
---
title: Your Page Title
description: A short description for SEO.
---
```
- You can use standard Markdown as well as React components (like `<Callout>`) provided by Fumadocs.

## 2. Developer Certificate of Origin (DCO) Sign-off

**This is a hard requirement.** We enforce the DCO for all commits to ensure that contributors have the right to submit the code under the Apache-2.0 license.

Every single commit must contain the following trailer at the end of the commit message:

```text
Signed-off-by: Jane Doe <jane.doe@example.com>
```

You can add this automatically to your commits by using the `-s` or `--signoff` flag with git:

```bash
git commit -s -m "docs: add new section to the quickstart guide"
```

## 3. Local Development Setup

To preview your changes locally before submitting a Pull Request:

1. Clone this repository.
2. Ensure you have Node.js (v18+) installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` to see your changes reflected instantly via Hot Module Replacement.

## 4. Formatting and Linting

- We use standard Next.js ESLint and Prettier for formatting. 
- Please ensure `npm run build` succeeds locally without any MDX parsing errors before submitting a PR.

## 5. AI Contribution Disclosure & ECC Integration

If you used an AI coding assistant (like Claude Code, ChatGPT, Antigravity, or our integrated Everything Claude Code [ECC] specialized subagent suite) to generate significant portions of your documentation PR:
- **Disclosure**: Please mention it in the Pull Request description.
- **Accountability**: You, the human contributor, are 100% responsible for the accuracy of the documentation. Do not let AI assistants hallucinate APIs, tool effect classes, or package names (`dbos` vs non-existent names) that do not match the authoritative Trajectory IR master specification!
