import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItemCart(item: string) {
    await this.page
      .locator(".cart_item")
      .filter({ hasText: item })
      .getByRole("button", { name: "REMOVE" })
      .first()
      .click();
  }
}
