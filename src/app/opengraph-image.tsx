import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#0d1417',
          color: '#f1f3f1',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 28, color: '#baff4b', letterSpacing: 4 }}>
          MERN STACK DEVELOPER · FRONT-END FOCUS
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 36, color: '#9da9b1', marginTop: 24 }}>
          React · Next.js · TypeScript · Node.js · Express · MongoDB
        </div>
      </div>
    ),
    size,
  );
}
