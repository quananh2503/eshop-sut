const path = require("path");
const { test, expect } = require("@playwright/test");
const {
  getProducts,
  importProducts,
  loginAsAdmin
} = require("./helpers/api");
const { goToAdminProducts } = require("./helpers/ui");

const fixture = (...parts) => path.join(__dirname, "fixtures", "csv", ...parts);

test.describe("FR-16 Product import from CSV", () => {
  test("FR16-DT-001/FR16-BVA-002: admin UI should import a valid CSV with one data row", async ({ page }) => {
    await goToAdminProducts(page);

    await page.locator('input[type="file"]').setInputFiles(fixture("valid-one-product.csv"));
    await expect(page.getByText("Xem trước (1 dòng):")).toBeVisible();
    await page.getByRole("button", { name: /Import 1 sản phẩm/i }).click();

    await expect(page.getByText(/Import hoàn tất: 1\/1 sản phẩm được thêm/i)).toBeVisible();
  });

  test("FR16-DT-002: admin UI should reject non-CSV file extension", async ({ page }) => {
    await goToAdminProducts(page);

    await page.locator('input[type="file"]').setInputFiles(fixture("products.txt"));

    await expect(page.getByText(/không phải.*csv|file.*csv|đuôi.*csv/i)).toBeVisible();
  });

  test("FR16-DT-005/FR16-BVA-004: import API should reject price = 0", async ({ request }) => {
    const { token } = await loginAsAdmin(request);
    const response = await importProducts(request, token, [
      {
        name: "HW02 API Zero Price",
        price: 0,
        description: "Invalid zero price",
        imageUrl: "https://placehold.co/300",
        category_id: 1
      }
    ]);

    expect(response.status(), "Spec requires price to be a positive number").toBeGreaterThanOrEqual(400);
  });

  test("FR16-DT-006: import API should reject negative price", async ({ request }) => {
    const { token } = await loginAsAdmin(request);
    const response = await importProducts(request, token, [
      {
        name: "HW02 API Negative Price",
        price: -1,
        description: "Invalid negative price",
        imageUrl: "https://placehold.co/300",
        category_id: 1
      }
    ]);

    expect(response.status(), "Spec requires price to be a positive number").toBeGreaterThanOrEqual(400);
  });

  test("FR16-DT-009: mixed valid/invalid rows should rollback the whole import", async ({ request }) => {
    const { token } = await loginAsAdmin(request);
    const before = await getProducts(request);

    const response = await importProducts(request, token, [
      {
        name: "HW02 API Rollback Candidate",
        price: 10000,
        description: "This row must rollback when another row is invalid",
        imageUrl: "https://placehold.co/300",
        category_id: 1
      },
      {
        name: "",
        price: 15000,
        description: "Invalid missing name",
        imageUrl: "https://placehold.co/300",
        category_id: 1
      }
    ]);

    expect(response.status(), "Spec requires the whole batch to fail when any row is invalid").toBeGreaterThanOrEqual(400);
    const after = await getProducts(request);
    expect(after.length, "Spec requires all-or-nothing rollback").toBe(before.length);
  });

  test("FR16-DT-008: CSV parser should preserve comma inside quoted RFC 4180 field", async ({ page }) => {
    await goToAdminProducts(page);

    await page.locator('input[type="file"]').setInputFiles(fixture("rfc4180-description-comma.csv"));

    const preview = page.locator("table").first();
    await expect(preview).toContainText("Description has, a comma");
  });

  test("FR16-DT-010: import result should clearly report success and error counts with reasons", async ({ page }) => {
    await goToAdminProducts(page);

    await page.locator('input[type="file"]').setInputFiles(fixture("mixed-valid-invalid-name.csv"));
    await page.getByRole("button", { name: /Import 2 sản phẩm/i }).click();

    await expect(page.getByText(/thành công|sản phẩm được thêm/i)).toBeVisible();
    await expect(page.getByText(/lỗi|Thiếu tên sản phẩm/i)).toBeVisible();
  });
});
