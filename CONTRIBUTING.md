# Contributing to Trajectory IR Documentation

This repository houses the Next.js and Fumadocs-based portal that serves as the official documentation for Trajectory IR. Note that this repository does not contain the core execution engine or Python runtime code. For engine modifications, refer to the primary Trajectory IR engine repository.

## 1. Content Modification Guidelines

All documentation content must be written in strict MDX format and stored within the `content/docs/` directory.

### Standards for New Pages
- Construct a new `.mdx` file within the `content/docs/` directory structure.
- The standard Fumadocs frontmatter block is mandatory for all files:
```yaml
---
title: System Architecture
description: Comprehensive overview of durable execution layers.
---
```

## 2. Developer Certificate of Origin (DCO)

We strictly enforce the Developer Certificate of Origin (DCO) for all commits to maintain clear provenance and compliance under the Apache-2.0 license.

Every commit submitted to this repository must contain the following trailer:

```text
Signed-off-by: Full Name <email@example.com>
```

You can append this automatically via git:

```bash
git commit -s -m "docs: define state recovery mechanism"
```

## 3. Development Setup

To validate changes locally prior to submitting a Pull Request:

1. Ensure Node.js (v18+) is installed on the host machine.
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Boot the development server:
   ```bash
   npm run dev
   ```

## 4. Formatting Standards

- Standard Next.js ESLint and Prettier configurations are enforced.
- Run `npm run build` locally to verify that all MDX structures parse without fatal errors prior to opening a PR.

## 5. Compliance & Tooling Integration

If an automated intelligence system or coding assistant (including Claude Code, ChatGPT, Antigravity, or the internal Everything Claude Code (ECC) suite) was utilized to generate material for a Pull Request:

1. **Mandatory Disclosure**: You must disclose the use of such tooling within the Pull Request description.
2. **Strict Accountability**: The human contributor assumes absolute responsibility for the technical accuracy of the submitted material. Hallucinated APIs, incorrect package references, and non-existent configuration flags will result in immediate PR rejection. Ensure all documentation strictly aligns with the authoritative Trajectory IR specification.
