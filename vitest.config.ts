/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import components from "unplugin-vue-components/vite"
import autoImport from "unplugin-auto-import/vite"

export default defineConfig({
  plugins: [
    vue(),
    autoImport({ imports: ["vue", "vue-router"] }),
    components({ dirs: "components" }),
  ],
  test: {
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
    setupFiles: ["./__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
})
