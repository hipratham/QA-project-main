const { expect } = require("@playwright/test");
const dashboardTestdata = require("../fixture/dashboard.fixture.json")

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '//*[@id="search"]';
    this.addToCartButton = '//*[@id="productList"]/div/button';
    this.productInCart = '//*[@id="cartTable"]/tbody/tr[1]/td[2]/a';
    this.cart = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[4]';

    this.increaseQuantity = '//*[@id="cartTable"]/tbody/tr[1]/td[5]/div/span[2]/button';
    this.remove = '//*[@id="cartTable"]/tbody/tr[1]/td[7]/button';
    this.popup = '//*[@id="popup"]/div/div[3]/div/div[1]/button';

    this.loginButton = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[2]/a';

    this.avatar = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[2]/a'
    this.logoutBtn = '//html/body/div[1]/div[1]/div/div/div/nav[2]/ul/li[2]/ul/li[5]/a';
  }

  async addToCart() {
    await this.page.locator(this.searchInput).fill(dashboardTestdata.searchProduct);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.addToCartButton).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyItemAdded(){
    await this.page.waitForTimeout(2000);
    await this.page.goto("https://cheers.com.np/cart")
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.productInCart)).toHaveText(dashboardTestdata.searchProduct);
    
  }

  async incQuantity(){
    await this.page.goto("https://cheers.com.np/cart")

    await this.page.waitForTimeout(2000);

    for(let i=0; i<=2; i++){
      await this.page.locator(this.increaseQuantity).click();
    }
    await this.page.waitForTimeout(2000);
  }

  async removeItem(){
    await this.page.waitForTimeout(2000);
    await this.page.goto("https://cheers.com.np/cart");
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.remove).click();
    await this.page.locator(this.popup).click();
  }

  async logout(){
    await this.page.locator(this.avatar).click();
    await this.page.waitForTimeout(2000);

    await this.page.locator(this.logoutBtn).click();
  }  

  async verifyLogout(){
    await expect(this.page.locator(this.loginButton)).toBeVisible()
  }


};