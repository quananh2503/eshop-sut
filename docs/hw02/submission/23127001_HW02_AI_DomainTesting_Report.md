# Báo cáo HW02 - Domain Testing trên EShop

## 1. Thông tin chung

| Mục | Nội dung |
|---|---|
| Họ tên sinh viên | Nguyễn Lê Quan Anh |
| MSSV | 23127001 |
| Lớp | 23KTPM2 |
| Nhóm | 07 |
| Giảng viên | Lâm Quang Vũ |
| Môn học | CS423 / CSC15003 - Kiểm chứng Phần mềm |
| Mã bài tập | HW02-AI |
| Tên bài tập | Domain Testing on EShop |
| SUT | EShop |
| Repository cá nhân | https://github.com/quananh2503/eshop-sut.git |
| Branch thực hiện | `hw02-member1-domain-testing` |

## 2. Phạm vi bài làm

Theo phân công của nhóm, em là Member 1 và thực hiện các feature sau:

| Pool | Feature | Nền tảng | Trạng thái thực hiện |
|---|---|---|---|
| Pool A | FR-03 - Forgot password and password reset | Web | Đã thiết kế Domain/BVA, đã tự động hóa bằng Playwright |
| Pool B | FR-07 - Shopping cart | Web | Đã thiết kế Domain/BVA, đã tự động hóa bằng Playwright |
| Pool C | FR-16 - Product import from CSV | Admin Web | Đã thiết kế Domain/BVA, đã tự động hóa bằng Playwright |
| Pool D | FR-04mb - Personal profile management | Mobile | Đã phân tích Domain/BVA và kiểm thử thủ công trên iPhone bằng Expo Go |

Bài làm tập trung theo hướng UI-first Domain Testing. Backend chỉ được dùng để hỗ trợ giao diện chạy đúng luồng, không dùng API/backend làm nguồn kết luận bug chính. Nếu UI không có chức năng hoặc không thể hiện đúng yêu cầu đặc tả, test được xem là fail theo đúng phạm vi kiểm thử giao diện.

## 3. Phương pháp kiểm thử

### 3.0 Cập nhật theo phần hỏi đáp của giảng viên

Theo phần hỏi đáp trên lớp, bài làm cần thể hiện rõ quá trình làm việc qua Git, số lượng/chất lượng test case, cách áp dụng kỹ thuật Domain Testing và Boundary Value Analysis, đồng thời tổ chức file để giảng viên và công cụ AI có thể scan dễ dàng. Vì vậy, em bổ sung các điểm sau vào bài nộp:

- Toàn bộ quá trình làm việc được commit nhiều lần trên branch `hw02-member1-domain-testing`, không gom thành một commit cuối.
- Report, AI gap/critique, AI Audit Report, test cases, bug tracker và evidence đều được tổ chức bằng Markdown/PDF hoặc thư mục rõ ràng.
- Bổ sung Requirements Traceability Matrix và Coverage Summary tại `docs/hw02/traceability-matrix.md`.
- Test case chỉ bao gồm phần em phụ trách theo phân công Member 1, không trộn test case của thành viên khác.
- Báo cáo chính tập trung trình bày cách áp dụng Domain Testing/BVA để sinh test case, kết quả chạy test và bug evidence.

### 3.1 Domain Testing

Với mỗi feature, em thực hiện các bước:

1. Đọc đặc tả trong `README.md`, `api_specification.md` và tài liệu yêu cầu HW02.
2. Xác định các biến đầu vào quan trọng.
3. Chia miền đầu vào thành các lớp tương đương hợp lệ và không hợp lệ.
4. Thiết kế test case đại diện cho từng lớp.
5. Đối chiếu kết quả thực tế với đặc tả, không lấy hành vi hiện tại của code làm chuẩn.

### 3.2 Boundary Value Analysis

Với các input có biên rõ ràng, em chọn các giá trị tại biên và sát biên như `min - 1`, `min`, `min + 1`. Với các trường không có biên số học rõ, em dùng các biên nghiệp vụ như rỗng/không rỗng, 0 dòng/1 dòng/2 dòng, file đúng định dạng/file sai định dạng, hoặc trạng thái giỏ hàng 0/1/2 sản phẩm.

### 3.3 Tự động hóa bằng Playwright

Các test tự động được viết trong repository cá nhân:

- `tests/fr03-forgot-password.spec.js`
- `tests/fr07-shopping-cart.spec.js`
- `tests/fr16-product-import.spec.js`
- `tests/helpers/ui.js`
- `tests/fixtures/csv/`

Lệnh chạy:

```bash
npm run test:e2e
```

Kết quả và bằng chứng:

- Test execution notes: `docs/hw02/test-execution-notes.md`
- Bug tracker: `docs/hw02/bug-tracker.md`
- Screenshot evidence: `docs/hw02/evidence/`
- Playwright report: `playwright-report/index.html`

## 4. Feature FR-03 - Forgot password and password reset

### 4.1 Mô tả feature

FR-03 là chức năng quên mật khẩu gồm hai bước. Người dùng nhập email đã đăng ký để lấy OTP, sau đó nhập OTP, mật khẩu mới và xác nhận mật khẩu mới để đặt lại mật khẩu. Theo đặc tả, OTP trong môi trường demo phải có 6 chữ số, mật khẩu mới phải thỏa điều kiện tối thiểu 8 ký tự, có chữ hoa, chữ thường, chữ số và ký tự đặc biệt.

### 4.2 Miền đầu vào

| Biến | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|
| Email | Email đã đăng ký, đúng định dạng | Rỗng, sai định dạng, chưa đăng ký |
| OTP | 6 chữ số, đúng với email vừa yêu cầu | Rỗng, sai OTP, khác 6 chữ số, OTP của email khác |
| Mật khẩu mới | Tối thiểu 8 ký tự, đủ chữ hoa/thường/số/ký tự đặc biệt | Rỗng, dưới 8 ký tự, thiếu nhóm ký tự |
| Xác nhận mật khẩu | Khớp mật khẩu mới | Rỗng, không khớp |
| Trạng thái UI | Có chỉ báo bước và đường quay lại đăng nhập | Thiếu step indicator hoặc điều hướng |

### 4.3 Boundary Value Analysis

| Biên | Giá trị kiểm thử |
|---|---|
| Độ dài OTP | 5, 6, 7 chữ số |
| Độ dài mật khẩu | 7, 8, 9 ký tự |
| Nhóm ký tự mật khẩu | Thiếu chữ hoa, thiếu chữ thường, thiếu số, thiếu ký tự đặc biệt, đủ 4 nhóm |
| Email | Rỗng, sai định dạng, email tồn tại, email không tồn tại |

### 4.4 Kết quả thực thi

| Tổng test | Passed | Failed | Bugs confirmed |
|---:|---:|---:|---:|
| 8 | 3 | 5 | 5 |

### 4.5 Bug phát hiện

| Bug ID | Mô tả | Severity | Evidence |
|---|---|---|---|
| BUG-FR03-001 | OTP reset password chỉ có 4 chữ số thay vì 6 chữ số | High | `docs/hw02/evidence/BUG-FR03-001/screenshot.png` |
| BUG-FR03-002 | Email quên mật khẩu dùng `type=text`, không có HTML5 email validation | Medium | `docs/hw02/evidence/BUG-FR03-002/screenshot.png` |
| BUG-FR03-003 | Mật khẩu mạnh 8 ký tự có ký tự đặc biệt bị báo "Mật khẩu quá yếu" | High | `docs/hw02/evidence/BUG-FR03-003/screenshot.png` |
| BUG-FR03-004 | Form reset password thiếu trường xác nhận mật khẩu mới | High | `docs/hw02/evidence/BUG-FR03-004/screenshot.png` |
| BUG-FR03-005 | Giao diện thiếu step indicator cho quy trình 2 bước | Medium | `docs/hw02/evidence/BUG-FR03-005/screenshot.png` |

## 5. Feature FR-07 - Shopping cart

### 5.1 Mô tả feature

FR-07 kiểm thử giỏ hàng của người dùng. Chức năng chính gồm thêm sản phẩm vào giỏ, gộp sản phẩm trùng bằng cách tăng số lượng, hiển thị số lượng, thành tiền, tổng cộng, xóa sản phẩm có xác nhận, trạng thái giỏ hàng rỗng và điều hướng tiếp tục mua sắm.

### 5.2 Miền đầu vào

| Biến | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|
| Sản phẩm | Sản phẩm tồn tại trong danh sách | Sản phẩm không tồn tại/null |
| Quantity | Số nguyên dương, tối thiểu 1 | 0, số âm, chuỗi, số thập phân |
| Thêm sản phẩm trùng | Cùng product id | Tạo dòng mới thay vì tăng quantity |
| Xóa sản phẩm | Có confirm dialog | Xóa ngay không xác nhận |
| Empty cart | Có thông báo và hình minh họa | Thiếu thông báo hoặc thiếu hình |
| Tổng tiền | Nhãn "Tổng cộng" | Nhãn sai hoặc không hiển thị |

### 5.3 Boundary Value Analysis

| Biên | Giá trị kiểm thử |
|---|---|
| Quantity tối thiểu | 0, 1, 2 |
| Số lần thêm cùng sản phẩm | 1 lần, 2 lần, 3 lần |
| Số dòng trong giỏ | 0 sản phẩm, 1 sản phẩm, 2 sản phẩm |
| Xóa sản phẩm | Xác nhận xóa, hủy xóa |

### 5.4 Kết quả thực thi

| Tổng test | Passed | Failed | Bugs confirmed |
|---:|---:|---:|---:|
| 8 | 3 | 5 | 5 |

### 5.5 Bug phát hiện

| Bug ID | Mô tả | Severity | Evidence |
|---|---|---|---|
| BUG-FR07-001 | Thêm cùng một sản phẩm tạo 2 dòng thay vì gộp dòng và tăng quantity | High | `docs/hw02/evidence/BUG-FR07-001/screenshot.png` |
| BUG-FR07-002 | Xóa sản phẩm khỏi giỏ hàng không có confirm dialog | Medium | `docs/hw02/evidence/BUG-FR07-002/screenshot.png` |
| BUG-FR07-003 | Giỏ hàng không hiển thị nhãn tổng tiền theo spec "Tổng cộng" | Low | `docs/hw02/evidence/BUG-FR07-003/screenshot.png` |
| BUG-FR07-004 | Giỏ hàng rỗng thiếu hình minh họa | Low | `docs/hw02/evidence/BUG-FR07-004/screenshot.png` |
| BUG-FR07-005 | Giỏ hàng không có nút +/- để điều chỉnh quantity theo biên | Medium | `docs/hw02/evidence/BUG-FR07-005/screenshot.png` |

### 5.6 Ghi chú về localStorage

Giỏ hàng trên web UI có sử dụng state/localStorage. Vì vậy, khi kiểm thử việc thêm cùng một sản phẩm nhiều lần, test không reload trang giữa hai lần thêm. Playwright dùng browser context mới cho từng test để cô lập dữ liệu, nhưng vẫn giữ state trong cùng một test case khi cần kiểm thử tích lũy trạng thái.

## 6. Feature FR-16 - Product import from CSV

### 6.1 Mô tả feature

FR-16 là chức năng admin import sản phẩm từ CSV. Theo đặc tả, file phải có định dạng `.csv`, header bắt buộc gồm `name,price,description,imageUrl,category_id`, price phải là số dương, name không được rỗng, CSV phải hỗ trợ field có dấu phẩy trong dấu nháy kép theo RFC 4180 và import phải theo nguyên tắc all-or-nothing.

### 6.2 Miền đầu vào

| Biến | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|
| File extension | `.csv` | `.txt`, `.xlsx`, không chọn file |
| Header | Đủ `name,price,description,imageUrl,category_id` | Thiếu/sai header |
| Row count | Ít nhất 1 data row | File rỗng, chỉ có header |
| Name | Chuỗi không rỗng | Rỗng, chỉ khoảng trắng |
| Price | Số dương > 0 | 0, âm, chuỗi, rỗng |
| Description | Chuỗi, có thể có dấu phẩy nếu quote đúng | Parser cắt sai field |
| Transaction | Tất cả dòng hợp lệ | Có dòng lỗi nhưng vẫn import một phần |

### 6.3 Boundary Value Analysis

| Biên | Giá trị kiểm thử |
|---|---|
| Số dòng dữ liệu | 0 dòng, 1 dòng, 2 dòng |
| Price | -1, 0, 1 |
| Name length | Rỗng, 1 ký tự, chuỗi bình thường |
| File extension | `.csv`, `.txt` |
| Transaction | Batch toàn hợp lệ, batch có 1 dòng lỗi |

### 6.4 Kết quả thực thi

| Tổng test | Passed | Failed | Bugs confirmed |
|---:|---:|---:|---:|
| 10 | 4 | 6 | 6 |

### 6.5 Bug phát hiện

| Bug ID | Mô tả | Severity | Evidence |
|---|---|---|---|
| BUG-FR16-001 | Import CSV không rollback all-or-nothing khi batch có dòng thiếu tên | High | `docs/hw02/evidence/BUG-FR16-001/screenshot.png` |
| BUG-FR16-002 | Import product chấp nhận `price = 0` | High | `docs/hw02/evidence/BUG-FR16-002/screenshot.png` |
| BUG-FR16-003 | Import product chấp nhận `price < 0` | High | `docs/hw02/evidence/BUG-FR16-003/screenshot.png` |
| BUG-FR16-004 | Import product chấp nhận giá không phải số, ví dụ `abc` | High | `docs/hw02/evidence/BUG-FR16-004/screenshot.png` |
| BUG-FR16-005 | CSV parser không bảo toàn dấu phẩy trong field đặt trong dấu nháy kép RFC 4180 | Medium | `docs/hw02/evidence/BUG-FR16-005/screenshot.png` |
| BUG-FR16-006 | Header-only CSV không hiển thị lỗi "không có dữ liệu/0 dòng" rõ ràng | Medium | `docs/hw02/evidence/BUG-FR16-006/screenshot.png` |

## 7. Feature FR-04mb - Personal profile management

### 7.1 Mô tả feature

FR-04mb là chức năng quản lý hồ sơ cá nhân trên mobile. Người dùng đã đăng nhập có thể xem và cập nhật thông tin hồ sơ gồm email, họ tên, số điện thoại và địa chỉ giao hàng mặc định. Email không được phép chỉnh sửa qua giao diện; người dùng thường không được tự thay đổi `role`. Theo đặc tả, số điện thoại hợp lệ phải bắt đầu bằng `0` và có độ dài 10-11 chữ số.

Feature này thuộc frontend mobile React Native/Expo. Playwright không phù hợp trực tiếp để điều khiển native UI của Expo Go, nên em thực hiện kiểm thử thủ công trên iPhone bằng Expo Go, vẫn theo phương pháp Domain Testing và Boundary Value Analysis. Backend chỉ dùng để phục vụ UI mobile chạy được; kết luận pass/fail dựa trên hành vi UI và đặc tả.

### 7.2 Miền đầu vào

| Biến | Miền hợp lệ theo đặc tả | Miền không hợp lệ |
|---|---|---|
| Auth state | User đã đăng nhập | Chưa đăng nhập, logout/token không còn hiệu lực |
| Name | Chuỗi không rỗng, ví dụ `Test User` | Rỗng |
| Phone | Bắt đầu bằng `0`, 10-11 chữ số, ví dụ `0123456789`, `01234567890` | 9 chữ số, 12 chữ số, không bắt đầu bằng `0`, chứa chữ, chứa ký tự đặc biệt |
| Shipping address | Địa chỉ giao hàng hợp lệ; field có thể rỗng nếu đặc tả không bắt buộc | Giá trị không được lưu bền vững sau khi cập nhật |
| Email | Read-only, không sửa được qua UI | Cho phép sửa email trái spec |
| Role | Không hiển thị/chỉnh sửa qua UI | User tự sửa được role/quyền |

### 7.3 Boundary Value Analysis

| Biên | Giá trị kiểm thử |
|---|---|
| Độ dài số điện thoại | `012345678` - 9 chữ số; `0123456789` - 10 chữ số; `01234567890` - 11 chữ số; `012345678901` - 12 chữ số |
| Prefix số điện thoại | Bắt đầu bằng `0`; không bắt đầu bằng `0`, ví dụ `1123456789`, `987654321` |
| Ký tự trong phone | Toàn chữ số; chứa chữ `09abc45678`; chứa dấu gạch `091-234-5678` |
| Name | Rỗng; 1 ký tự `A`; tên bình thường |
| Address | Rỗng; địa chỉ hợp lệ; kiểm tra persistence sau logout/login |

### 7.4 Lưu ý về sai lệch giữa spec và implementation

Khi kiểm thử các field không phải phone như `Name` và `Shipping address`, em phải dùng một số điện thoại mà implementation hiện tại chấp nhận, ví dụ `912345678` hoặc `987654321`, để vượt qua validation UI. Các giá trị này không đúng đặc tả vì không bắt đầu bằng `0`. Sai lệch này không được xem là chuẩn nghiệp vụ, mà được ghi nhận riêng thành bug phone validation `BUG-FR04MB-002`.

### 7.5 Kết quả test thủ công trên iPhone

| Test ID | Mục tiêu | Dữ liệu chính | Expected | Actual | Status | Evidence |
|---|---|---|---|---|---|---|
| FR04MB-TC-001 | User đã đăng nhập xem được hồ sơ | `test@eshop.com` / `Test1234!` | Hiển thị `Hồ sơ của bạn` | Hiển thị profile với email, tên, phone, địa chỉ | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-001-profile-after-login.jpg` |
| FR04MB-TC-002 | Chưa đăng nhập không xem/sửa hồ sơ | Logout | Header về `Đăng nhập`, chỉ vào form login | Đúng như expected | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-002-logged-out-home.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-002-login-form-required.jpg` |
| FR04MB-TC-003 | Email read-only | `test@eshop.com` | Không sửa được email | Ô email disabled/màu xám, không mở bàn phím | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-003-email-readonly.jpg` |
| FR04MB-TC-004 | Cập nhật tên hợp lệ | `Nguyen Le Quan Anh Mobile` | Cập nhật thành công | Alert thành công, header hiển thị tên mới | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-004-name-valid-update.jpg` |
| FR04MB-TC-005 | Từ chối họ tên rỗng | Name rỗng | Báo lỗi, không cập nhật | App báo cập nhật thành công, header chỉ còn `Chào,` | FAIL | `docs/hw02/evidence/FR04mb/FR04MB-TC-005-name-empty-accepted.jpg` |
| FR04MB-TC-006 | Biên name 1 ký tự | `A` | Chấp nhận nếu spec chỉ yêu cầu non-empty | App báo cập nhật thành công | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-006-name-one-char.jpg` |
| FR04MB-TC-007 | Phone 9 chữ số dưới min | `012345678` | Từ chối | App báo lỗi phone không hợp lệ | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-007-phone-9digits-rejected.jpg` |
| FR04MB-TC-008 | Phone hợp lệ biên dưới | `0123456789` | Cập nhật thành công | App báo lỗi phone không hợp lệ | FAIL | `docs/hw02/evidence/FR04mb/FR04MB-TC-008-phone-10digits-valid-rejected.jpg` |
| FR04MB-TC-009 | Phone hợp lệ biên trên | `01234567890` | Cập nhật thành công | App báo lỗi phone không hợp lệ | FAIL | `docs/hw02/evidence/FR04mb/FR04MB-TC-009-phone-11digits-valid-rejected.jpg` |
| FR04MB-TC-010 | Phone 12 chữ số vượt max | `012345678901` | Từ chối | App báo lỗi phone không hợp lệ | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-010-phone-12digits-rejected.jpg` |
| FR04MB-TC-011 | Phone không bắt đầu bằng 0 | `1123456789` | Từ chối | App báo cập nhật thành công | FAIL | `docs/hw02/evidence/FR04mb/FR04MB-TC-011-phone-wrong-prefix-accepted.jpg` |
| FR04MB-TC-012 | Phone chứa chữ | `09abc45678` | Từ chối | App báo lỗi phone không hợp lệ | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-012-phone-letters-rejected.jpg` |
| FR04MB-TC-013 | Phone chứa ký tự đặc biệt | `091-234-5678` | Từ chối | App báo lỗi phone không hợp lệ | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-013-phone-special-chars-rejected.jpg` |
| FR04MB-TC-014 | Địa chỉ rỗng | Address rỗng | Chấp nhận nếu address optional | App cập nhật thành công | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-014-address-empty.jpg` |
| FR04MB-TC-015 | Cập nhật địa chỉ hợp lệ | `123 nguyễn trãi, quận 5, tphcm` | Báo thành công, địa chỉ hiển thị trong form | Đúng như expected | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-015-address-valid-success.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-015-address-valid-visible.jpg` |
| FR04MB-TC-016 | Địa chỉ phải lưu sau logout/login lại | Địa chỉ từ TC-015 | Địa chỉ vẫn còn | Địa chỉ bị mất, ô address trống | FAIL | `docs/hw02/evidence/FR04mb/FR04MB-TC-016-address-lost-after-login.jpg` |
| FR04MB-TC-017 | Không có field role | User thường | Không hiển thị role/admin/quyền | Form chỉ có email, name, phone, address | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-016-address-lost-after-login.jpg` |
| FR04MB-TC-018 | Logout xóa trạng thái user | Bấm `Thoát` | Header về `Đăng nhập`, không còn profile user | Đúng như expected | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-018-logout.jpg` |
| FR04MB-TC-019 | Có feedback khi cập nhật thành công | Name/phone/address được app chấp nhận | Có thông báo rõ ràng | App hiển thị alert `Thành công - Cập nhật thành công!` | PASS | `docs/hw02/evidence/FR04mb/FR04MB-TC-004-name-valid-update.jpg` |
| FR04MB-TC-020 | Backend unavailable | Tắt backend | App không treo, báo lỗi dễ hiểu | Chưa thực hiện để tránh gián đoạn test session | NOT EXECUTED | N/A |

### 7.6 Bug phát hiện trên FR-04mb

| Bug ID | Mô tả | Severity | Related test | Evidence |
|---|---|---|---|---|
| BUG-FR04MB-001 | Mobile từ chối số điện thoại hợp lệ bắt đầu bằng `0` ở biên 10 và 11 chữ số | High | FR04MB-TC-008, FR04MB-TC-009 | `docs/hw02/evidence/FR04mb/FR04MB-TC-008-phone-10digits-valid-rejected.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-009-phone-11digits-valid-rejected.jpg` |
| BUG-FR04MB-002 | Mobile chấp nhận số điện thoại không bắt đầu bằng `0` | High | FR04MB-TC-011, TC-014 hỗ trợ | `docs/hw02/evidence/FR04mb/FR04MB-TC-011-phone-wrong-prefix-accepted.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-014-address-empty.jpg` |
| BUG-FR04MB-003 | Địa chỉ giao hàng báo cập nhật thành công nhưng không được lưu sau logout/login lại | High | FR04MB-TC-015, FR04MB-TC-016 | `docs/hw02/evidence/FR04mb/FR04MB-TC-015-address-valid-visible.jpg`, `docs/hw02/evidence/FR04mb/FR04MB-TC-016-address-lost-after-login.jpg` |
| BUG-FR04MB-004 | Ứng dụng cho phép cập nhật hồ sơ với họ tên rỗng | Medium | FR04MB-TC-005 | `docs/hw02/evidence/FR04mb/FR04MB-TC-005-name-empty-accepted.jpg` |

Ghi chú: Thông báo lỗi phone của app ghi "9-10 chữ số", trong khi đặc tả yêu cầu 10-11 chữ số và bắt đầu bằng `0`. Điểm này được gom vào nhóm bug validation phone thay vì tách bug riêng.

## 8. Tổng hợp kết quả

| Feature | Test cases designed | Executed | Passed | Failed | Not executed | Bugs confirmed |
|---|---:|---:|---:|---:|---:|---:|
| FR-03 | 8 | 8 | 3 | 5 | 0 | 5 |
| FR-07 | 8 | 8 | 3 | 5 | 0 | 5 |
| FR-16 | 10 | 10 | 4 | 6 | 0 | 6 |
| FR-04mb | 20 | 19 | 14 | 5 | 1 | 4 |
| Tổng | 46 | 45 | 24 | 21 | 1 | 20 |

## 9. Requirements Traceability Matrix và Coverage

Để giúp việc chấm bài dễ scan hơn, em tách bảng traceability chi tiết thành file riêng:

```text
07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/traceability-matrix.md
```

Tóm tắt coverage:

| Feature | Miền đã bao phủ | Điểm mạnh | Điểm còn thiếu |
|---|---|---|---|
| FR-03 | Email, OTP, password policy, confirm password, step UI | Có cả happy path, invalid class và boundary password/OTP | Chưa kiểm thử hết mọi biến thể OTP như OTP của email khác |
| FR-07 | Add product, duplicate product, quantity boundary, remove, empty cart, total label | Bắt được nhiều lỗi UI quan trọng qua localStorage/state thực tế | Chưa kiểm thử quantity lớn 99/100/101 vì UI chưa có nút +/- |
| FR-16 | File type, header, row count, name, price, rollback, RFC 4180 | Bao phủ nhiều lớp invalid và phát hiện lỗi import dữ liệu nghiêm trọng | Chưa kiểm thử CSV rất lớn hoặc category_id không tồn tại |
| FR-04mb | Auth state, name, phone boundary, address persistence, email read-only, role, logout | Có manual evidence trên iPhone/Expo Go, phát hiện 4 bug quan trọng | Chưa thực hiện TC-020 backend unavailable |

Đánh giá hiện tại: bộ test bao phủ cả 4 feature được giao. Ba feature web/admin được chạy tự động bằng Playwright qua UI; feature mobile FR-04mb được chạy thủ công trên iPhone bằng Expo Go với ảnh minh chứng. Tổng cộng có 45 test đã thực thi và 20 bug confirmed/có evidence.

## 10. Danh sách bug confirmed

| Feature | Số bug | Bug IDs |
|---|---:|---|
| FR-03 | 5 | BUG-FR03-001 đến BUG-FR03-005 |
| FR-07 | 5 | BUG-FR07-001 đến BUG-FR07-005 |
| FR-16 | 6 | BUG-FR16-001 đến BUG-FR16-006 |
| FR-04mb | 4 | BUG-FR04MB-001 đến BUG-FR04MB-004 |

Chi tiết bug nằm trong `docs/hw02/bug-tracker.md`. Tất cả 20 bug đã được tạo GitHub Issues trên repository cá nhân, trạng thái trong bug tracker là `Reported`. Bảng tổng hợp issue và ảnh evidence nằm trong `docs/hw02/github-issues-summary.md`.

## 11. AI Critique

AI hỗ trợ tốt ở giai đoạn đọc yêu cầu, tách feature theo pool, gợi ý miền đầu vào, sinh khung test case và viết Playwright nhanh hơn so với làm thủ công từ đầu. Tuy nhiên, output ban đầu của AI vẫn cần kiểm tra rất kỹ. Một số test đầu tiên bị lệch so với thực tế UI, ví dụ locator ở form reset password bị sai do sau khi chuyển bước chỉ còn hai input, hoặc cách chờ `dialog` của Playwright gây timeout. AI cũng dễ đề xuất kiểm thử backend/API, trong khi phạm vi bài này cần ưu tiên UI-first Domain Testing. Sau khi rà soát, em chỉnh lại test để không kết luận bug trực tiếp từ API, bổ sung xử lý localStorage của giỏ hàng, và phân biệt rõ bug thật với lỗi script. Nhìn chung, AI phù hợp để tăng tốc phân tích và tạo bản nháp, nhưng người làm vẫn phải đối chiếu đặc tả, chạy test thật, xem screenshot/trace, và chịu trách nhiệm cuối cùng về kết luận bug.

## 12. AI Usage Declaration

Trong bài HW02 này, em có sử dụng Codex/ChatGPT để hỗ trợ:

- Phân tích yêu cầu bài tập và chính sách AI.
- Đọc cấu trúc EShop, README và API specification.
- Đề xuất chiến lược Domain Testing/BVA cho 4 feature được giao.
- Sinh bản nháp test case và Playwright automation cho FR-03, FR-07, FR-16.
- Hỗ trợ chạy Playwright, phân tích kết quả fail, cập nhật bug tracker và evidence.
- Hỗ trợ hướng dẫn chạy Expo Go, phân loại ảnh evidence manual và tổng hợp kết quả FR-04mb.
- Hỗ trợ soạn bản nháp báo cáo Markdown.

Các phần em đã trực tiếp rà soát/chỉnh sửa:

- Chọn phạm vi UI-first, không kết luận bug trực tiếp bằng backend/API.
- Sửa test Playwright bị sai locator/dialog.
- Kiểm tra lại kết quả pass/fail từ Playwright report.
- Xác nhận 16 bug web/admin dựa trên Playwright screenshot/error context và 4 bug mobile dựa trên ảnh manual test.
- Tự thực thi manual test FR-04mb trên iPhone, lưu ảnh evidence và xác nhận kết quả thực tế.
- Loại bỏ hoặc đánh dấu Rejected các candidate không tái hiện được.

Mandatory Disclosure:

> Báo cáo, test case, Playwright scripts và bug tracker này được sinh phiên bản đầu với sự hỗ trợ của Codex/ChatGPT; tôi đã rà soát và chỉnh sửa phần chiến lược UI-first, test locator/dialog, mapping test case sang bug, bổ sung edge cases cho localStorage/CSV/OTP/password/profile mobile; phần đánh giá kết quả và kết luận bug do tôi kiểm tra lại dựa trên Playwright evidence và ảnh manual test trên iPhone. AI Audit Report chi tiết được đính kèm trong `23127001_HW02_AI_Audit_Report.md/pdf`; prompt log được đính kèm trong `prompt_log.md`. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm.

## 13. Self-assessment

| Tiêu chí | Điểm tối đa | Tự đánh giá | Ghi chú |
|---|---:|---:|---|
| Pool A - FR-03 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 5 bug |
| Pool B - FR-07 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 5 bug |
| Pool C - FR-16 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 6 bug |
| Pool D - FR-04mb Domain + BVA | 15 | 14 | Có 20 test case, 19 test manual trên iPhone, phát hiện 4 bug |
| Agent/AI workflow | 10 | 8 | Có dùng AI có kiểm soát, prompt log, commit log, evidence |
| Tổng | 100 | 91 | Tự đánh giá đề xuất: 091 |

Tên file nộp đề xuất:

```text
23127001_HW02_AI_DomainTesting_091.zip
```

## 14. Phụ lục A - Đường dẫn artifact

| Artifact | Đường dẫn |
|---|---|
| Domain/BVA analysis | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/domain-bva-analysis.md` |
| Test cases | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/test-cases.md` |
| Requirements Traceability Matrix | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/traceability-matrix.md` |
| Test execution notes | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/test-execution-notes.md` |
| Bug tracker | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/bug-tracker.md` |
| Screenshot evidence | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/evidence/` |
| FR-04mb manual test cases | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/fr04mb-manual-test-cases.md` |
| FR-04mb mobile evidence | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/evidence/FR04mb/` |
| GitHub issue drafts | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/github-issues-draft.md` |
| GitHub issue summary | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/github-issues-summary.md` |
| AI Audit Report | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/submission/23127001_HW02_AI_Audit_Report.md` |
| AI Use Disclosure Form | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/submission/23127001_HW02_AI_Use_Disclosure_Form.md` |
| AI Privacy Checklist | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/submission/23127001_HW02_AI_Privacy_Checklist.md` |
| AI prompt log | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/submission/prompt_log.md` |
| Git commit log | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/submission/git_commit_log.txt` |

## 15. Phụ lục B - Git commit log

| Commit | Nội dung |
|---|---|
| `7954cc7` | Cấu hình Playwright và hướng dẫn chạy EShop |
| `81b4f40` | Thiết kế Domain/BVA cho 4 feature |
| `d5762bb` | Thêm Playwright tests cho FR-03, FR-07, FR-16 |
| `1f0431c` | Thêm hướng dẫn chạy Playwright tests |
| `d66ec79` | Thêm bug tracker và mẫu issue |
| `5cf043e` | Chuyển Playwright sang kiểm thử UI-first |
| `95a5bb7` | Tránh reload làm mất state giỏ hàng |
| `e17b621` | Cập nhật evidence bug từ Playwright |
| `97671a7` | Tạo draft issue cho bug đã xác nhận |
| `4dc1bd1` | Thêm screenshot evidence cho bug |
| `adac53d` | Bổ sung traceability và report nộp bài |
| `8c80b10` | Bổ sung báo cáo manual test FR04mb |
| `b56db28` | Tổng hợp GitHub Issues và evidence bug |

## 16. Kết luận

Bài làm đã áp dụng Domain Testing và Boundary Value Analysis cho 4 feature được giao. Trong đó, 3 feature web/admin đã được tự động hóa bằng Playwright qua UI, chạy tổng cộng 26 test và xác nhận 16 bug có screenshot evidence. Feature mobile FR-04mb được kiểm thử thủ công trên iPhone bằng Expo Go, thực thi 19/20 test và xác nhận thêm 4 bug. Tổng cộng bài làm có 45 test đã chạy và 20 bug confirmed. Qua bài này, em nhận thấy Domain Testing giúp phát hiện lỗi rõ ràng ở các miền invalid và boundary như OTP length, password policy, duplicate cart item, invalid price, rollback CSV import, phone boundary trên mobile và persistence của địa chỉ giao hàng.
