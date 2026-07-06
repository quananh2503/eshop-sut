# HW02 - Requirements Traceability Matrix và Coverage

Sinh viên: Nguyễn Lê Quan Anh - 23127001 - 23KTPM2

## 1. Mục tiêu

Tài liệu này liên kết giữa feature requirement, miền kiểm thử, test case, test automation và bug evidence. Mục tiêu là giúp giảng viên hoặc công cụ AI chấm bài có thể scan nhanh:

- Feature nào đã được chọn.
- Domain/BVA nào đã được áp dụng.
- Test case nào đã được thiết kế và thực thi.
- Test case fail sinh ra bug nào.
- Evidence nằm ở đâu.

## 2. Traceability Matrix

| Feature | Requirement / miền kiểm thử | Test case đại diện | Automation | Kết quả | Bug ID | Evidence |
|---|---|---|---|---|---|---|
| FR-03 | Email đã đăng ký sinh OTP | FR03-DT-001, FR03-BVA-002 | `tests/fr03-forgot-password.spec.js` | Failed | BUG-FR03-001 | `docs/hw02/evidence/BUG-FR03-001/screenshot.png` |
| FR-03 | Email chưa đăng ký bị từ chối | FR03-DT-002 | `tests/fr03-forgot-password.spec.js` | Passed | N/A | Playwright report |
| FR-03 | Email input phải có HTML5 validation | FR03-DT-003 | `tests/fr03-forgot-password.spec.js` | Failed | BUG-FR03-002 | `docs/hw02/evidence/BUG-FR03-002/screenshot.png` |
| FR-03 | Mật khẩu yếu bị từ chối | FR03-DT-006, FR03-BVA-004 | `tests/fr03-forgot-password.spec.js` | Passed | N/A | Playwright report |
| FR-03 | Mật khẩu mạnh 8 ký tự hợp lệ | FR03-BVA-005 | `tests/fr03-forgot-password.spec.js` | Failed | BUG-FR03-003 | `docs/hw02/evidence/BUG-FR03-003/screenshot.png` |
| FR-03 | Form reset có confirm password | FR03-DT-007 | `tests/fr03-forgot-password.spec.js` | Failed | BUG-FR03-004 | `docs/hw02/evidence/BUG-FR03-004/screenshot.png` |
| FR-03 | Có step indicator cho luồng 2 bước | FR03-UI-001 | `tests/fr03-forgot-password.spec.js` | Failed | BUG-FR03-005 | `docs/hw02/evidence/BUG-FR03-005/screenshot.png` |
| FR-03 | Có đường quay lại đăng nhập | FR03-UI-002 | `tests/fr03-forgot-password.spec.js` | Passed | N/A | Playwright report |
| FR-07 | Thêm 1 sản phẩm vào giỏ | FR07-DT-001, FR07-BVA-006 | `tests/fr07-shopping-cart.spec.js` | Passed | N/A | Playwright report |
| FR-07 | Thêm trùng sản phẩm phải tăng quantity | FR07-DT-002 | `tests/fr07-shopping-cart.spec.js` | Failed | BUG-FR07-001 | `docs/hw02/evidence/BUG-FR07-001/screenshot.png` |
| FR-07 | Thêm 2 sản phẩm khác nhau | FR07-DT-003, FR07-BVA-007 | `tests/fr07-shopping-cart.spec.js` | Passed | N/A | Playwright report |
| FR-07 | Xóa sản phẩm phải có confirm dialog | FR07-DT-004, FR07-DT-005 | `tests/fr07-shopping-cart.spec.js` | Failed | BUG-FR07-002 | `docs/hw02/evidence/BUG-FR07-002/screenshot.png` |
| FR-07 | Tổng tiền hiển thị nhãn "Tổng cộng" | FR07-DT-008 | `tests/fr07-shopping-cart.spec.js` | Failed | BUG-FR07-003 | `docs/hw02/evidence/BUG-FR07-003/screenshot.png` |
| FR-07 | Giỏ hàng rỗng có message và hình | FR07-DT-006, FR07-BVA-005 | `tests/fr07-shopping-cart.spec.js` | Failed | BUG-FR07-004 | `docs/hw02/evidence/BUG-FR07-004/screenshot.png` |
| FR-07 | Quantity có nút +/- tại biên | FR07-BVA-001, FR07-BVA-003 | `tests/fr07-shopping-cart.spec.js` | Failed | BUG-FR07-005 | `docs/hw02/evidence/BUG-FR07-005/screenshot.png` |
| FR-07 | Tiếp tục mua sắm quay về home | FR07-DT-007 | `tests/fr07-shopping-cart.spec.js` | Passed | N/A | Playwright report |
| FR-16 | CSV hợp lệ 1 dòng import thành công | FR16-DT-001, FR16-BVA-002 | `tests/fr16-product-import.spec.js` | Passed | N/A | Playwright report |
| FR-16 | File không phải CSV bị từ chối | FR16-DT-002 | `tests/fr16-product-import.spec.js` | Passed | N/A | Playwright report |
| FR-16 | CSV thiếu header bị từ chối | FR16-DT-003 | `tests/fr16-product-import.spec.js` | Passed | N/A | Playwright report |
| FR-16 | Batch có dòng thiếu name phải rollback | FR16-DT-004, FR16-BVA-007 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-001 | `docs/hw02/evidence/BUG-FR16-001/screenshot.png` |
| FR-16 | Price = 0 bị từ chối | FR16-DT-005, FR16-BVA-004 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-002 | `docs/hw02/evidence/BUG-FR16-002/screenshot.png` |
| FR-16 | Price âm bị từ chối | FR16-DT-006 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-003 | `docs/hw02/evidence/BUG-FR16-003/screenshot.png` |
| FR-16 | Price không phải số bị từ chối | FR16-DT-007 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-004 | `docs/hw02/evidence/BUG-FR16-004/screenshot.png` |
| FR-16 | Quoted comma theo RFC 4180 | FR16-DT-008 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-005 | `docs/hw02/evidence/BUG-FR16-005/screenshot.png` |
| FR-16 | Header-only CSV phải báo empty data | FR16-BVA-001 | `tests/fr16-product-import.spec.js` | Failed | BUG-FR16-006 | `docs/hw02/evidence/BUG-FR16-006/screenshot.png` |
| FR-16 | Result report có count và reason | FR16-DT-010 | `tests/fr16-product-import.spec.js` | Passed | N/A | Playwright report |
| FR-04mb | Profile auth state | FR04MB-TC-001, FR04MB-TC-002, FR04MB-TC-018 | Manual iPhone/Expo Go | Passed | N/A | `docs/hw02/evidence/FR04mb/FR04MB-TC-001-profile-after-login.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-018-logout.jpg` |
| FR-04mb | Email read-only | FR04MB-TC-003 | Manual iPhone/Expo Go | Passed | N/A | `docs/hw02/evidence/FR04mb/FR04MB-TC-003-email-readonly.jpg` |
| FR-04mb | Name normal/empty/boundary | FR04MB-TC-004, FR04MB-TC-005, FR04MB-TC-006 | Manual iPhone/Expo Go | Mixed | BUG-FR04MB-004 | `docs/hw02/evidence/FR04mb/FR04MB-TC-005-name-empty-accepted.jpg` |
| FR-04mb | Phone 10-11 số bắt đầu bằng 0 | FR04MB-TC-008, FR04MB-TC-009 | Manual iPhone/Expo Go | Failed | BUG-FR04MB-001 | `docs/hw02/evidence/FR04mb/FR04MB-TC-008-phone-10digits-valid-rejected.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-009-phone-11digits-valid-rejected.jpg` |
| FR-04mb | Phone dưới/vượt biên và ký tự không hợp lệ | FR04MB-TC-007, FR04MB-TC-010, FR04MB-TC-012, FR04MB-TC-013 | Manual iPhone/Expo Go | Passed | N/A | `docs/hw02/evidence/FR04mb/FR04MB-TC-007-phone-9digits-rejected.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-013-phone-special-chars-rejected.jpg` |
| FR-04mb | Phone không bắt đầu bằng 0 | FR04MB-TC-011, FR04MB-TC-014 | Manual iPhone/Expo Go | Failed | BUG-FR04MB-002 | `docs/hw02/evidence/FR04mb/FR04MB-TC-011-phone-wrong-prefix-accepted.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-014-address-empty.jpg` |
| FR-04mb | Address update và persistence | FR04MB-TC-015, FR04MB-TC-016 | Manual iPhone/Expo Go | Mixed | BUG-FR04MB-003 | `docs/hw02/evidence/FR04mb/FR04MB-TC-015-address-valid-visible.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-016-address-lost-after-login.jpg` |
| FR-04mb | Không cho user tự đổi role | FR04MB-TC-017 | Manual iPhone/Expo Go | Passed | N/A | `docs/hw02/evidence/FR04mb/FR04MB-TC-016-address-lost-after-login.jpg` |

## 3. Coverage Summary

| Feature | Designed | Automated/executed | Passed | Failed | Not executed | Bugs confirmed | Coverage note |
|---|---:|---:|---:|---:|---:|---:|---|
| FR-03 | 8 | 8 | 3 | 5 | 0 | 5 | Bao phủ email, OTP, password policy, confirm password, step UI |
| FR-07 | 8 | 8 | 3 | 5 | 0 | 5 | Bao phủ add, duplicate, empty cart, remove, total, quantity boundary |
| FR-16 | 10 | 10 | 4 | 6 | 0 | 6 | Bao phủ file type, header, row count, invalid price, rollback, RFC 4180 |
| FR-04mb | 20 | 19 | 14 | 5 | 1 | 4 | Manual test trên iPhone/Expo Go, bao phủ auth, email, name, phone, address, role, logout |
| Tổng | 46 | 45 | 24 | 21 | 1 | 20 | 3 feature web/admin có automation; FR-04mb có manual evidence |

## 4. Nhận xét chất lượng bộ test

- Bộ test hiện tại đủ tốt cho 3 feature web/admin vì có cả happy path, invalid classes và boundary values.
- Số bug confirmed là 16, có screenshot evidence theo từng bug.
- FR-04mb đã được bổ sung manual execution evidence trên iPhone/Expo Go, tuy chưa tự động hóa bằng mobile automation chuyên dụng.
- Điểm còn thiếu chính là TC-020 backend unavailable chưa thực hiện và chưa có Detox/Appium cho mobile.
