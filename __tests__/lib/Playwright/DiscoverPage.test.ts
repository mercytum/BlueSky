import {expect, test} from '@playwright/test'
import fs from 'fs'
import path from 'path'

test('user can search and explore content from Discover page', async ({
  page,
}) => {
  // Start JavaScript coverage
  await page.coverage.startJSCoverage()

  // Go to site and Login
  await page.goto('http://localhost:19006/')
  await page.getByRole('button', {name: 'Sign in'}).click()
  await page.getByTestId('loginUsernameInput').fill('cis565bskytests@gmail.com')
  await page.getByTestId('loginPasswordInput').click()
  await page.getByTestId('loginPasswordInput').fill('CIS565TestGroup')
  await page.getByTestId('loginNextButton').click()

  // Expect Discover tab to be visible after login and click it
  await expect(page.getByTestId('homeScreenFeedTabs-Discover')).toBeVisible()
  await page.getByTestId('homeScreenFeedTabs-Discover').click()

  // Search for "playwright.dev"
  await page.getByRole('search', {name: 'Search'}).click()
  await page.getByRole('search', {name: 'Search'}).fill('playwright.dev')
  await page.getByRole('search', {name: 'Search'}).press('Enter')

  // Expect "Top" tab to be visible in search results and click it
  await expect(
    page.getByTestId('undefined-selector-0').getByText('Top'),
  ).toBeVisible()
  await page.getByTestId('undefined-selector-0').getByText('Top').click()

  // Click on the first result
  const firstResult = page
    .getByTestId('undefined-selector-0')
    .locator('div')
    .first()
  await expect(firstResult).toBeVisible()
  await firstResult.click()

  // Go back Home and tap Trending
  await page.getByRole('link', {name: 'Home'}).click()
  await page.getByText('Trending').click()

  // Browse a topic (e.g., Music Sky)
  const musicTopic = page.getByRole('link', {name: 'Browse topic Music Sky'})
  await expect(musicTopic).toBeVisible()
  await musicTopic.click()

  // Go back Home
  await page.getByRole('link', {name: 'Home'}).click()

  // Stop coverage and save result globally
  const coverage = await page.coverage.stopJSCoverage()

  // Check coverage data
  if (coverage.length > 0) {
    const outputPath = path.resolve(__dirname, './coverage/js-coverage.json')
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, JSON.stringify({result: coverage}, null, 2))
    console.log('Coverage saved to', outputPath)
  } else {
    console.error('❌ No coverage data collected')
  }
})
