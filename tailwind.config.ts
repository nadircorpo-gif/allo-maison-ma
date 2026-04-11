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
          DEFAULT: "#1E40AF",
          deep: "#1E3A5F",
          light: "#EFF6FF",
        },
        trust: {
          DEFAULT: "#10B981",
          light: "#F0FDF4",
          border: "#BBF7D0",
          text: "#166534",
        },
        ink: "#0F172A",
        muted: "#64748B",
        surface: "#F8FAFC",
        amber: "#F59E0B",
        whatsapp: "#25D366",
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
        badge: "20px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px 0 rgba(0,0,0,0.12), 0 2px 6px -2px rgba(0,0,0,0.08)",
        modal: "0 20px 60px -10px rgba(0,0,0,0.25)",
        search: "0 8px 32px 0 rgba(30,64,175,0.15)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
