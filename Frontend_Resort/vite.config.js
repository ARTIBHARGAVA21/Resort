import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://13.61.188.250:8000", // ✅ your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
