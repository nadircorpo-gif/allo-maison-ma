import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "allo-maison.ma — Services a domicile de confiance au Maroc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 50%, #2563EB 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "14px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              fontWeight: 800,
              color: "#1E40AF",
            }}
          >
            A
          </div>
          <div style={{ fontSize: "48px", fontWeight: 800 }}>
            <span style={{ color: "white" }}>allo-maison</span>
            <span style={{ color: "#F59E0B" }}>.ma</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            opacity: 0.9,
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Services a domicile de confiance au Maroc
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            fontSize: "18px",
            opacity: 0.7,
          }}
        >
          <span>500+ Artisans verifies</span>
          <span>|</span>
          <span>6 villes</span>
          <span>|</span>
          <span>Depuis 2017</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
