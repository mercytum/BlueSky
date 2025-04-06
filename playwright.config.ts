import {defineConfig} from '@playwright/test'

export default defineConfig({
  testDir: './__tests__/lib/Playwright',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    headless: true,
    baseURL: 'https://bsky.app/', // where the app is running
    trace: 'on-first-retry',
  },
  reporter: [['html'], ['allure-playwright', {outputFolder: 'allure-results'}]],
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
