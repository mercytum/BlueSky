import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './__tests__/lib/Playwright',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless: true,
    baseURL: 'http://localhost:19006', // where the app is running
    trace: 'on-first-retry',
  },
  reporter: 'html',
  projects: [
    {
      name: 'Chromium',
      use: {browserName: 'chromium'},
    },
    {
      name: 'Firefox',
      use: {browserName: 'firefox'},
    },
    {
      name: 'WebKit',
      use: {browserName: 'webkit'},
    },
  ],
})
