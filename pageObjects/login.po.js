const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    // this.cross = '//*[@id="elementor-popup-modal-11619"]/div/a/i';
    this.loginClick = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[2]/a';
    this.usernameInput = '//*[@id="loginForm"]/div[1]/input';
    this.passwordInput = '//*[@id="loginForm"]/div[2]/input';
    this.loginButton = '//*[@id="loginForm"]/div[3]/button';
    this.validLoginValidation = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[2]/a';
    // this.errorMessage = '//*[@id="error"]';
    // this.successMessage = "";
  }

  async login(username, password) {
    
    await this.page.locator(this.loginClick).click();
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  };
  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toBeVisible();

  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};