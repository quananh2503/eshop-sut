const { expect } = require("@playwright/test");
const { ADMIN_URL, WEB_URL, accounts } = require("./test-data");

async function openWeb(page, path = "/") {
  await page.goto(`${WEB_URL}${path}`);
}

async function openAdmin(page) {
  await page.goto(ADMIN_URL);
}

async function loginAdminUi(page) {
  await openAdmin(page);
  await page.getByPlaceholder("Email").fill(accounts.admin.email);
  await page.getByPlaceholder("Password").fill(accounts.admin.password);
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("EShop Admin")).toBeVisible();
}

async function goToAdminProducts(page) {
  await loginAdminUi(page);
  await page.getByText("Sản phẩm", { exact: true }).click();
  await expect(page.getByText("Quản lý Sản phẩm")).toBeVisible();
}

async function addFirstProductFromHome(page) {
  await openWeb(page, "/");
  await expect(page.getByRole("heading", { name: "Danh sách sản phẩm" }).first()).toBeVisible();
  await page.getByRole("button", { name: "Thêm vào giỏ" }).first().click();
}

async function openCart(page) {
  await page.getByRole("link", { name: "Giỏ hàng" }).click();
  await expect(page.getByRole("heading", { name: "Giỏ Hàng" }).or(page.getByText("Giỏ hàng của bạn đang trống"))).toBeVisible();
}

module.exports = {
  openWeb,
  openAdmin,
  loginAdminUi,
  goToAdminProducts,
  addFirstProductFromHome,
  openCart
};
