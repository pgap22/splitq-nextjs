// @ts-check
const { test, expect } = require('@playwright/test');
const randomEmail = require('random-email');

let url = "https://localhost:3000";

let email = ''
let pass = '123123123'

test.describe("account", () => {

    test("creating an account", async ({ page }) => {
      email = randomEmail({domain: "splitq.com"})
      await page.goto(url + "/auth/signup");
      await page.getByPlaceholder("Nombre").fill("Playwright")
      await page.getByPlaceholder("Apellido").fill("E2E Test")
      await page.getByPlaceholder("Email").fill(email)
      await page.getByPlaceholder("Contraseña").fill(pass)
      await page.getByRole("button", { name: /crear/i }).click()
      await page.waitForSelector("h1+p+a")
      await expect(page.getByRole("link", { name: /iniciar/i })).toBeInViewport()
    
    })
  

    test("same email error", async({page})=>{
        await page.goto(url + "/auth/signup");
        await page.getByPlaceholder("Nombre").fill("Playwright")
        await page.getByPlaceholder("Apellido").fill("E2E Test")
        await page.getByPlaceholder("Email").fill(email)
        await page.getByPlaceholder("Contraseña").fill(pass)
        await page.getByRole("button", { name: /crear/i }).click()
        await page.waitForSelector("form > div+div")

        await expect(page.locator("form").getByRole("alert")).toBeInViewport()
    })
  })