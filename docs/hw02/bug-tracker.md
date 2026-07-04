# HW02 - Bug Tracker

Sinh vien: Nguyen Le Quan Anh - 23127001 - 23KTPM2

Pham vi hien tai: UI-first Domain Testing bang Playwright cho FR-03, FR-07, FR-16. Backend chi duoc dung de ho tro UI chay, khong ket luan bug truc tiep bang API.

## 1. Quy uoc trang thai bug

| Trang thai | Y nghia |
|---|---|
| `Candidate` | Moi phat hien, can chay lai/doi chieu spec |
| `Confirmed` | Da tai hien bang Playwright hoac evidence manual ro rang |
| `Reported` | Da tao GitHub Issue va co link |
| `Rejected` | Khong phai bug SUT hoac khong tai hien duoc |
| `Fixed` | Da co ban sua |
| `Retested` | Da test lai sau khi fix |

## 2. Bug confirmed tu Playwright

| Bug ID | Feature | Related test case(s) | Title | Severity | Status | Evidence | GitHub Issue |
|---|---|---|---|---|---|---|---|
| BUG-FR03-001 | FR-03 | FR03-DT-001, FR03-BVA-002 | OTP reset password chi co 4 chu so thay vi 6 chu so | High | Confirmed | `test-results/fr03-forgot-password-FR-03-c1abc-it-OTP-for-registered-email-chromium/` | Pending |
| BUG-FR03-002 | FR-03 | FR03-DT-003 | Email quen mat khau dung `type=text`, khong co HTML5 email validation | Medium | Confirmed | `test-results/fr03-forgot-password-FR-03-61417--use-HTML5-email-validation-chromium/` | Pending |
| BUG-FR03-003 | FR-03 | FR03-BVA-005 | Mat khau manh 8 ky tu co ky tu dac biet bi bao "Mat khau qua yeu" | High | Confirmed | `test-results/fr03-forgot-password-FR-03-78e7a--format-before-checking-OTP-chromium/` | Pending |
| BUG-FR03-004 | FR-03 | FR03-DT-007 | Form reset password thieu truong xac nhan mat khau moi | High | Confirmed | `test-results/fr03-forgot-password-FR-03-8a85f--confirm-new-password-field-chromium/` | Pending |
| BUG-FR03-005 | FR-03 | FR03-UI-001 | Giao dien quen mat khau thieu step indicator cho quy trinh 2 buoc | Medium | Confirmed | `test-results/fr03-forgot-password-FR-03-2dfd8-show-a-clear-step-indicator-chromium/` | Pending |
| BUG-FR07-001 | FR-07 | FR07-DT-002 | Them cung mot san pham tao 2 dong thay vi gop dong va tang quantity | High | Confirmed | `test-results/fr07-shopping-cart-FR-07-S-88148-e-row-and-increase-quantity-chromium/` | Pending |
| BUG-FR07-002 | FR-07 | FR07-DT-004, FR07-DT-005 | Xoa san pham khoi gio hang khong co confirm dialog | Medium | Confirmed | `test-results/fr07-shopping-cart-FR-07-S-89ff0-quire-a-confirmation-dialog-chromium/` | Pending |
| BUG-FR07-003 | FR-07 | FR07-DT-008 | Gio hang khong hien label tong tien theo spec "Tong cong" | Low | Confirmed | `test-results/fr07-shopping-cart-FR-07-S-ecc6c--label-should-be-Tổng-cộng--chromium/` | Pending |
| BUG-FR07-004 | FR-07 | FR07-DT-006, FR07-BVA-005 | Gio hang rong thieu hinh minh hoa | Low | Confirmed | `test-results/fr07-shopping-cart-FR-07-S-f5cfc-ow-message-and-illustration-chromium/` | Pending |
| BUG-FR07-005 | FR-07 | FR07-BVA-001, FR07-BVA-003 | Gio hang khong co nut +/- de dieu chinh quantity theo bien | Medium | Confirmed | `test-results/fr07-shopping-cart-FR-07-S-4782a-ols-for-quantity-boundaries-chromium/` | Pending |
| BUG-FR16-001 | FR-16 | FR16-DT-004, FR16-BVA-007 | Import CSV khong rollback all-or-nothing khi batch co dong thieu ten | High | Confirmed | `test-results/fr16-product-import-FR-16--561b1-y-product-name-and-rollback-chromium/` | Pending |
| BUG-FR16-002 | FR-16 | FR16-DT-005, FR16-BVA-004 | Import product chap nhan `price = 0` | High | Confirmed | `test-results/fr16-product-import-FR-16--7b666-in-UI-should-reject-price-0-chromium/` | Pending |
| BUG-FR16-003 | FR-16 | FR16-DT-006 | Import product chap nhan `price < 0` | High | Confirmed | `test-results/fr16-product-import-FR-16--c36dc-hould-reject-negative-price-chromium/` | Pending |
| BUG-FR16-004 | FR-16 | FR16-DT-007 | Import product chap nhan gia khong phai so (`abc`) | High | Confirmed | `test-results/fr16-product-import-FR-16--90a58-ld-reject-non-numeric-price-chromium/` | Pending |
| BUG-FR16-005 | FR-16 | FR16-DT-008 | CSV parser khong bao toan dau phay trong field dat trong dau nhay kep RFC 4180 | Medium | Confirmed | `test-results/fr16-product-import-FR-16--96b5e-nside-quoted-RFC-4180-field-chromium/` | Pending |
| BUG-FR16-006 | FR-16 | FR16-BVA-001 | Header-only CSV khong hien loi "khong co du lieu/0 dong" ro rang | Medium | Confirmed | `test-results/fr16-product-import-FR-16--f1ae0-d-be-rejected-as-empty-data-chromium/` | Pending |

## 3. Candidate / Rejected

| Bug ID | Feature | Related test case(s) | Title | Severity | Status | Evidence / Reason | GitHub Issue |
|---|---|---|---|---|---|---|---|
| BUG-FR03-R01 | FR-03 | FR03-DT-006, FR03-BVA-004 | Reset password khong reject mat khau yeu | High | Rejected | Playwright pass: UI co alert "Mat khau qua yeu" | N/A |
| BUG-FR03-R02 | FR-03 | FR03-UI-002 | Buoc 1 thieu nut quay lai dang nhap | Low | Rejected | Playwright pass: header/nav co link dang nhap | N/A |
| BUG-FR16-R01 | FR-16 | FR16-DT-002 | Admin import chap nhan file khong phai `.csv` | Medium | Rejected | Playwright pass: UI reject file `.txt` | N/A |
| BUG-FR16-R02 | FR-16 | FR16-DT-003 | Admin import chap nhan CSV thieu header bat buoc | Medium | Rejected | Playwright pass: UI reject missing `price` header | N/A |
| BUG-FR04MB-001 | FR-04mb | FR04MB-DT-003, FR04MB-BVA-002 | Mobile profile can duoc kiem thu manual/code evidence rieng | TBD | Candidate | Chua chay mobile UI automation trong buoc nay | Pending |

## 4. Ghi chu evidence

- Report HTML tong hop: `playwright-report/index.html`.
- JSON ket qua tong hop: `test-results/playwright-results.json`.
- Moi thu muc evidence trong `test-results/...` gom `test-failed-1.png`, `video.webm`, `trace.zip`, va `error-context.md`.
- Khi tao GitHub Issue, copy title tu tracker, dan path evidence va ghi reproduction command: `npm run test:e2e`.
