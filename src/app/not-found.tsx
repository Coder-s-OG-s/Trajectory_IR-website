import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6" style={{ backgroundColor: 'var(--color-fd-background, #0a0a0a)' }}>
      <div className="relative mb-8">
        <img
          src="/logo.png"
          alt="Trajectory IR"
          className="w-24 h-24 rounded-2xl mx-auto opacity-50"
          style={{ filter: 'grayscale(60%)' }}
        />
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wider uppercase" style={{ backgroundColor: 'rgba(255, 62, 0, 0.1)', color: '#ff3e00', border: '1px solid rgba(255, 62, 0, 0.3)' }}>
        404 — Page Not Found
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold mb-4" style={{ color: 'var(--color-fd-foreground)' }}>
        Lost in the <span style={{ color: '#ff3e00' }}>Trajectory</span>
      </h1>

      <p className="max-w-md text-base mb-8" style={{ color: 'var(--color-fd-muted-foreground, #888)' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-sm font-semibold text-white no-underline"
          style={{ backgroundColor: '#ff3e00', boxShadow: '0 4px 24px rgba(255, 62, 0, 0.35)' }}
        >
          ← Back to Docs
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl text-sm font-semibold no-underline"
          style={{ color: 'var(--color-fd-foreground)', border: '1px solid var(--color-fd-border, #333)' }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
