import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/config'

export const runtime = 'edge'
export const alt = 'Elevate Wellness & Health — Where wellness, recovery, and modern medicine come together'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background:
            'linear-gradient(135deg, #fdf6ea 0%, #f8e5c8 35%, #d6a274 100%)',
          color: '#3f2916',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top row — brand mark + small label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 9999,
              background: 'linear-gradient(180deg, #d6a274, #9a6a3c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fdf6ea',
              fontSize: 36,
              fontWeight: 700,
              boxShadow: 'inset 0 2px 6px rgba(63,41,22,0.35)',
            }}
          >
            E
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 14,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: '#6f4a26',
                fontWeight: 600,
              }}
            >
              North Bergen, New Jersey
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#3f2916',
                marginTop: 4,
              }}
            >
              {siteConfig.name}
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 920 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#3f2916',
              letterSpacing: -1.2,
            }}
          >
            Where wellness, recovery, and modern medicine come together.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: '#6f4a26',
              fontWeight: 500,
              maxWidth: 880,
            }}
          >
            Orthopedics · Internal Medicine · Gastroenterology · Physical Therapy · Wellness
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid rgba(63,41,22,0.25)',
            paddingTop: 18,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#3f2916',
              letterSpacing: 0.5,
            }}
          >
            elevatewellnessnj.com
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#6f4a26',
              fontWeight: 500,
            }}
          >
            Board-certified · Multilingual · Same-week access
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
