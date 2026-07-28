# Trajectory IR Documentation Portal

This repository contains the source code for the official documentation and public-facing portal for Trajectory IR. 

The application is engineered using Next.js (App Router), Tailwind CSS v4, and Fumadocs, delivering a statically generated and highly optimized platform for technical reference material.

## The Ideology: Durable Semantic Execution

Trajectory IR is the durable semantic layer for autonomous AI agents. 

Modern agent architectures suffer from catastrophic state loss and side-effect duplication during crashes. Trajectory IR solves this at the infrastructural level by wrapping, sealing, and recovering every single agent decision. It guarantees that an agent can be hard-killed at any point during execution and cleanly resume state without hallucinating progress or repeating destructive actions (e.g., API calls, database writes).

This is the ultimate durability engine designed specifically for production-grade AI systems.

## Key Infrastructure

- **Statically Optimized:** Leverages Next.js App Router for extreme performance and instantaneous page loads.
- **Predictive Search Integration:** Powered by Orama for real-time indexing and exact-match reference extraction.
- **Zero-Overflow Design:** Built with absolute layout constraints to ensure flawless rendering across all viewports.
- **Authoritative MDX:** All documentation is managed via strict MDX formatting mapped through `source.config.ts`.

## Local Development Environment

To replicate the documentation build locally for development or contribution purposes:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Development Server**
   ```bash
   npm run dev
   ```

The application will bind to `http://localhost:3000`.

## Repository Architecture

```text
├── content/docs/         # Master documentation index (MDX)
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router definitions
│   ├── components/       # Custom React component primitives
│   └── lib/              # Source loaders and utility structures
├── source.config.ts      # Fumadocs MDX schema mapping
├── CODE_OF_CONDUCT.md    # Code of Conduct
├── CONTRIBUTING.md       # Contribution guidelines and ECC policies
├── SECURITY.md           # Security policies
└── README.md             # Repository documentation
```

## Licensing

This project is distributed under the Apache 2.0 License. Refer to the LICENSE file for explicit terms and conditions.
