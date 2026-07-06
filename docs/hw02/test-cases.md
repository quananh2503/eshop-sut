# HW02 - Test Cases Final

Sinh viên: Nguyễn Lê Quan Anh - 23127001 - 23KTPM2

Phạm vi: Member 1 - FR-03, FR-07, FR-16, FR-04mb.

Ghi chú quan trọng:

- Cột `Design status` cho biết test case đã được thiết kế theo Domain Testing/BVA.
- Cột `Execution status` cho biết test case đã được chạy trực tiếp hoặc được bao phủ bởi một scenario Playwright/manual tương ứng.
- Một Playwright scenario có thể bao phủ nhiều test case thiết kế. Vì vậy số test case thiết kế lớn hơn số scenario thực thi trong Playwright report.
- Kết luận bug chỉ dựa trên UI evidence: Playwright screenshot với web/admin và ảnh chụp iPhone với mobile.

## 1. FR-03 - Forgot password and password reset

| ID | Kỹ thuật | Mục tiêu | Dữ liệu / lớp kiểm thử | Expected result | Execution status | Bug / Evidence |
|---|---|---|---|---|---|---|
| FR03-DT-001 | Domain | Lấy OTP với email đã đăng ký | `test@eshop.com` | Hệ thống tạo OTP hợp lệ và chuyển sang bước reset | Failed | BUG-FR03-001 |
| FR03-DT-002 | Domain | Từ chối email chưa đăng ký | `notfound@example.com` | Hiện lỗi phù hợp, không chuyển bước reset | Passed | N/A |
| FR03-DT-003 | Domain | Từ chối email sai format | `abc`, `abc@` | UI phải validate email sai format | Failed | BUG-FR03-002 |
| FR03-DT-004 | Domain | Reset thành công với OTP đúng và password mạnh | OTP đúng, `NewPass123!` | Reset thành công và quay về login | Designed, not executed separately | Bị giới hạn do bug OTP/password UI |
| FR03-DT-005 | Domain | Từ chối OTP sai | `000000` | Hiện lỗi OTP/email không hợp lệ | Designed, not executed separately | N/A |
| FR03-DT-006 | Domain | Từ chối password mới yếu | `weak` | Hiện lỗi password policy, không reset | Passed | Candidate BUG-FR03-R01 rejected |
| FR03-DT-007 | Domain | Từ chối confirm password không khớp | `NewPass123!` vs `Other123!` | UI phải có confirm password và validate mismatch | Failed | BUG-FR03-004 |
| FR03-DT-008 | Domain | OTP chỉ hợp lệ với email đã yêu cầu | OTP email A dùng cho email B | Reset bị từ chối | Designed, not executed separately | N/A |
| FR03-BVA-001 | BVA | OTP 5 chữ số | `12345` | Từ chối do dưới 6 chữ số | Designed, not executed separately | N/A |
| FR03-BVA-002 | BVA | OTP 6 chữ số | OTP 6 chữ số đúng | Chấp nhận nếu password hợp lệ | Failed | BUG-FR03-001 do UI chỉ sinh 4 chữ số |
| FR03-BVA-003 | BVA | OTP 7 chữ số | `1234567` | Từ chối do vượt 6 chữ số | Designed, not executed separately | N/A |
| FR03-BVA-004 | BVA | Password 7 ký tự | `Aa1!aaa` | Từ chối do dưới 8 ký tự | Passed | Candidate BUG-FR03-R01 rejected |
| FR03-BVA-005 | BVA | Password 8 ký tự hợp lệ | `Aa1!aaaa` | Chấp nhận nếu OTP đúng | Failed | BUG-FR03-003 |
| FR03-BVA-006 | BVA | Password 9 ký tự hợp lệ | `Aa1!aaaaa` | Chấp nhận nếu OTP đúng | Designed, not executed separately | N/A |
| FR03-UI-001 | Domain/UI | Kiểm tra step indicator | Luồng 2 bước forgot/reset | Có chỉ báo bước 1/2 và 2/2 | Failed | BUG-FR03-005 |
| FR03-UI-002 | Domain/UI | Kiểm tra nút quay lại đăng nhập | Trang forgot password | Có link/nút quay lại login | Passed | Candidate BUG-FR03-R02 rejected |

## 2. FR-07 - Shopping cart

| ID | Kỹ thuật | Mục tiêu | Dữ liệu / lớp kiểm thử | Expected result | Execution status | Bug / Evidence |
|---|---|---|---|---|---|---|
| FR07-DT-001 | Domain | Thêm sản phẩm mới vào giỏ | Product id 1, quantity 1 | Giỏ có 1 dòng, quantity 1 | Passed | N/A |
| FR07-DT-002 | Domain | Thêm cùng sản phẩm lần 2 | Product id 1 đã có trong giỏ | Giỏ vẫn 1 dòng, quantity tăng lên 2 | Failed | BUG-FR07-001 |
| FR07-DT-003 | Domain | Thêm 2 sản phẩm khác nhau | Product id 1 và id 2 | Giỏ có 2 dòng riêng | Passed | N/A |
| FR07-DT-004 | Domain | Xóa sản phẩm có confirm | Click xóa, chọn confirm | Chỉ xóa sau khi confirm | Failed | BUG-FR07-002 |
| FR07-DT-005 | Domain | Hủy xóa sản phẩm | Click xóa, chọn cancel | Sản phẩm vẫn còn trong giỏ | Failed | BUG-FR07-002 do không có confirm dialog |
| FR07-DT-006 | Domain | Empty cart UI | 0 item | Hiện thông báo rõ và hình minh họa | Failed | BUG-FR07-004 |
| FR07-DT-007 | Domain | Nút tiếp tục mua sắm | Trang cart | Quay về trang chủ/danh sách sản phẩm | Passed | N/A |
| FR07-DT-008 | Domain | Nhãn tổng tiền đúng spec | Giỏ có sản phẩm | Hiện nhãn `Tổng cộng` | Failed | BUG-FR07-003 |
| FR07-BVA-001 | BVA | Quantity min - 1 | Quantity 0 hoặc click minus từ 1 | Không cho quantity = 0 | Failed | BUG-FR07-005 do thiếu +/- |
| FR07-BVA-002 | BVA | Quantity min | Quantity 1 | Thành tiền = price x 1 | Passed | N/A |
| FR07-BVA-003 | BVA | Quantity min + 1 | Quantity 2 | Thành tiền = price x 2 | Failed | BUG-FR07-005 do thiếu +/- |
| FR07-BVA-004 | BVA | Quantity lớn | Quantity 100 | Total tính đúng hoặc có validation max | Designed, not executed separately | UI không có control quantity |
| FR07-BVA-005 | BVA | Cart row 0 | 0 item | Empty state rõ ràng | Failed | BUG-FR07-004 |
| FR07-BVA-006 | BVA | Cart row 1 | 1 item | Hiển thị 1 dòng | Passed | N/A |
| FR07-BVA-007 | BVA | Cart row 2 | 2 product khác nhau | Hiển thị 2 dòng | Passed | N/A |

## 3. FR-16 - Product import from CSV

| ID | Kỹ thuật | Mục tiêu | Dữ liệu / lớp kiểm thử | Expected result | Execution status | Bug / Evidence |
|---|---|---|---|---|---|---|
| FR16-DT-001 | Domain | Import CSV hợp lệ 1 dòng | Header đúng, 1 product hợp lệ | Import thành công 1/1 | Passed | N/A |
| FR16-DT-002 | Domain | Từ chối file không phải CSV | `products.txt` | UI từ chối file không phải CSV | Passed | Candidate BUG-FR16-R01 rejected |
| FR16-DT-003 | Domain | Từ chối header sai | Header thiếu `price` | Báo lỗi header, không import | Passed | Candidate BUG-FR16-R02 rejected |
| FR16-DT-004 | Domain | Từ chối name rỗng | Row có `name` rỗng | Báo lỗi và rollback toàn batch | Failed | BUG-FR16-001 |
| FR16-DT-005 | Domain | Từ chối price = 0 | `price=0` | Báo lỗi price phải dương và rollback | Failed | BUG-FR16-002 |
| FR16-DT-006 | Domain | Từ chối price âm | `price=-1` | Báo lỗi price phải dương và rollback | Failed | BUG-FR16-003 |
| FR16-DT-007 | Domain | Từ chối price không phải số | `price=abc` | Báo lỗi price invalid và rollback | Failed | BUG-FR16-004 |
| FR16-DT-008 | Domain | Hỗ trợ RFC 4180 quoted comma | `"Mô tả có, dấu phẩy"` | Parser giữ description là 1 field | Failed | BUG-FR16-005 |
| FR16-DT-009 | Domain | Rollback khi batch có dòng lỗi | Row 1 hợp lệ, row 2 name rỗng | 0 row được import, report lỗi | Covered by FR16-DT-004 | BUG-FR16-001 |
| FR16-DT-010 | Domain | Report import rõ ràng | Batch hợp lệ/lỗi | Hiện số dòng thành công/lỗi/lý do | Passed | N/A |
| FR16-BVA-001 | BVA | File 0 data row | Chỉ có header | Báo không có dữ liệu để import | Failed | BUG-FR16-006 |
| FR16-BVA-002 | BVA | File 1 data row | 1 row hợp lệ | Import thành công | Passed | N/A |
| FR16-BVA-003 | BVA | File 2 data rows | 2 rows hợp lệ | Import 2/2 | Designed, not executed separately | N/A |
| FR16-BVA-004 | BVA | Price min - 1 | `price=0` nếu min hợp lệ là 1 | Từ chối | Failed | BUG-FR16-002 |
| FR16-BVA-005 | BVA | Price min | `price=1` | Chấp nhận | Passed | N/A |
| FR16-BVA-006 | BVA | Price sát trên min | `price=2` | Chấp nhận | Designed, not executed separately | N/A |
| FR16-BVA-007 | BVA | Name empty | `name=""` | Từ chối và rollback | Failed | BUG-FR16-001 |
| FR16-BVA-008 | BVA | Name 1 char | `name="A"` | Chấp nhận | Designed, not executed separately | N/A |
| FR16-BVA-009 | BVA | Name dài | 256 ký tự | Chấp nhận hoặc báo lỗi nếu có max length | Designed, not executed separately | N/A |

## 4. FR-04mb - Personal profile management

FR-04mb được ghi chi tiết trong `fr04mb-manual-test-cases.md` và trong báo cáo chính. Tóm tắt:

| Feature | Designed | Executed | Passed | Failed | Not executed | Bugs |
|---|---:|---:|---:|---:|---:|---:|
| FR-04mb | 20 | 19 | 14 | 5 | 1 | 4 |

## 5. Summary

| Feature | Designed test cases | Evidence-executed scenarios | Passed | Failed | Not executed / covered only by design | Bugs |
|---|---:|---:|---:|---:|---:|---:|
| FR-03 | 16 | 8 | 3 | 5 | 8 | 5 |
| FR-07 | 15 | 8 | 3 | 5 | 7 | 5 |
| FR-16 | 19 | 10 | 4 | 6 | 9 | 6 |
| FR-04mb | 20 | 19 | 14 | 5 | 1 | 4 |
| Tổng | 70 | 45 | 24 | 21 | 25 | 20 |
