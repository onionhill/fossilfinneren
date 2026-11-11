import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static assets are served from cdn.fossilfinneren.no in production.
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "https://cdn.fossilfinneren.no/web/" : "/",
  plugins: [react()],
  server: { port: 5173 },
  test: { environment: "node", include: ["src/**/*.test.ts"] },
}));
