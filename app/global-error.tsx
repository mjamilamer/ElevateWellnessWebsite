'use client'

/**
 * Catches errors that escape the root layout (rare). Must render its own
 * <html> and <body>. Keep minimal styling — global stylesheet may not have
 * loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          background: '#f6f8fa',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          color: '#1e293b',
        }}
      >
        <div style={{ maxWidth: 520, textAlign: 'center' }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#9a6a3c',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Critical Error
          </p>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 600,
              margin: '12px 0 12px',
              color: '#1e293b',
            }}
          >
            Something went very wrong
          </h1>
          <p style={{ fontSize: 16, color: '#475569', margin: '0 0 24px' }}>
            The site couldn’t load. Please try reloading. If the problem persists, call our office
            at <a href="tel:+12013055103" style={{ color: '#9a6a3c', fontWeight: 600 }}>+1 (201) 305-5103</a>.
          </p>
          {error.digest && (
            <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 24px' }}>
              Reference:{' '}
              <code style={{ fontFamily: 'monospace' }}>{error.digest}</code>
            </p>
          )}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: '#9a6a3c',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  )
}
