import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(user: string, password: string) {
    await this.page.goto("./");
    await this.page.locator('[data-test="username"]').fill(user);
    await this.page.locator('[data-test="password"]').fill(password);
    await this.page.locator("#login-button").click();
  }
}
