const path = require("path");
const { test, expect } = require("@playwright/test");
const { goToAdminProducts } = require("./helpers/ui");

const fixture = (...parts) => path.join(__dirname, "fixtures", "csv", ...parts);

async function uploadCsv(page, fileName) {
  await goToAdminProducts(page);
  await page.locator('input[type="file"]').setInputFiles(fixture(fileName));
}

async function importCurrentPreview(page, expectedRows) {
  await page.getByRole("button", { name: new RegExp(`Import ${expectedRows} sản phẩm`, "i") }).click();
}

test.describe("FR-16 Product import from CSV - UI domain tests", () => {
  test("FR16-DT-001/FR16-BVA-002: admin UI should import a valid CSV with one data row", async ({ page }) => {
    await uploadCsv(page, "valid-one-product.csv");

    await expect(page.getByText("Xem trước (1 dòng):")).toBeVisible();
    await importCurrentPreview(page, 1);
    await expect(page.getByText(/Import hoàn tất: 1\/1 sản phẩm được thêm/i)).toBeVisible();
  });

  test("FR16-DT-002: admin UI should reject non-CSV file extension", async ({ page }) => {
    await uploadCsv(page, "products.txt");

    await expect(page.getByText(/không phải.*csv|file.*csv|đuôi.*csv/i)).toBeVisible();
  });

  test("FR16-DT-003: admin UI should reject CSV with missing required header", async ({ page }) => {
    await uploadCsv(page, "missing-price-header.csv");

    await expect(page.getByText(/thiếu.*price|header.*price|sai.*header/i)).toBeVisible();
  });

  test("FR16-DT-004/FR16-BVA-007: admin UI should reject empty product name and rollback", async ({ page }) => {
    await uploadCsv(page, "mixed-valid-invalid-name.csv");

    await importCurrentPreview(page, 2);
    await expect(page.getByText(/Thiếu tên sản phẩm/i)).toBeVisible();
    await expect(page.getByText(/0\/2 sản phẩm được thêm|0 sản phẩm/i)).toBeVisible();
  });

  test("FR16-DT-005/FR16-BVA-004: admin UI should reject price = 0", async ({ page }) => {
    await uploadCsv(page, "invalid-price-zero.csv");

    await importCurrentPreview(page, 1);
    await expect(page.getByText(/0\/1 sản phẩm được thêm|0 sản phẩm/i), "price = 0 must be rejected, not imported").toBeVisible();
  });

  test("FR16-DT-006: admin UI should reject negative price", async ({ page }) => {
    await uploadCsv(page, "invalid-price-negative.csv");

    await importCurrentPreview(page, 1);
    await expect(page.getByText(/0\/1 sản phẩm được thêm|0 sản phẩm/i), "negative price must be rejected, not imported").toBeVisible();
  });

  test("FR16-DT-007: admin UI should reject non-numeric price", async ({ page }) => {
    await uploadCsv(page, "invalid-price-text.csv");

    await importCurrentPreview(page, 1);
    await expect(page.getByText(/0\/1 sản phẩm được thêm|0 sản phẩm/i), "non-numeric price must be rejected, not imported").toBeVisible();
  });

  test("FR16-DT-008: CSV parser should preserve comma inside quoted RFC 4180 field", async ({ page }) => {
    await uploadCsv(page, "rfc4180-description-comma.csv");

    const preview = page.locator("table").first();
    await expect(preview).toContainText("Description has, a comma");
  });

  test("FR16-BVA-001: header-only CSV should be rejected as empty data", async ({ page }) => {
    await uploadCsv(page, "header-only.csv");

    await expect(page.getByText(/không có dữ liệu|0 dòng|empty/i)).toBeVisible();
  });

  test("FR16-DT-010: import result should clearly report success count, error count, and reasons", async ({ page }) => {
    await uploadCsv(page, "mixed-valid-invalid-name.csv");

    await importCurrentPreview(page, 2);
    await expect(page.getByText(/0\/2|thành công|sản phẩm được thêm/i)).toBeVisible();
    await expect(page.getByText(/lỗi|Thiếu tên sản phẩm/i)).toBeVisible();
  });
});
