# HW02 - GitHub Issue Drafts

Dung cac draft nay de tao GitHub Issues tren fork ca nhan: https://github.com/quananh2503/eshop-sut/issues

Moi issue nen gan label: `bug`, `hw02`, `domain-testing`, va feature tuong ung (`FR-03`, `FR-07`, `FR-16`).

## BUG-FR03-001 - OTP reset password chi co 4 chu so thay vi 6 chu so

**Feature:** FR-03 Forgot password and password reset

**Severity:** High

**Related test:** `FR03-DT-001/FR03-BVA-002`

**Steps to reproduce:**
1. Mo web UI tai `/forgot-password`.
2. Nhap email hop le `test@eshop.com`.
3. Bam `Lay ma OTP`.

**Expected:** UI hien OTP dung do dai 6 chu so.

**Actual:** UI hien OTP 4 chu so, vi du `7379`.

**Evidence:** `test-results/fr03-forgot-password-FR-03-c1abc-it-OTP-for-registered-email-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR03-002 - Email quen mat khau khong dung HTML5 email validation

**Feature:** FR-03 Forgot password and password reset

**Severity:** Medium

**Related test:** `FR03-DT-003`

**Steps to reproduce:**
1. Mo web UI tai `/forgot-password`.
2. Kiem tra input email.

**Expected:** Input email co `type=email`.

**Actual:** Input email dang la `type=text`.

**Evidence:** `test-results/fr03-forgot-password-FR-03-61417--use-HTML5-email-validation-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR03-003 - Mat khau manh 8 ky tu bi bao yeu

**Feature:** FR-03 Forgot password and password reset

**Severity:** High

**Related test:** `FR03-BVA-005`

**Steps to reproduce:**
1. Mo `/forgot-password`, lay OTP cho `test@eshop.com`.
2. Nhap OTP sai bat ky, vi du `000000`.
3. Nhap password `Aa1!aaaa`.
4. Bam `Dat lai mat khau`.

**Expected:** Password format hop le di tiep den buoc validate OTP.

**Actual:** UI bao `Mat khau qua yeu`.

**Evidence:** `test-results/fr03-forgot-password-FR-03-78e7a--format-before-checking-OTP-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR03-004 - Form reset password thieu confirm password

**Feature:** FR-03 Forgot password and password reset

**Severity:** High

**Related test:** `FR03-DT-007`

**Steps to reproduce:**
1. Mo `/forgot-password`.
2. Lay OTP cho email hop le.
3. Quan sat form reset password.

**Expected:** Co field `Xac nhan mat khau moi`.

**Actual:** Chi co field OTP va `Mat khau moi`.

**Evidence:** `test-results/fr03-forgot-password-FR-03-8a85f--confirm-new-password-field-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR03-005 - UI quen mat khau thieu step indicator

**Feature:** FR-03 Forgot password and password reset

**Severity:** Medium

**Related test:** `FR03-UI-001`

**Steps to reproduce:**
1. Mo `/forgot-password`.
2. Quan sat trang quen mat khau.

**Expected:** UI hien ro dang o buoc nao cua quy trinh 2 buoc, vi du `Buoc 1/2`.

**Actual:** Khong co step indicator.

**Evidence:** `test-results/fr03-forgot-password-FR-03-2dfd8-show-a-clear-step-indicator-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR07-001 - Them trung san pham tao dong moi

**Feature:** FR-07 Shopping cart

**Severity:** High

**Related test:** `FR07-DT-002`

**Steps to reproduce:**
1. Mo trang danh sach san pham.
2. Bam `Them vao gio` cho cung mot san pham 2 lan.
3. Mo gio hang.

**Expected:** Gio hang co 1 dong, quantity = 2.

**Actual:** Gio hang co 2 dong rieng cho cung san pham.

**Evidence:** `test-results/fr07-shopping-cart-FR-07-S-88148-e-row-and-increase-quantity-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR07-002 - Xoa gio hang khong co confirm dialog

**Feature:** FR-07 Shopping cart

**Severity:** Medium

**Related test:** `FR07-DT-004/FR07-DT-005`

**Steps to reproduce:**
1. Them mot san pham vao gio.
2. Mo gio hang.
3. Bam `Xoa`.

**Expected:** Co confirmation dialog truoc khi xoa.

**Actual:** San pham bi xoa ngay, khong hoi xac nhan.

**Evidence:** `test-results/fr07-shopping-cart-FR-07-S-89ff0-quire-a-confirmation-dialog-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR07-003 - Gio hang khong hien label Tong cong

**Feature:** FR-07 Shopping cart

**Severity:** Low

**Related test:** `FR07-DT-008`

**Steps to reproduce:**
1. Them san pham vao gio.
2. Mo gio hang.
3. Quan sat phan tong tien.

**Expected:** Label tong tien la `Tong cong`.

**Actual:** Khong tim thay label `Tong cong`.

**Evidence:** `test-results/fr07-shopping-cart-FR-07-S-ecc6c--label-should-be-Tổng-cộng--chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR07-004 - Gio hang rong thieu hinh minh hoa

**Feature:** FR-07 Shopping cart

**Severity:** Low

**Related test:** `FR07-DT-006/FR07-BVA-005`

**Steps to reproduce:**
1. Mo `/cart` khi chua co san pham.
2. Quan sat empty state.

**Expected:** Co message va hinh minh hoa cho gio hang rong.

**Actual:** Co message nhung khong co hinh minh hoa.

**Evidence:** `test-results/fr07-shopping-cart-FR-07-S-f5cfc-ow-message-and-illustration-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR07-005 - Gio hang khong co nut +/- quantity

**Feature:** FR-07 Shopping cart

**Severity:** Medium

**Related test:** `FR07-BVA-001/FR07-BVA-003`

**Steps to reproduce:**
1. Them san pham vao gio.
2. Mo gio hang.
3. Tim control tang/giam quantity.

**Expected:** Co nut `+` va `-` de kiem soat quantity theo boundary.

**Actual:** Khong co nut `+`/`-`.

**Evidence:** `test-results/fr07-shopping-cart-FR-07-S-4782a-ols-for-quantity-boundaries-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-001 - Import CSV khong rollback khi batch co dong loi

**Feature:** FR-16 Product import from CSV

**Severity:** High

**Related test:** `FR16-DT-004/FR16-BVA-007`

**Steps to reproduce:**
1. Mo admin UI, vao `San pham`.
2. Upload CSV co 1 dong hop le va 1 dong thieu name.
3. Bam import.

**Expected:** Batch bi reject toan bo, ket qua `0/2`.

**Actual:** UI bao `1/2 san pham duoc them`.

**Evidence:** `test-results/fr16-product-import-FR-16--561b1-y-product-name-and-rollback-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-002 - Import chap nhan price = 0

**Feature:** FR-16 Product import from CSV

**Severity:** High

**Related test:** `FR16-DT-005/FR16-BVA-004`

**Expected:** San pham co `price = 0` bi reject.

**Actual:** UI import thanh cong `1/1`.

**Evidence:** `test-results/fr16-product-import-FR-16--7b666-in-UI-should-reject-price-0-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-003 - Import chap nhan price am

**Feature:** FR-16 Product import from CSV

**Severity:** High

**Related test:** `FR16-DT-006`

**Expected:** San pham co `price < 0` bi reject.

**Actual:** UI import thanh cong `1/1`.

**Evidence:** `test-results/fr16-product-import-FR-16--c36dc-hould-reject-negative-price-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-004 - Import chap nhan gia khong phai so

**Feature:** FR-16 Product import from CSV

**Severity:** High

**Related test:** `FR16-DT-007`

**Expected:** San pham co price `abc` bi reject.

**Actual:** UI import thanh cong `1/1`.

**Evidence:** `test-results/fr16-product-import-FR-16--90a58-ld-reject-non-numeric-price-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-005 - CSV parser lam mat dau phay trong quoted field

**Feature:** FR-16 Product import from CSV

**Severity:** Medium

**Related test:** `FR16-DT-008`

**Expected:** Field `"Description has, a comma"` duoc parse thanh `Description has, a comma`.

**Actual:** Preview hien `"Description hasa comma"`, dau phay khong duoc bao toan dung RFC 4180.

**Evidence:** `test-results/fr16-product-import-FR-16--96b5e-nside-quoted-RFC-4180-field-chromium/`

**Re-run:** `npm run test:e2e`

## BUG-FR16-006 - Header-only CSV khong hien loi empty data

**Feature:** FR-16 Product import from CSV

**Severity:** Medium

**Related test:** `FR16-BVA-001`

**Expected:** CSV chi co header phai hien loi ro rang `khong co du lieu/0 dong`.

**Actual:** UI chi disable nut `Import 0 san pham`, khong hien thong bao loi ro rang.

**Evidence:** `test-results/fr16-product-import-FR-16--f1ae0-d-be-rejected-as-empty-data-chromium/`

**Re-run:** `npm run test:e2e`
