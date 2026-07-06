# Phụ lục A - AI Audit Report cho HW02

## 1. Thông tin sinh viên

| Mục | Giá trị |
|---|---|
| Họ tên sinh viên | NGUYỄN LÊ QUAN ANH |
| MSSV | 23127001 |
| Lớp | 23KTPM2 |
| Mã bài tập | HW02-AI |
| Tên bài tập | Domain Testing on EShop |
| Ngày làm bài | 2026-07-04 |
| Công cụ AI đã dùng | Codex/ChatGPT |
| Có dùng AI | Có |

## 2. Bảng Audit - 1 hàng / artifact

| Artifact | Prompt + Công cụ | Output AI | Verdict | Lý do kiểm tra | Bản sinh viên sửa |
|---|---|---|---|---|---|
| Artifact #1 - Phân tích yêu cầu HW02 | Tool: Codex/ChatGPT. Prompt chính: phân tích yêu cầu HW02, lưu tài liệu, lập danh sách thông tin cần cung cấp và chiến lược dùng Playwright. | Bản nháp chiến lược Playwright, danh sách tài liệu cần có, cấu trúc thư mục HW02. | INCOMPLETE | AI mới tạo khung ban đầu, chưa đủ dữ liệu SUT và chưa thể kết luận feature nào dễ tự động hóa. | Em bổ sung thông tin sinh viên, phân công Member 1, repo fork cá nhân, xác nhận chọn FR-03, FR-07, FR-16, FR-04mb. |
| Artifact #2 - Domain/BVA analysis | Tool: Codex/ChatGPT. Prompt chính: thiết kế Domain Testing và Boundary Value Analysis cho 4 feature được giao. | File `docs/hw02/domain-bva-analysis.md` và `docs/hw02/test-cases.md`. | INCOMPLETE | AI có thể bỏ sót edge case nghiệp vụ như rollback CSV hoặc trạng thái localStorage của giỏ hàng. | Em rà soát theo đặc tả, bổ sung các miền invalid: OTP length, password policy, duplicate cart item, price 0/âm/chuỗi, RFC 4180 quoted comma, all-or-nothing CSV. |
| Artifact #3 - Playwright automation | Tool: Codex/ChatGPT. Prompt chính: viết Playwright automation bám theo test case đã thiết kế cho FR-03, FR-07, FR-16. | Các file test `tests/fr03-forgot-password.spec.js`, `tests/fr07-shopping-cart.spec.js`, `tests/fr16-product-import.spec.js`. | INCOMPLETE | Bản đầu có lỗi locator/dialog và có nguy cơ test backend thay vì UI-first. | Em sửa kịch bản theo UI-first, sửa locator input ở reset password, xử lý dialog đúng cách, tránh reload làm mất state giỏ hàng, làm rõ assertion CSV invalid price. |
| Artifact #4 - Bug tracker và evidence | Tool: Codex/ChatGPT. Prompt chính: chạy Playwright/manual test, phân tích fail, cập nhật trạng thái bug, ảnh minh chứng và GitHub Issues. | `bug-tracker.md`, `test-execution-notes.md`, `github-issues-summary.md`, `docs/hw02/evidence/*`, 20 GitHub Issues. | VALID | Kết quả được đối chiếu với Playwright run thật cho FR-03/FR-07/FR-16 và ảnh manual test trên iPhone cho FR-04mb. Tổng cộng 45 test executed, 24 passed, 21 failed, 20 bug reported. | Em xác nhận 16 bug web/admin từ Playwright evidence và 4 bug mobile từ ảnh iPhone, đánh dấu Rejected cho candidate không tái hiện, tạo GitHub Issues kèm evidence render trực tiếp. |
| Artifact #5 - Báo cáo chính | Tool: Codex/ChatGPT. Prompt chính: viết báo cáo HW02 bằng tiếng Việt có dấu dựa trên artifact đã có. | `23127001_HW02_AI_DomainTesting_Report.md` và PDF tương ứng. | INCOMPLETE | AI tạo bản nháp diễn đạt, nhưng sinh viên phải chịu trách nhiệm tính đúng của số liệu, bug và self-assessment. | Em kiểm tra lại số liệu test, mapping bug, commit log, evidence path và giữ ghi chú rõ phần mobile chưa automation. |

## 3. Tổng kết độ chính xác AI

| Chỉ số | Số lượng | Tỉ lệ |
|---|---:|---:|
| Tổng artifact AI sinh đã audit | 5 | 100% |
| VALID | 1 | 20% |
| INVALID | 0 | 0% |
| INCOMPLETE | 4 | 80% |

## 4. Kết luận - Khi nào nên / không nên dùng AI?

AI phù hợp để tăng tốc các bước tạo khung phân tích, gợi ý miền đầu vào, sinh test case nháp, viết Playwright ban đầu và soạn báo cáo. Tuy nhiên, AI không nên được dùng như nguồn kết luận cuối cùng. Trong bài này, một số output ban đầu cần chỉnh vì chưa bám chặt chiến lược UI-first, có locator sai sau khi UI chuyển bước, và chưa phân biệt lỗi script với bug thật. AI cũng dễ đề xuất kiểm thử API/backend khi đề yêu cầu tập trung vào Domain Testing qua UI. Vì vậy, chỉ nên dùng AI như trợ lý tạo bản nháp; sinh viên phải tự chạy test, đọc screenshot/trace, đối chiếu đặc tả, phân loại bug và khai báo đầy đủ việc sử dụng AI.

## 5. Mandatory Disclosure

"Báo cáo, test case, Playwright scripts và bug tracker này được sinh phiên bản đầu với sự hỗ trợ của Codex/ChatGPT; tôi đã rà soát và chỉnh sửa phần chiến lược UI-first, test locator/dialog, mapping test case sang bug, bổ sung edge cases cho localStorage/CSV/OTP/password; phần đánh giá kết quả và kết luận bug do tôi kiểm tra lại dựa trên Playwright evidence. AI Audit Report chi tiết đính kèm ở Phụ lục A. Tôi cam đoan không dùng AI để sinh bất kỳ artifact nào thuộc danh mục bị cấm."

## 6. Chữ ký

| Mục | Giá trị |
|---|---|
| Họ tên sinh viên | NGUYỄN LÊ QUAN ANH |
| MSSV | 23127001 |
| Lớp | 23KTPM2 |
| Môn học | CS423 / CSC15003 - Kiểm chứng Phần mềm |
| Giảng viên | Lâm Quang Vũ |
| Ngày | 2026-07-04 |
| Chữ ký | Nguyễn Lê Quan Anh |
