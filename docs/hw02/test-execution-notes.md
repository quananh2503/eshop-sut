# HW02 - Test Execution Notes

Sinh vien: Nguyen Le Quan Anh - 23127001 - 23KTPM2

## 1. Lan chay test

| Run ID | Date/time | Backend | Web | Admin | Command | Result summary | Notes |
|---|---|---|---|---|---|---|---|
| RUN-001 | 2026-07-04 09:24 UTC | `localhost:3000` | `127.0.0.1:5173` | `127.0.0.1:5174` | `npm run test:e2e` | 26 tests: 10 passed, 16 failed | Ban dau co 2 timeout FR-03 do locator/dialog handling; da sua script roi chay lai. |
| RUN-002 | 2026-07-04 09:29 UTC | `localhost:3000` | `127.0.0.1:5173` | `127.0.0.1:5174` | `npm run test:e2e` | 26 tests: 10 passed, 16 failed | Run tong hop cuoi. Evidence nam trong `playwright-report/` va `test-results/`. |

## 2. Ket qua theo feature

| Feature | Total | Passed | Failed | Ghi chu |
|---|---:|---:|---:|---|
| FR-03 Forgot password/reset password | 8 | 3 | 5 | Fail ve OTP 4 so, email input type, password regex, confirm password, step indicator |
| FR-07 Shopping cart | 8 | 3 | 5 | Fail ve duplicate product, confirm xoa, total label, empty illustration, +/- quantity |
| FR-16 Product import CSV | 10 | 4 | 6 | Fail ve rollback, invalid price, RFC 4180 quoted comma, header-only feedback |
| Tong | 26 | 10 | 16 | UI-first Domain Testing |

## 3. Mapping test fail sang bug

| Test case / Playwright title | Result | Bug ID | Action |
|---|---|---|---|
| FR03-DT-001/FR03-BVA-002: UI should show a 6-digit OTP for registered email | Failed | BUG-FR03-001 | Confirmed, tao issue |
| FR03-DT-003: email field should use HTML5 email validation | Failed | BUG-FR03-002 | Confirmed, tao issue |
| FR03-BVA-005: UI should accept an 8-character strong password format before checking OTP | Failed | BUG-FR03-003 | Confirmed, tao issue |
| FR03-DT-007: reset UI should include confirm new password field | Failed | BUG-FR03-004 | Confirmed, tao issue |
| FR03-UI-001: forgot password UI should show a clear step indicator | Failed | BUG-FR03-005 | Confirmed, tao issue |
| FR07-DT-002: adding the same product twice should merge into one row and increase quantity | Failed | BUG-FR07-001 | Confirmed, tao issue |
| FR07-DT-004/FR07-DT-005: removing product should require a confirmation dialog | Failed | BUG-FR07-002 | Confirmed, tao issue |
| FR07-DT-008: cart total label should be 'Tong cong' | Failed | BUG-FR07-003 | Confirmed, tao issue |
| FR07-DT-006/FR07-BVA-005: empty cart should show message and illustration | Failed | BUG-FR07-004 | Confirmed, tao issue |
| FR07-BVA-001/FR07-BVA-003: cart should provide +/- controls for quantity boundaries | Failed | BUG-FR07-005 | Confirmed, tao issue |
| FR16-DT-004/FR16-BVA-007: admin UI should reject empty product name and rollback | Failed | BUG-FR16-001 | Confirmed, tao issue |
| FR16-DT-005/FR16-BVA-004: admin UI should reject price = 0 | Failed | BUG-FR16-002 | Confirmed, tao issue |
| FR16-DT-006: admin UI should reject negative price | Failed | BUG-FR16-003 | Confirmed, tao issue |
| FR16-DT-007: admin UI should reject non-numeric price | Failed | BUG-FR16-004 | Confirmed, tao issue |
| FR16-DT-008: CSV parser should preserve comma inside quoted RFC 4180 field | Failed | BUG-FR16-005 | Confirmed, tao issue |
| FR16-BVA-001: header-only CSV should be rejected as empty data | Failed | BUG-FR16-006 | Confirmed, tao issue |

## 4. Passed / rejected candidate notes

| Test case | Result | Ghi chu |
|---|---|---|
| FR03-DT-002 | Passed | UI reject email khong ton tai va o lai step request OTP |
| FR03-DT-006/FR03-BVA-004 | Passed | UI reject mat khau yeu bang alert |
| FR03-UI-002 | Passed | Co duong quay ve dang nhap thong qua header/navigation |
| FR07-DT-001/FR07-BVA-006 | Passed | Them mot san pham tao mot dong quantity 1 |
| FR07-DT-003/FR07-BVA-007 | Passed | Them hai san pham khac nhau tao hai dong |
| FR07-DT-007 | Passed | Link tiep tuc mua sam quay ve home |
| FR16-DT-001/FR16-BVA-002 | Passed | CSV hop le 1 dong import thanh cong |
| FR16-DT-002 | Passed | UI reject file `.txt` |
| FR16-DT-003 | Passed | UI reject CSV thieu header `price` |
| FR16-DT-010 | Passed | Result import co success count va error reason |

## 5. Lenh nen chay lai

Chay tat ca tests:

```bash
npm run test:e2e
```

Chay rieng tung feature:

```bash
npx playwright test tests/fr03-forgot-password.spec.js
npx playwright test tests/fr07-shopping-cart.spec.js
npx playwright test tests/fr16-product-import.spec.js
```

Mo report HTML:

```bash
npx playwright show-report
```

## 6. Ghi chu ve localStorage va reload

- FR-07 gio hang trong web UI dung state/localStorage nen test khong reload trang giua hai lan them cung mot san pham.
- Helper `addFirstProductFromHome(page, { navigate: false })` duoc dung de giu context trinh duyet khi can kiem thu tich luy state.
- Neu can lam sach gio hang, dung browser context moi cua Playwright cho moi test thay vi xoa truc tiep localStorage bang API/backend.
