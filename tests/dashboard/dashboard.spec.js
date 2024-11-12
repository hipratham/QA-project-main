const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
const { LoginPage } = require("../../pageObjects/login.po");
const { DashboardPage } = require("../../pageObjects/dashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await page.waitForTimeout(3000);
//   await login.verifyValidLogin();
});

test.describe("add to cart", () => {
  test.describe.configure({mode:"serial"});
  test("add to cart", async ({page}) =>{
    const dashboard = new DashboardPage(page);
       await dashboard.addToCart();
       await dashboard.verifyItemAdded();
  })
  test("increase quantity", async({page})=>{
    const dashboard = new DashboardPage(page);
    await dashboard.incQuantity();
  })

  test("remove items", async({page})=>{
    const dashboard = new DashboardPage(page);
    await dashboard.removeItem();
    // await dashboard.verifyRemove();
  })

  test("logout", async({page})=>{
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    await dashboard.verifyLogout();
  })

})