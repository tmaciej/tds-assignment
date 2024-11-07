import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/*.spec.tsx", "**/*.test.tsx"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
});
