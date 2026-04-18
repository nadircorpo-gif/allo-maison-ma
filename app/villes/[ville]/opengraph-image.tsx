import { ImageResponse } from "next/og";
import { getCityBySlug } from "@/lib/data/cities";
import { SERVICES } from "@/lib/data/services";

export const alt = "Allo Maison — Hub ville au Maroc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const city = getCityBySlug(ville);

  const cityName = city?.name ?? "Maroc";
  const artisanCount = city?.artisanCount ?? 0;
  const neighborhoodsCount = city?.neighborhoods.length ?? 0;
  const servicesCount = SERVICES.length;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#F5EFE6",
          color: "#1C1A17",
          fontFamily: "system-ui, sans-serif",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Header: wordmark + eyebrow */}
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
                fill="#1F4E5F"
              />
              <path d="M 160 100 L 230 160 L 90 160 Z" fill="#F5EFE6" />
              <rect x="100" y="160" width="120" height="90" fill="#F5EFE6" />
              <path
                d="M 145 250 L 145 200 Q 145 185 160 185 Q 175 185 175 200 L 175 250 Z"
                fill="#C24D2C"
              />
              <rect x="115" y="175" width="20" height="20" rx="1" fill="#1F4E5F" />
              <rect x="185" y="175" width="20" height="20" rx="1" fill="#1F4E5F" />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#1C1A17",
              }}
            >
              ALLO MAISON
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#6B6459",
            }}
          >
            Hub ville · Depuis 2017
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "1px",
            background: "#E6DFD3",
            marginTop: "40px",
            marginBottom: "56px",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C24D2C",
            marginBottom: "24px",
          }}
        >
          Services a domicile · {cityName}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "96px",
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: 0.96,
            color: "#1C1A17",
            marginBottom: "28px",
          }}
        >
          Artisans a {cityName}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            fontWeight: 500,
            color: "#1F4E5F",
            lineHeight: 1.3,
            marginBottom: "auto",
          }}
        >
          Pros vérifiés · Devis WhatsApp · Tous quartiers
        </div>

        {/* Bottom stats strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#6B6459",
            borderTop: "1px solid #E6DFD3",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "32px", fontWeight: 800, color: "#C24D2C" }}>
              {artisanCount}+
            </span>
            <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              artisans
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "32px", fontWeight: 800, color: "#1F4E5F" }}>
              {servicesCount}
            </span>
            <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              services
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "32px", fontWeight: 800, color: "#1F4E5F" }}>
              {neighborhoodsCount}
            </span>
            <span style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              quartiers
            </span>
          </div>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            allo-maison.ma
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
