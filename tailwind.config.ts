import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C24D2C",
          deep: "#A8401F",
          light: "#E8D5C4",
        },
        trust: {
          DEFAULT: "#1F4E5F",
          light: "#EAF0F2",
          border: "#D4E0E4",
          text: "#1F4E5F",
        },
        cream: "#F5EFE6",
        clay: "#E8D5C4",
        zellige: "#1F4E5F",
        saffron: "#D4A24C",
        mint: "#7FA99B",
        terracotta: "#C24D2C",
        ink: "#1C1A17",
        muted: "#6B6459",
        surface: "#F5EFE6",
        "paper-border": "#E6DFD3",
        amber: "#D4A24C",
        whatsapp: "#25D366",
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
        badge: "20px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(28,26,23,0.08), 0 1px 2px -1px rgba(28,26,23,0.06)",
        "card-hover": "0 24px 48px -24px rgba(28,26,23,0.18)",
        modal: "0 20px 60px -10px rgba(28,26,23,0.25)",
        search: "0 24px 48px -24px rgba(28,26,23,0.18)",
        terracotta: "0 12px 32px -16px rgba(194,77,44,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Fraunces", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
