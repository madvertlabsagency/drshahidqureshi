import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  // Brand CSS (app/brand.css) owns the base layer; keep Tailwind's preflight off to avoid double resets.
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        emerald: { DEFAULT: "#003D2B", 2: "#00573D", 3: "#0B6B47", deep: "#00261B" },
        gold: { DEFAULT: "#FFBF00", 2: "#FFD34D", 3: "#E0A500" },
        ivory: { DEFAULT: "#FAFAF7", 2: "#F2F1EA" },
        charcoal: "#111914",
        muted: "#4B5650",
      },
      fontFamily: {
        head: ["Montserrat", "Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      maxWidth: { site: "1200px" },
    },
  },
  plugins: [],
};
export default config;
