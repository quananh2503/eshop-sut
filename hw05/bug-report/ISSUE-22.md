# Issue #22 — Spike latency của `POST /api/forgot-password`

- Issue công khai: <https://github.com/quananh2503/eshop-sut/issues/22>
- Người tái hiện và đăng Issue: Nguyễn Lê Quan Anh — 23127001
- Ngày ghi nhận: 17/08/2026
- SUT: EShop backend chạy local tại `http://localhost:3000`

## Mô tả

Trong Spike test 100 users, endpoint vẫn trả response hợp lệ và không có lỗi
HTTP/assertion, nhưng độ trễ tăng mạnh so với baseline. Đây là performance
degradation, không phải functional failure.

## Cách tái hiện

```bash
cd hw05
node scripts/prepare_test_data.js
./scripts/run_scenario.sh spike
```

Test plan tạo baseline 5 users, sau 60 giây tăng lên 100 users trong 1 giây,
giữ spike 30 giây rồi quan sát recovery. Dữ liệu nằm trong
`data/forgot_password_data.csv`.

## Kết quả đo từ raw JTL

| Pha steady | Samples | Throughput | Average | p95 | p99 | Max | Lỗi |
|---|---:|---:|---:|---:|---:|---:|---:|
| Baseline 5–50 s | 200 | 4,444 req/s | 28,1 ms | 49 ms | 66 ms | 102 ms | 0 |
| Spike 60–90 s | 2.114 | 70,467 req/s | 1.163,789 ms | 1.497 ms | 1.703,87 ms | 8.539 ms | 0 |
| Recovery 100–145 s | 195 | 4,333 req/s | 26,862 ms | 56,6 ms | 111,78 ms | 138 ms | 0 |

p95 trong spike cao hơn baseline khoảng 30,6 lần; recovery trở về gần
baseline trong cửa sổ quan sát.

## Bằng chứng đính kèm

- Raw JTL: `results/jtl/23127001_Spike_20260816.jtl`
- HTML dashboard: `results/html/23127001_Spike_20260816/index.html`
- Phân tích pha: `results/analysis/spike-phases.md`
- Ảnh: `evidence/spike/spike_runtime_peak.png` và
  `evidence/spike/spike_recovery_cli_final_summary.png`

Source thực hiện `SELECT` rồi `UPDATE users` qua SQLite cho mỗi request. Tranh
chấp/queue ghi là giả thuyết cần profiling thêm, không được khẳng định là
nguyên nhân gốc chỉ từ JMeter.
