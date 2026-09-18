import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Resizes/re-encodes stills under src/assets at build time. The width list
    // and output format live in src/lib/images.ts (the one glob that imports
    // them); this just enables the transform and accepts upper-case extensions.
    imagetools({ include: /^[^?]+\.(avif|gif|heif|jpeg|jpg|png|tiff|webp)(\?.*)?$/i }),
  ],
  build: {
    // Vite fingerprints everything it emits (JS, CSS, resized images), so the
    // host can cache this folder forever. Keeping it separate from public/assets
    // (unhashed videos) lets the cache headers target hashed files only.
    assetsDir: "static",
  },
});
