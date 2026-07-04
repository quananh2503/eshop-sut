const { test, expect } = require("@playwright/test");
const {
  registerUser,
  requestForgotPassword,
  resetPassword
} = require("./helpers/api");
const { uniqueEmail, WEB_URL } = require("./helpers/test-data");

test.describe("FR-03 Forgot password and password reset", () => {
  test("FR03-DT-001/FR03-BVA-002: OTP request for registered email should return a 6-digit OTP", async ({ request }) => {
    const email = uniqueEmail("fr03-otp");
    await registerUser(request, { email, password: "OldPass123!" });

    const response = await requestForgotPassword(request, email);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body.resetToken, "Spec requires OTP to have exactly 6 digits").toMatch(/^\d{6}$/);
  });

  test("FR03-DT-002: forgot password should reject unregistered email", async ({ request }) => {
    const response = await requestForgotPassword(request, uniqueEmail("unknown"));

    expect(response.status()).toBeGreaterThanOrEqual(400);
    const body = await response.json();
    expect(body.error || body.message).toBeTruthy();
  });

  test("FR03-DT-006/FR03-BVA-004: reset API should reject weak new password", async ({ request }) => {
    const email = uniqueEmail("fr03-weak");
    await registerUser(request, { email, password: "OldPass123!" });
    const forgotResponse = await requestForgotPassword(request, email);
    const { resetToken } = await forgotResponse.json();

    const resetResponse = await resetPassword(request, {
      email,
      resetToken,
      newPassword: "weak"
    });

    expect(resetResponse.status(), "Spec requires strong password validation during reset").toBeGreaterThanOrEqual(400);
  });

  test("FR03-DT-008: OTP should only be valid for the email that requested it", async ({ request }) => {
    const emailA = uniqueEmail("fr03-a");
    const emailB = uniqueEmail("fr03-b");
    await registerUser(request, { email: emailA, password: "OldPass123!" });
    await registerUser(request, { email: emailB, password: "OldPass123!" });

    const forgotResponse = await requestForgotPassword(request, emailA);
    const { resetToken } = await forgotResponse.json();
    const resetResponse = await resetPassword(request, {
      email: emailB,
      resetToken,
      newPassword: "NewPass123!"
    });

    expect(resetResponse.status()).toBeGreaterThanOrEqual(400);
  });

  test("FR03-UI-001: forgot password UI should show a clear step indicator", async ({ page }) => {
    await page.goto(`${WEB_URL}/forgot-password`);

    await expect(page.getByText(/Bước\s*1\s*\/\s*2/i)).toBeVisible();
  });

  test("FR03-DT-007: reset UI should include confirm new password field", async ({ page, request }) => {
    const email = uniqueEmail("fr03-confirm");
    await registerUser(request, { email, password: "OldPass123!" });

    await page.goto(`${WEB_URL}/forgot-password`);
    await page.locator("input").first().fill(email);
    await page.getByRole("button", { name: "Lấy mã OTP" }).click();

    await expect(page.getByLabel(/Xác nhận mật khẩu mới/i)).toBeVisible();
  });

  test("FR03-UI-002: forgot password UI should have a back-to-login control", async ({ page }) => {
    await page.goto(`${WEB_URL}/forgot-password`);

    await expect(page.getByRole("link", { name: /Quay lại đăng nhập|Đăng nhập/i })).toBeVisible();
  });
});
