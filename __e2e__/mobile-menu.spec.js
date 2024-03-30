// @ts-check
const { test, expect } = require('@playwright/test');

let url = "https://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.goto(url + "/")
  await page.setViewportSize({
    width: 320,
    height: 810
  })
  await page.getByRole("button", { name: "menu" }).click()
})

test.describe("mobile menu", () => {

  test("goto signup", async ({ page }) => {
    await page.getByRole("dialog").getByRole("link", { name: /crear/i }).click()
    await expect(page).toHaveURL("https://localhost:3000/auth/signup")
  })

  test("goto login", async ({ page }) => {
    await page.getByRole("dialog").getByRole("link", { name: /iniciar/i }).click()
    await expect(page).toHaveURL("https://localhost:3000/auth/login")
  })

  test("close dialog", async ({ page }) => {
    await page.getByRole("dialog").getByRole("button", { name: "close-dialog" }).click();
    await expect(page.getByRole("dialog")).not.toBeInViewport()
  })

})

