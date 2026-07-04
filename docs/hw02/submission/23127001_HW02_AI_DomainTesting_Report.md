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
| Pool D | FR-04mb - Personal profile management | Mobile | Đã phân tích Domain/BVA, chưa tự động hóa vì Playwright không phù hợp trực tiếp với React Native/Expo |

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

FR-04mb là chức năng quản lý hồ sơ cá nhân trên mobile. Người dùng đã đăng nhập có thể xem và cập nhật thông tin hồ sơ như họ tên, số điện thoại và địa chỉ giao hàng mặc định. Đây là feature thuộc frontend mobile React Native/Expo nên chưa được tự động hóa bằng Playwright browser trong phạm vi hiện tại.

### 7.2 Miền đầu vào

| Biến | Miền hợp lệ | Miền không hợp lệ |
|---|---|---|
| Auth state | User đã đăng nhập | Chưa đăng nhập, token sai |
| Name | Chuỗi không rỗng | Rỗng, chỉ khoảng trắng |
| Phone | Bắt đầu bằng 0, 10-11 chữ số | 9 chữ số, 12 chữ số, không bắt đầu bằng 0, chứa chữ |
| Shipping address | Địa chỉ hợp lệ | Rỗng, quá dài, chứa script |
| Email | Read-only | Cho phép sửa email trái spec |
| Role | Không được chỉnh qua UI | User tự đổi role |

### 7.3 Boundary Value Analysis

| Biên | Giá trị kiểm thử |
|---|---|
| Độ dài số điện thoại | 9, 10, 11, 12 chữ số |
| Prefix số điện thoại | `0912345678`, `1912345678` |
| Name | Rỗng, 1 ký tự, tên bình thường |
| Address | Rỗng, địa chỉ bình thường, chuỗi dài |

### 7.4 Trạng thái thực hiện

Feature này đã được phân tích Domain/BVA nhưng chưa chạy automation bằng Playwright vì Playwright phù hợp với browser web, không trực tiếp điều khiển native mobile UI của Expo/React Native. Phần này cần được bổ sung bằng kiểm thử manual trên mobile hoặc dùng công cụ phù hợp hơn như Detox/Appium nếu muốn tự động hóa mobile.

## 8. Tổng hợp kết quả

| Feature | Test cases designed | Executed | Passed | Failed | Not executed | Bugs confirmed |
|---|---:|---:|---:|---:|---:|---:|
| FR-03 | 8 | 8 | 3 | 5 | 0 | 5 |
| FR-07 | 8 | 8 | 3 | 5 | 0 | 5 |
| FR-16 | 10 | 10 | 4 | 6 | 0 | 6 |
| FR-04mb | 8 | 0 | 0 | 0 | 8 | 0 |
| Tổng | 34 | 26 | 10 | 16 | 8 | 16 |

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
| FR-04mb | Auth state, name, phone, address, email read-only, role | Đã có phân tích Domain/BVA | Chưa có manual/mobile execution evidence |

Đánh giá hiện tại: bộ test cho 3 feature web/admin là ổn và có chất lượng tốt hơn mức chỉ kiểm thử happy path, vì có 26 test chạy thật và 16 bug confirmed. Tuy nhiên, để tối đa điểm, phần FR-04mb cần được bổ sung bằng kiểm thử manual/mobile có ảnh minh chứng hoặc automation bằng công cụ phù hợp hơn Playwright.

## 10. Danh sách bug confirmed

| Feature | Số bug | Bug IDs |
|---|---:|---|
| FR-03 | 5 | BUG-FR03-001 đến BUG-FR03-005 |
| FR-07 | 5 | BUG-FR07-001 đến BUG-FR07-005 |
| FR-16 | 6 | BUG-FR16-001 đến BUG-FR16-006 |
| FR-04mb | 0 | Chưa có evidence automation/manual chính thức |

Chi tiết bug nằm trong `docs/hw02/bug-tracker.md`. Nội dung draft để tạo GitHub Issue nằm trong `docs/hw02/github-issues-draft.md`.

## 11. AI Critique

AI hỗ trợ tốt ở giai đoạn đọc yêu cầu, tách feature theo pool, gợi ý miền đầu vào, sinh khung test case và viết Playwright nhanh hơn so với làm thủ công từ đầu. Tuy nhiên, output ban đầu của AI vẫn cần kiểm tra rất kỹ. Một số test đầu tiên bị lệch so với thực tế UI, ví dụ locator ở form reset password bị sai do sau khi chuyển bước chỉ còn hai input, hoặc cách chờ `dialog` của Playwright gây timeout. AI cũng dễ đề xuất kiểm thử backend/API, trong khi phạm vi bài này cần ưu tiên UI-first Domain Testing. Sau khi rà soát, em chỉnh lại test để không kết luận bug trực tiếp từ API, bổ sung xử lý localStorage của giỏ hàng, và phân biệt rõ bug thật với lỗi script. Nhìn chung, AI phù hợp để tăng tốc phân tích và tạo bản nháp, nhưng người làm vẫn phải đối chiếu đặc tả, chạy test thật, xem screenshot/trace, và chịu trách nhiệm cuối cùng về kết luận bug.

## 12. AI Usage Declaration

Trong bài HW02 này, em có sử dụng Codex/ChatGPT để hỗ trợ:

- Phân tích yêu cầu bài tập và chính sách AI.
- Đọc cấu trúc EShop, README và API specification.
- Đề xuất chiến lược Domain Testing/BVA cho 4 feature được giao.
- Sinh bản nháp test case và Playwright automation cho FR-03, FR-07, FR-16.
- Hỗ trợ chạy Playwright, phân tích kết quả fail, cập nhật bug tracker và evidence.
- Hỗ trợ soạn bản nháp báo cáo Markdown.

Các phần em đã trực tiếp rà soát/chỉnh sửa:

- Chọn phạm vi UI-first, không kết luận bug trực tiếp bằng backend/API.
- Sửa test Playwright bị sai locator/dialog.
- Kiểm tra lại kết quả pass/fail từ Playwright report.
- Xác nhận 16 bug dựa trên screenshot/error context.
- Loại bỏ hoặc đánh dấu Rejected các candidate không tái hiện được.

Mandatory Disclosure:

> Báo cáo, test case, Playwright scripts và bug tracker này được sinh phiên bản đầu với sự hỗ trợ của Codex/ChatGPT; tôi đã rà soát và chỉnh sửa phần chiến lược UI-first, test locator/dialog, mapping test case sang bug, bổ sung edge cases cho localStorage/CSV/OTP/password; phần đánh giá kết quả và kết luận bug do tôi kiểm tra lại dựa trên Playwright evidence. AI Audit Report chi tiết được ghi nhận trong `07_hw02_individual/06_ai_usage/prompt_log.md`. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm.

## 13. Self-assessment

| Tiêu chí | Điểm tối đa | Tự đánh giá | Ghi chú |
|---|---:|---:|---|
| Pool A - FR-03 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 5 bug |
| Pool B - FR-07 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 5 bug |
| Pool C - FR-16 Domain + BVA | 25 | 23 | Có thiết kế và automation, phát hiện 6 bug |
| Pool D - FR-04mb Domain + BVA | 15 | 8 | Có phân tích Domain/BVA, chưa có automation/mobile evidence |
| Agent/AI workflow | 10 | 8 | Có dùng AI có kiểm soát, prompt log, commit log, evidence |
| Tổng | 100 | 85 | Tự đánh giá đề xuất: 085 |

Tên file nộp đề xuất:

```text
23127001_HW02_AI_DomainTesting_085.zip
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
| GitHub issue drafts | `07_hw02_individual/02_source_materials/eshop-sut/docs/hw02/github-issues-draft.md` |
| AI prompt log | `07_hw02_individual/06_ai_usage/prompt_log.md` |

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

## 16. Kết luận

Bài làm đã áp dụng Domain Testing và Boundary Value Analysis cho 4 feature được giao. Trong đó, 3 feature web/admin đã được tự động hóa bằng Playwright qua UI, chạy tổng cộng 26 test và xác nhận 16 bug có screenshot evidence. Feature mobile FR-04mb đã được phân tích miền đầu vào và biên, nhưng cần kiểm thử thủ công hoặc công cụ mobile automation phù hợp để hoàn thiện evidence. Qua bài này, em nhận thấy Domain Testing giúp phát hiện lỗi rõ ràng ở các miền invalid và boundary như OTP length, password policy, duplicate cart item, invalid price và rollback CSV import.
