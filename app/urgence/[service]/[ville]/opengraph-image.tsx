import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";

export const alt = "Allo Maison — Urgence 24/7 au Maroc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ service: string; ville: string }>;
}) {
  const { service: serviceSlug, ville: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  const serviceName = service?.name ?? "Intervention";
  const cityName = city?.name ?? "Maroc";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#1C1A17",
          color: "#F5EFE6",
          fontFamily: "system-ui, sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Red urgency ribbon top */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "12px",
            background: "#C24D2C",
          }}
        />

        {/* Header: wordmark + urgence badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="56" height="70" viewBox="0 0 320 400">
              <path
                d="M 60 40 L 260 40 Q 280 40 280 60 L 280 180 Q 280 270 160 340 Q 40 270 40 180 L 40 60 Q 40 40 60 40 Z"
                fill="#C24D2C"
              />
              <path d="M 160 100 L 230 160 L 90 160 Z" fill="#F5EFE6" />
              <rect x="100" y="160" width="120" height="90" fill="#F5EFE6" />
              <path
                d="M 145 250 L 145 200 Q 145 185 160 185 Q 175 185 175 200 L 175 250 Z"
                fill="#1C1A17"
              />
              <rect x="115" y="175" width="20" height="20" rx="1" fill="#C24D2C" />
              <rect x="185" y="175" width="20" height="20" rx="1" fill="#C24D2C" />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#F5EFE6",
              }}
            >
              ALLO MAISON
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#C24D2C",
              color: "#F5EFE6",
              padding: "12px 24px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            URGENCE 24/7
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "1px",
            background: "#3A3530",
            marginTop: "44px",
            marginBottom: "56px",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#D4A24C",
            marginBottom: "24px",
          }}
        >
          SOS · {cityName} · Disponible maintenant
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "88px",
            fontWeight: 700,
            letterSpacing: "-2.5px",
            lineHeight: 0.98,
            color: "#F5EFE6",
            marginBottom: "28px",
          }}
        >
          {serviceName} d&apos;urgence
        </div>

        {/* Sub-title: city in accent */}
        <div
          style={{
            display: "flex",
            fontSize: "64px",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1,
            color: "#C24D2C",
            marginBottom: "32px",
          }}
        >
          a {cityName}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 500,
            color: "#D4A24C",
            lineHeight: 1.3,
            marginBottom: "auto",
          }}
        >
          Intervention en 30 minutes · Devis WhatsApp immédiat
        </div>

        {/* Bottom trust strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#A89D8C",
            borderTop: "1px solid #3A3530",
            paddingTop: "24px",
          }}
        >
          <span style={{ display: "flex", color: "#F5EFE6" }}>
            +212 661 409 190
          </span>
          <span style={{ color: "#3A3530" }}>·</span>
          <span style={{ display: "flex" }}>Pros certifies</span>
          <span style={{ color: "#3A3530" }}>·</span>
          <span style={{ display: "flex" }}>allo-maison.ma/urgence</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
