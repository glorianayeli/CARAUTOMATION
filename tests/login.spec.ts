import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.pages";
import { CREDENTIALS } from "../data/constantes";

test.describe("Login page ", () => {
  test.skip("Should be able to login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(CREDENTIALS.USER_DEV.user, CREDENTIALS.USER_DEV.password);
    await expect(page).toHaveURL("./inventory.html");
  });

  test("should get incorrect password alert", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      CREDENTIALS.INCORRECT_USER_DEV.user,
      CREDENTIALS.INCORRECT_USER_DEV.password
    );
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
