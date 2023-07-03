import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(productName: string) {
    //Regresa el todos los divs que tienen la clase inventory_item, filtra por la variable productname busca el boton dentro del div el boton add to cart
    await this.page
      .locator(".inventory_item")
      .filter({ hasText: productName })
      .getByRole("button", { name: "ADD TO CART" })
      .first()
      .click();
    //const buttonLocator = `.inventory_container .inventory_item:has(.inventory_item_name:has-text("${productName}")) .btn_inventory`;
    //const addButton = await this.page.locator(buttonLocator).first();
    //await addButton.click();
  }

  async clickCartIcon() {
    await this.page.locator('[data-icon="shopping-cart"]').click();
  }

  async filterPriceLowToHigh() {
    await this.page
      .locator(".product_sort_container")
      .selectOption("Price (low to high)");
  }
}
