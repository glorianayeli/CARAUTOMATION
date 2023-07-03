import { test, expect } from "@playwright/test";
import { CartPage } from "../pages/cart.pages";
import { LoginPage } from "../pages/login.pages";
import { InventoryPage } from "../pages/inventory.pages";
import { CREDENTIALS } from "../data/constantes";

test.describe("Cart page", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(CREDENTIALS.USER_DEV.user, CREDENTIALS.USER_DEV.password);
  });

  test("should be able to remove an item cart", async ({ page }) => {
    const cartPage = new CartPage(page);
    const inventory = new InventoryPage(page);

    await inventory.selectProduct("Sauce Labs Backpack");
    await inventory.selectProduct("Sauce Labs Bolt T-Shirt");
    await inventory.clickCartIcon();
    await cartPage.removeItemCart("Sauce Labs Backpack");

    await expect(
      page.locator(".cart_item").filter({ hasText: "Sauce Labs Bolt T-Shirt" })
    ).toBeVisible();
    await expect(
      page.locator(".cart_item").filter({ hasText: "Sauce Labs Backpack" })
    ).not.toBeVisible();
  });
});
