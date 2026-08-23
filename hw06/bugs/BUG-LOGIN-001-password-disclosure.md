# BUG-LOGIN-001 — API đăng nhập làm lộ mật khẩu dạng plaintext

## Trạng thái

Đã xác nhận bằng Newman local ngày 23/08/2026 UTC. Cập nhật Issue GitHub bằng nội dung tiếng Việt bên dưới.

## Yêu cầu bị vi phạm

SEC-01: mật khẩu không được lưu trữ hoặc trả về dưới dạng plaintext. Response đăng nhập không được chứa trường `password`.

## Các bước tái hiện

1. Khởi động EShop backend.
2. Gửi `POST /api/login` với body `{"email":"test@eshop.com","password":"Test1234!"}` và header `X-Student-Id: 23127001`.
3. Kiểm tra object `user` trong response.

## Kết quả mong đợi

API có thể trả về `200 OK`, token JWT và các trường hồ sơ an toàn, nhưng không được trả về `password`.

## Kết quả thực tế

API trả về `200 OK`; assertion Newman `password not disclosed` thất bại vì tồn tại `response.user.password`.

## Bằng chứng

`../results/newman-report.json` and `../results/newman-report.html`, collection item `LOGIN-001 valid user`.

## Tiêu đề GitHub Issue

`[SEC-01] POST /api/login làm lộ mật khẩu plaintext trong response`
