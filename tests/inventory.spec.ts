import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.pages";
import { CREDENTIALS } from "../data/constantes";
import { InventoryPage } from "../pages/inventory.pages";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(CREDENTIALS.USER_DEV.user, CREDENTIALS.USER_DEV.password);
  });

  test("should be able to add products to the car", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.selectProduct("Sauce Labs Backpack");
    await inventory.selectProduct("Sauce Labs Bolt T-Shirt");
    await inventory.clickCartIcon();

    await expect(
      page.locator(".cart_item").filter({ hasText: "Sauce Labs Bolt T-Shirt" })
    ).toBeVisible();
  });

  test("should be able to sort the items low to high", async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.filterPriceLowToHigh();
    //const inventoryItems = (await page.locator('.inventory_item_price').allTextContents());
    //const expected = inventoryItems.map((item) => Number(item.replace('$', ''))).sort((a, b) => a - b);
    //await expect(inventoryItems.map((item) => Number(item.replace('$', '')))).toEqual(expected)
    const inventoryItems = await page
      .locator(".inventory_item_price")
      .evaluateAll((elements) =>
        elements.map((element) =>
          Number(element.textContent?.replace("$", "") || 0)
        )
      );
    const expected = inventoryItems.slice().sort((a, b) => a - b);
    expect(inventoryItems).toEqual(expected);
  });
});
