import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/data/services";
import { getCityBySlug } from "@/lib/data/cities";

export const alt = "Allo Maison — Services à domicile au Maroc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICE_SLUGS = [
  "plombier", "electricien", "femme-de-menage", "peintre", "climatisation", "serrurier",
  "bricoleur", "renovation", "jardinier", "technicien-informatique", "demenagement",
  "carreleur", "menuisier", "etancheite", "desinsectisation", "vitrier",
  "cuisiniere", "concierge", "nounou",
];

function parseSlug(slug: string) {
  for (const serviceSlug of SERVICE_SLUGS) {
    if (slug.startsWith(`${serviceSlug}-`)) {
      const citySlug = slug.slice(serviceSlug.length + 1);
      const service = getServiceBySlug(serviceSlug);
      const city = getCityBySlug(citySlug);
      return { service, city };
    }
  }
  return { service: undefined, city: undefined };
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { service, city } = parseSlug(slug);

  const serviceName = service?.name ?? "Services à domicile";
  const cityName = city?.name ?? "Maroc";
  const priceMin = service?.priceMin;

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
            Depuis 2017 · Certifie
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
          Service certifie · {cityName}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: "88px",
            fontWeight: 700,
            letterSpacing: "-2.5px",
            lineHeight: 0.98,
            color: "#1C1A17",
            marginBottom: "28px",
          }}
        >
          {serviceName} a {cityName}
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
          Pros vérifiés · Devis WhatsApp · Intervention 24 h
        </div>

        {/* Bottom trust strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#6B6459",
            borderTop: "1px solid #E6DFD3",
            paddingTop: "24px",
          }}
        >
          {priceMin && (
            <>
              <span style={{ display: "flex", color: "#C24D2C" }}>
                des {priceMin} MAD
              </span>
              <span style={{ color: "#E6DFD3" }}>·</span>
            </>
          )}
          <span style={{ display: "flex" }}>Pros vérifiés</span>
          <span style={{ color: "#E6DFD3" }}>·</span>
          <span style={{ display: "flex" }}>allo-maison.ma</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
