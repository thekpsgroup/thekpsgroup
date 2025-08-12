import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    port: 4321,
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:4321',
  },
});
