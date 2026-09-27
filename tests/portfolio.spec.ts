import { test, expect } from '@playwright/test'

test('projects, links, and resume are available', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Phan Chí')
  await expect(page.getByRole('heading', { name: /EcoQuest Campus/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /FreshTrace/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Open FreshTrace/i })).toHaveAttribute('href', 'https://freshtrace-app.vercel.app/')
  await page.getByText('Technical details', { exact: true }).first().click()
  await expect(page.getByRole('heading', { name: 'From an approved action to reward points' })).toBeVisible()
  const response = await request.get('/PhanChiCuong_Internship_Resume.pdf')
  expect(response.ok()).toBeTruthy()
  expect(response.headers()['content-type']).toContain('pdf')
  expect(errors).toEqual([])
})

test('Vietnamese copy and language persistence work', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'VI', exact: true }).click()
  await expect(page.getByText('Chào bạn, mình là', { exact: true })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow, `Vietnamese layout overflows at ${width}px`).toBe(false)
  }
  await page.reload()
  await expect(page.getByText('Chào bạn, mình là', { exact: true })).toBeVisible()
})

test('mobile navigation works without horizontal overflow', async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click()
  await expect(page.getByRole('heading', { name: /Get in touch/i })).toBeVisible()
})

test('real screenshots can be changed and opened on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const project = page.locator('#ecoquest')
  await project.getByRole('button', { name: 'Mobile dashboard', exact: true }).click()
  const image = project.locator('figure img')
  await expect(image).toHaveAttribute('src', '/projects/ecoquest/mobile.png')
  await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  const openButton = project.getByRole('button', { name: 'View image: Mobile dashboard' })
  await openButton.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Next image' }).click()
  await expect(dialog.getByRole('img')).toHaveAttribute('src', '/projects/ecoquest/dashboard.png')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(project.locator('.screenshot-button')).toBeFocused()
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})
