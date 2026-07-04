const { test, expect } = require("@playwright/test");
const { WEB_URL } = require("./helpers/test-data");

async function openForgotPassword(page) {
  await page.goto(`${WEB_URL}/forgot-password`);
  await expect(page.getByRole("heading", { name: "Quên Mật Khẩu" })).toBeVisible();
}

async function requestOtpViaUi(page, email) {
  await openForgotPassword(page);
  await page.locator("input").first().fill(email);
  await page.getByRole("button", { name: "Lấy mã OTP" }).click();
}

function extractOtp(text) {
  const match = text.match(/\b\d+\b/);
  return match ? match[0] : "";
}

test.describe("FR-03 Forgot password and password reset - UI domain tests", () => {
  test("FR03-DT-001/FR03-BVA-002: UI should show a 6-digit OTP for registered email", async ({ page }) => {
    await requestOtpViaUi(page, "test@eshop.com");

    const message = page.getByText(/Mã OTP của bạn là:/i);
    await expect(message).toBeVisible();
    const otpText = await message.textContent();
    const otp = extractOtp(otpText || "");

    expect(otp, "Spec requires the demo UI to display exactly 6 OTP digits").toMatch(/^\d{6}$/);
  });

  test("FR03-DT-002: UI should reject unregistered email and stay in request step", async ({ page }) => {
    await openForgotPassword(page);

    const dialogPromise = page.waitForEvent("dialog");
    await page.locator("input").first().fill(`unknown-${Date.now()}@example.com`);
    await page.getByRole("button", { name: "Lấy mã OTP" }).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toMatch(/User not found|Lỗi/i);
    await dialog.dismiss();
    await expect(page.getByRole("button", { name: "Lấy mã OTP" })).toBeVisible();
  });

  test("FR03-DT-003: email field should use HTML5 email validation", async ({ page }) => {
    await openForgotPassword(page);

    const emailInput = page.locator("input").first();
    await expect(emailInput, "Spec requires email fields to use type=email validation").toHaveAttribute("type", "email");
  });

  test("FR03-DT-006/FR03-BVA-004: UI should reject weak new password before reset", async ({ page }) => {
    await requestOtpViaUi(page, "test@eshop.com");
    const message = page.getByText(/Mã OTP của bạn là:/i);
    const otp = extractOtp((await message.textContent()) || "");

    await page.locator("input").nth(1).fill(otp);
    await page.locator("input").nth(2).fill("weak");

    const dialogPromise = page.waitForEvent("dialog");
    await page.getByRole("button", { name: "Đặt lại mật khẩu" }).click();
    const dialog = await dialogPromise;

    expect(dialog.message()).toMatch(/Mật khẩu quá yếu/i);
    await dialog.dismiss();
  });

  test("FR03-BVA-005: UI should accept an 8-character strong password format before checking OTP", async ({ page }) => {
    await requestOtpViaUi(page, "test@eshop.com");

    await page.locator("input").nth(1).fill("000000");
    await page.locator("input").nth(2).fill("Aa1!aaaa");

    const dialogPromise = page.waitForEvent("dialog");
    await page.getByRole("button", { name: "Đặt lại mật khẩu" }).click();
    const dialog = await dialogPromise;

    expect(dialog.message(), "A valid 8-char strong password should not be rejected as weak").not.toMatch(/Mật khẩu quá yếu/i);
    await dialog.dismiss();
  });

  test("FR03-DT-007: reset UI should include confirm new password field", async ({ page }) => {
    await requestOtpViaUi(page, "test@eshop.com");

    await expect(page.getByLabel(/Xác nhận mật khẩu mới/i)).toBeVisible();
  });

  test("FR03-UI-001: forgot password UI should show a clear step indicator", async ({ page }) => {
    await openForgotPassword(page);

    await expect(page.getByText(/Bước\s*1\s*\/\s*2/i)).toBeVisible();
  });

  test("FR03-UI-002: forgot password UI should have a back-to-login control in step 1", async ({ page }) => {
    await openForgotPassword(page);

    await expect(page.getByRole("link", { name: /Quay lại đăng nhập|Đăng nhập/i })).toBeVisible();
  });
});
