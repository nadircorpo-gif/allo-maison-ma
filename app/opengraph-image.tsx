import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Allo Maison — Artisans vérifiés et certifiés depuis 2017";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#F5EFE6",
          color: "#1C1A17",
          fontFamily: "system-ui, sans-serif",
          padding: "80px",
          gap: "80px",
        }}
      >
        {/* Shield badge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <svg width="300" height="380" viewBox="0 0 320 400">
            <path
              d="M 60 40 L 260 40 Q 280 40 280 60 L 280 180 Q 280 270 160 340 Q 40 270 40 180 L 40 60 Q 40 40 60 40 Z"
              fill="#1F4E5F"
            />
            <path
              d="M 68 50 L 252 50 Q 270 50 270 68 L 270 180 Q 270 258 160 322 Q 50 258 50 180 L 50 68 Q 50 50 68 50 Z"
              stroke="#D4A24C"
              strokeWidth="2"
              fill="none"
              strokeOpacity="0.5"
            />
            <path d="M 160 100 L 230 160 L 90 160 Z" fill="#F5EFE6" />
            <rect x="100" y="160" width="120" height="90" fill="#F5EFE6" />
            <path
              d="M 145 250 L 145 200 Q 145 185 160 185 Q 175 185 175 200 L 175 250 Z"
              fill="#C24D2C"
            />
            <rect x="115" y="175" width="20" height="20" rx="1" fill="#1F4E5F" />
            <rect x="185" y="175" width="20" height="20" rx="1" fill="#1F4E5F" />
            <circle cx="240" cy="90" r="26" fill="#F5EFE6" />
            <circle cx="240" cy="90" r="22" fill="#7FA99B" />
            <path
              d="M 230 90 L 237 98 L 251 82"
              stroke="#F5EFE6"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "620px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6B6459",
              marginBottom: "20px",
            }}
          >
            Depuis 2017 · Vérifié et certifié
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "96px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 0.95,
              color: "#1C1A17",
            }}
          >
            ALLO MAISON
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              fontWeight: 500,
              color: "#1F4E5F",
              marginTop: "24px",
              lineHeight: 1.25,
            }}
          >
            Artisans vérifiés pour tous vos services à domicile au Maroc.
          </div>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "36px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#6B6459",
            }}
          >
            <span>1 017 artisans</span>
            <span style={{ color: "#E6DFD3" }}>·</span>
            <span>6 villes</span>
            <span style={{ color: "#E6DFD3" }}>·</span>
            <span>Pros certifiés</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
