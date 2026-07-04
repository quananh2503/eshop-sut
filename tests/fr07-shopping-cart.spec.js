const { test, expect } = require("@playwright/test");
const { WEB_URL } = require("./helpers/test-data");
const {
  addFirstProductFromHome,
  openCart,
  openWeb
} = require("./helpers/ui");

test.describe("FR-07 Shopping cart", () => {
  test("FR07-DT-001/FR07-BVA-006: adding a product should create one cart row with quantity 1", async ({ page }) => {
    await addFirstProductFromHome(page);
    await openCart(page);

    await expect(page.locator("tbody tr")).toHaveCount(1);
    await expect(page.locator("tbody tr").first()).toContainText("1");
  });

  test("FR07-DT-002: adding the same product twice should merge into one row and increase quantity", async ({ page }) => {
    await addFirstProductFromHome(page);
    await addFirstProductFromHome(page);
    await openCart(page);

    await expect(page.locator("tbody tr"), "Duplicate products should be merged into one cart row").toHaveCount(1);
    await expect(page.locator("tbody tr").first()).toContainText("2");
  });

  test("FR07-DT-003/FR07-BVA-007: adding two different products should show two cart rows", async ({ page }) => {
    await openWeb(page, "/");
    const addButtons = page.getByRole("button", { name: "Thêm vào giỏ" });
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await openCart(page);

    await expect(page.locator("tbody tr")).toHaveCount(2);
  });

  test("FR07-DT-004/FR07-DT-005: removing product should require a confirmation dialog", async ({ page }) => {
    await addFirstProductFromHome(page);
    await openCart(page);

    let dialogSeen = false;
    page.on("dialog", async (dialog) => {
      dialogSeen = true;
      await dialog.dismiss();
    });

    await page.getByRole("button", { name: "Xóa" }).click();
    await page.waitForTimeout(300);

    expect(dialogSeen, "Spec requires confirmation dialog before deleting a cart item").toBeTruthy();
    await expect(page.locator("tbody tr")).toHaveCount(1);
  });

  test("FR07-DT-008: cart total label should be 'Tổng cộng'", async ({ page }) => {
    await addFirstProductFromHome(page);
    await openCart(page);

    await expect(page.getByText(/Tổng cộng/i)).toBeVisible();
  });

  test("FR07-DT-006/FR07-BVA-005: empty cart should show message and illustration", async ({ page }) => {
    await page.goto(`${WEB_URL}/cart`);

    await expect(page.getByText("Giỏ hàng của bạn đang trống")).toBeVisible();
    await expect(page.locator("img"), "Spec requires an illustration for empty cart").toHaveCount(1);
  });

  test("FR07-BVA-001/FR07-BVA-003: cart should provide +/- controls for quantity boundaries", async ({ page }) => {
    await addFirstProductFromHome(page);
    await openCart(page);

    await expect(page.getByRole("button", { name: "+" })).toBeVisible();
    await expect(page.getByRole("button", { name: "-" })).toBeVisible();
  });

  test("FR07-DT-007: continue shopping should navigate back to home page", async ({ page }) => {
    await addFirstProductFromHome(page);
    await openCart(page);

    await page.getByRole("link", { name: /Mua tiếp|Tiếp tục mua sắm/i }).click();
    await expect(page.getByRole("heading", { name: "Danh sách sản phẩm" }).first()).toBeVisible();
  });
});
