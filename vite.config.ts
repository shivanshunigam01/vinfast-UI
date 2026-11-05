import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ mode }) => {
  const devPlugins =
    mode === "development"
      ? [(await import("lovable-tagger")).componentTagger()]
      : [];

  return {
  // Root URL on Hostinger/Vercel — required so /models/vf7 loads /assets/* correctly
  base: "/",

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [react(), ...devPlugins],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "react-vendor";
          if (id.includes("node_modules/react-router")) return "router";
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/@tanstack/react-query")) return "query";
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
};
});