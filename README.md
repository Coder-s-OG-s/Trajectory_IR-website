# Trajectory IR Documentation Website

Welcome to the official documentation portal for **Trajectory IR** (TRAJ-IR).

This repository contains the source code for the high-performance documentation website built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS v4](https://tailwindcss.com), and [Fumadocs](https://fumadocs.dev).

---

## 🌟 Key Features

- ⚡ **Next.js App Router & Fumadocs:** Lightning fast static and server-rendered documentation architecture.
- 🎨 **Custom Theme:** Modern dark aesthetics, custom orange accents (`#ff3e00`), and fluid step animations.
- 🔍 **Predictive Search:** Real-time predictive search powered by **Orama**.
- 📖 **Complete Documentation:** Quickstart, Infrastructure Architecture, Trajectory Lifecycle, API Reference, Security, and Changelog.
- 📱 **Fully Responsive:** Optimized for all screen sizes with zero horizontal overflow.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure

```
├── content/docs/         # All MDX documentation files (Quickstart, Lifecycle, API, etc.)
├── public/               # Public assets (logo, icons)
├── src/
│   ├── app/              # Next.js App Router layout, pages, and API routes
│   ├── components/       # Custom React components (Under Construction Modal, etc.)
│   └── lib/              # Source loaders and utilities
├── source.config.ts      # Fumadocs MDX schema mapping
├── CODE_OF_CONDUCT.md    # Community standards
├── CONTRIBUTING.md      # Contribution guidelines
├── SECURITY.md          # Vulnerability disclosure policy
└── README.md             # Project documentation overview
```

---

## 🤝 Contributing

We welcome community contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before submitting pull requests.

---

## 📜 License

Distributed under the **Apache 2.0 License**.
