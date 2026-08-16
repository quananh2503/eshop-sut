# HW05 — Performance Testing — Version 1.0

Sinh viên: **Nguyễn Lê Quan Anh — 23127001 — 23KTPM2 — Nhóm 07**

> Trạng thái: testware đang được chuẩn bị. Mọi metric, screenshot, `.jtl`,
> HTML dashboard và video chỉ được điền sau khi thực thi thật.

## Phiên bản và phạm vi

Bài làm chọn **Version 1.0** theo thông báo Q&A của TA Hồ Tuấn Thanh: sinh viên
chỉ cần hoàn thành một trong hai phiên bản và phải ghi rõ phiên bản đã chọn.

| Scenario | Endpoint group | Feature đã làm ở HW02 | API |
|---|---|---|---|
| Load | Read-heavy | FR-04mb — đọc hồ sơ | `GET /api/users/me` |
| Stress | Transactional | FR-07 — thêm giỏ hàng | `POST /api/cart` |
| Spike | Auth-heavy | FR-03 — quên mật khẩu | `POST /api/forgot-password` |

`GET /api/users/me` yêu cầu JWT nhưng thao tác được đo là truy vấn chỉ đọc hồ
sơ từ SQLite. `POST /api/cart` là add-to-cart, được Version 1.0 nêu trực tiếp
làm ví dụ transactional. `POST /api/forgot-password` thuộc quy trình xác thực
FR-03 và cập nhật reset token khi có spike.

## Testware

| Thành phần | Vị trí |
|---|---|
| JMeter plans | `test-plans/` |
| CSV data riêng cho từng endpoint group | `data/` |
| Runner và script phân tích | `scripts/` |
| Raw JTL | `results/jtl/` |
| HTML dashboards | `results/html/` |
| Phân tích có thể tái tạo | `results/analysis/` |
| Screenshot thật | `evidence/` |
| Báo cáo Markdown | `report/` |
| AI forms | `ai-reports/` |
| Agent Skill | `agent-skill/build-jmeter-performance-evidence/` |

## Chuẩn bị

Yêu cầu: backend EShop chạy ở `http://localhost:3000`, JMeter 5.6.3, Java 17,
Node.js và `htop` hoặc Windows Task Manager.

Từ repository root:

```bash
cd backend
npm install
node server.js
```

Ở terminal khác:

```bash
cd hw05
node scripts/prepare_test_data.js
```

Script chỉ đăng nhập tài khoản seed để lấy JWT vào
`data/runtime-auth.properties`; file runtime này không được commit hoặc công
khai. Script không reset database.

## Chạy

Chạy từng scenario riêng để có thể chụp JMeter/terminal và resource monitor
trong cùng frame:

```bash
cd hw05
./scripts/run_scenario.sh load
./scripts/run_scenario.sh stress
./scripts/run_scenario.sh spike
./scripts/run_scenario.sh endurance
```

Runner từ chối ghi đè evidence cũ. Chỉ truyền `--overwrite` sau khi đã sao lưu
run cũ và thực sự muốn thay thế.

Các tham số có thể override bằng biến môi trường `EXTRA_JMETER_ARGS`, ví dụ:

```bash
EXTRA_JMETER_ARGS='-Jstress_threads=120 -Jstress_ramp=240 -Jstress_duration=300' \
  ./scripts/run_scenario.sh stress
```

Sau mỗi run:

```bash
python3 scripts/summarize_jtl.py results/jtl/23127001_Load_20260816.jtl \
  --markdown results/analysis/load-summary.md \
  --json results/analysis/load-summary.json
```

## Evidence và kết quả đã xác minh

- Load: 1.940 samples, 0% lỗi, 16,796 req/s, p95 55 ms.
- Stress: 54.311 samples, 0% lỗi, 226,544 req/s, p95 16 ms; chưa thấy
  breaking point tại ceiling 80 threads.
- Spike: 2.814 samples, 0% lỗi; p95 tăng từ 49 ms baseline lên 1.497 ms ở
  spike và recovery về 56,6 ms.
- Raw JTL, HTML dashboard và screenshot thật của ba scenario chính nằm trong
  `results/` và `evidence/`; Endurance vẫn chờ thực thi.

## Evidence chưa được phép dựng trước

- Metric, raw `.jtl`, HTML và screenshot của các run chưa thực thi.
- Memory ceiling/maximum stable RPS khi chưa có Endurance evidence.
- GitHub Issue và screenshot của bug/performance issue.
- Video YouTube unlisted tối thiểu 6 phút, giọng thật của sinh viên.

## Link và tự đánh giá

- Repository: <https://github.com/quananh2503/eshop-sut>
- Branch: `hw05-ai-performance-v1`
- Video: `PENDING_STUDENT_VIDEO`
- Endurance threshold: `PENDING_REAL_EXECUTION`
- Bug/performance issue: `PENDING_REAL_EXECUTION`

Rubric trong đề cộng thành 90 dù hàng tổng ghi 100. Bài giữ nguyên rubric và
không tự tạo tiêu chí 10 điểm còn thiếu; cần xác nhận TA trước khi chốt tên ZIP.
