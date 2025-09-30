import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: "http://localhost:3000",
    extraHTTPHeaders: { "Content-Type": "application/json" }
  }
});
