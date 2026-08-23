# BUG-ADMINSTATUS-001 — User thường có thể cập nhật đơn hàng qua API admin

## Trạng thái

Đã xác nhận bằng Newman local ngày 23/08/2026 UTC. Cập nhật Issue GitHub bằng nội dung tiếng Việt bên dưới.

## Yêu cầu bị vi phạm

SEC-03 và FR-12/FR-18 yêu cầu mọi API `/api/admin/*` phải kiểm tra `role = admin`, không chỉ kiểm tra JWT hợp lệ.

## Các bước tái hiện

1. Đăng nhập bằng tài khoản user thường và lưu JWT nhận được.
2. Tạo đơn hàng ở trạng thái `pending` bằng user đó qua `POST /api/checkout`.
3. Gửi `PUT /api/admin/orders/{orderId}/status` với JWT của user thường và body `{"status":"confirmed"}`.
4. Gửi kèm header `X-Student-Id: 23127001`.

## Kết quả mong đợi

API phải từ chối bằng `401` hoặc `403`; đơn hàng phải giữ nguyên trạng thái `pending`.

## Kết quả thực tế

API trả về `200 OK`; assertion Newman `ordinary user denied` thất bại.

## Bằng chứng

`../results/newman-report.json` and `../results/newman-report.html`, collection item `ADMINSTATUS ordinary user denied`.

## Tiêu đề GitHub Issue

`[SEC-03] JWT của user thường vẫn gọi được PUT /api/admin/orders/:id/status`
