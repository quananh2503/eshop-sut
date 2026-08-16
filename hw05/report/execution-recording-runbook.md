# Runbook chạy, chụp ảnh và quay video HW05

## 1. Chuẩn bị một lần trước mọi scenario

### 1.1. Chụp hardware

1. Nhấn `Win + R`, nhập `dxdiag`, chờ thanh progress hoàn tất.
2. Chụp tab **System** có Computer Name, Processor, Memory và Windows version.
3. Mở Task Manager → Performance → CPU, chụp model CPU/core/logical processor.
4. Mở Task Manager → Performance → Memory, chụp tổng RAM.
5. Lưu vào `hw05/evidence/hardware/`, không crop mất hostname/thông số.

### 1.2. Khởi động SUT

Terminal A:

```bash
cd /home/quananh/hw05/eshop-sut/backend
node server.js
```

Chờ đủ ba dòng `Database initialized`, `Server is running` và `Connected to
database`. Không đóng terminal. Lưu ý backend tự reset/seed SQLite mỗi lần mở.

### 1.3. Chuẩn bị JWT

Terminal B:

```bash
cd /home/quananh/hw05/eshop-sut/hw05
node scripts/prepare_test_data.js
```

Chỉ tiếp tục khi thấy `Authenticated as test@eshop.com`. Không mở hoặc quay
nội dung `data/runtime-auth.properties` vì file chứa JWT.

### 1.4. Bố trí màn hình đo

Dùng Windows Terminal split thành hai pane trong cùng cửa sổ:

- Pane trái rộng khoảng 65%: chạy JMeter CLI.
- Pane phải khoảng 35%: chạy `htop -p "$(pgrep -n node)"`.

Trong htop bật/căn cột để thấy PID, CPU%, MEM%, RES, TIME+. Xác nhận command là
`node server.js`, không phải process JMeter. Phóng chữ đủ đọc được trong ảnh.

Trước mỗi run, quay/chụp một đoạn identity:

```bash
date --iso-8601=seconds
whoami
hostname
git -C /home/quananh/hw05/eshop-sut branch --show-current
```

Expected: `quananh`, `DESKTOP-L0U0JQ4`, branch `hw05-ai-performance-v1`.

### 1.5. Cô lập trạng thái trước từng scenario

Không chạy bốn scenario liên tiếp trên cùng một backend process. Stress
`POST /api/cart` làm mảng cart trong RAM tăng lên; nếu giữ process đó thì CPU/RAM
baseline của Spike/Endurance bị nhiễu.

Trước **Load, Stress, Spike và Endurance**, lặp đúng quy trình:

1. Nếu backend cũ đang chạy, nhấn `Ctrl+C` ở Terminal A.
2. Chỉ restart sau khi đã chụp final summary/resource của run trước.
3. Chạy lại `node server.js` và chờ đủ ba dòng startup.
4. Chạy lại `node scripts/prepare_test_data.js` ở Terminal B.
5. Chạy lại `htop -p "$(pgrep -n node)"` vì PID Node đã thay đổi.
6. Xác nhận CPU/RES đã trở về baseline rồi mới bắt đầu scenario mới.

Việc restart này phải ghi trong video/report: source tự reset database và cart
in-memory được làm sạch để mỗi scenario độc lập. Không restart giữa một run để
che crash/error.

## 2. Load — khoảng 2 phút

### 2.1. Quay cấu hình trước run

Mở JMeter GUI bằng lệnh dưới, chỉ để trình bày plan; không bấm Start cho run
chính thức:

```bash
/home/quananh/hw05/.tools/apache-jmeter-5.6.3/bin/jmeter \
  -t /home/quananh/hw05/eshop-sut/hw05/test-plans/23127001_Load_20260816.jmx
```

Trong video mở lần lượt: Thread Group, Profile CSV, HTTP Request, hai assertion,
Think time và **View Results Tree — Load only**. Nói: 20 threads, ramp 20 giây,
duration 120 giây, think time 1 giây. Chụp `load_plan_view-results-tree.png`,
sau đó đóng GUI để không ảnh hưởng tài nguyên run CLI.

### 2.2. Chạy chính thức

Pane phải chạy htop trước. Pane trái:

```bash
cd /home/quananh/hw05/eshop-sut/hw05
./scripts/run_scenario.sh load
```

Thời gian dự kiến: khoảng 2 phút cộng vài giây tạo HTML.

### 2.3. Thời điểm quay/chụp

1. **0:00**: quay lúc gõ lệnh và dòng `Starting standalone test`.
2. **0:20**: ramp-up kết thúc; chỉ vào CPU/RES của `node server.js`.
3. **1:00–1:20**: chụp toàn bộ cửa sổ split thành
   `evidence/load/load_runtime_steady.png`. Đây là ảnh bắt buộc chính.
4. **Kết thúc ~2:05**: quay summary JMeter có samples, req/s, Avg, Err. Chụp
   `evidence/load/load_cli_final_summary.png`.

Không chụp ảnh chính sau khi run kết thúc vì CPU đã hạ xuống và không phản ánh
tải đang chạy.

## 3. Stress — khoảng 4 phút

### 3.1. Quay cấu hình

Mở plan Stress trong GUI. Mở Thread Group, Cart CSV, POST body/assertion và
**Summary Report — Stress only**. Nói: 80 threads tăng tuyến tính trong 180
giây, tổng 240 giây, think time 200 ms. Chụp
`stress_plan_summary-report.png`, rồi đóng GUI.

### 3.2. Chạy

```bash
cd /home/quananh/hw05/eshop-sut/hw05
./scripts/run_scenario.sh stress
```

### 3.3. Thời điểm quay/chụp

1. **0:00**: quay lệnh và start timestamp.
2. **1:00**: tải đang tăng; chụp phụ `stress_runtime_ramp_60s.png`.
3. **3:00**: đạt 80 threads; bắt đầu vùng tải cao.
4. **3:15–3:40**: chụp ảnh chính `stress_runtime_peak.png`, phải thấy JMeter
   terminal và htop cùng frame; đọc CPU%, MEM%, RES.
5. **Kết thúc ~4:05**: chụp `stress_cli_final_summary.png`; không gọi đây là
   breaking point cho đến khi phân tích raw JTL.

Sau Stress, dừng lại và gửi file sau cho AI phân tích trước Endurance:

```text
results/jtl/23127001_Stress_20260816.jtl
```

Nếu 80 threads chưa tạo dấu hiệu degradation, sẽ chạy một calibration Stress
bổ sung với ceiling cao hơn; không tự tuyên bố 80 là threshold.

## 4. Spike — khoảng 2 phút 30 giây

### 4.1. Quay cấu hình

Mở plan Spike trong GUI. Chỉ hai Thread Group: baseline và sudden spike; mở
Forgot-password CSV, assertions và **Aggregate Report — Spike only**. Nói:
baseline 5 threads; sau 60 giây tăng 100 threads trong 1 giây; spike giữ 30
giây; baseline tiếp tục để quan sát recovery. Chụp
`spike_plan_aggregate-report.png`, rồi đóng GUI.

### 4.2. Chạy

```bash
cd /home/quananh/hw05/eshop-sut/hw05
./scripts/run_scenario.sh spike
```

### 4.3. Thời điểm quay/chụp

1. **0:25–0:40**: chụp baseline `spike_runtime_baseline.png`.
2. **1:00**: spike bắt đầu.
3. **1:05–1:20**: chụp ảnh bắt buộc `spike_runtime_peak.png`; phải thấy CPU/RES
   và JMeter terminal cùng frame.
4. **1:40–2:00**: spike đã kết thúc, chụp `spike_runtime_recovery.png` để so
   tài nguyên/latency với baseline.
5. **Kết thúc ~2:35**: chụp `spike_cli_final_summary.png`.

Endpoint này không gọi login sai nên không phát sinh 3-fail account lockout.
Không trình bày bước reset lockout nếu thực tế không xảy ra.

## 5. Kiểm tra HTML sau mỗi run

Sau khi cả ba run hoàn tất:

```bash
cd /home/quananh/hw05/eshop-sut/hw05
python3 -m http.server 8000 --directory results/html
```

Mở lần lượt:

- `http://localhost:8000/23127001_Load_20260816/`
- `http://localhost:8000/23127001_Stress_20260816/`
- `http://localhost:8000/23127001_Spike_20260816/`

Với mỗi report, quay/chụp Dashboard và Statistics; phải thấy Samples, Error%,
Throughput, Average, 90th/95th/99th percentile. Không tách `index.html` khỏi
thư mục report.

## 6. Endurance — chỉ chạy sau khi chọn tải từ Stress

Không dùng mặc định 20 threads và gọi đó là threshold nếu chưa có căn cứ. Sau
khi phân tích Stress/calibration, đặt số thread ổn định gần ngưỡng bằng biến
`ENDURANCE_THREADS`:

```bash
ENDURANCE_THREADS=<SO_THREAD_DA_XAC_MINH> \
ENDURANCE_DURATION=900 \
  ./scripts/run_scenario.sh endurance
```

Thời lượng: 900 giây = 15 phút, cộng thời gian ramp và tạo report.

Chụp cùng một bố cục JMeter CLI + htop tại:

1. **0:00** — bắt đầu và timestamp.
2. **1:00** — sau warm-up: `endurance_01min.png`.
3. **5:00** — `endurance_05min.png`.
4. **10:00** — `endurance_10min.png`.
5. **14:00** — ảnh chính gần cuối `endurance_14min.png`.
6. **Kết thúc** — `endurance_cli_final_summary.png`.

Các ảnh phải cho phép so sánh RES/CPU theo thời gian. Nếu backend crash, không
khởi động lại rồi che mất sự kiện: giữ terminal/error, chụp lại và ghi timestamp.

## 7. Video cuối

Có thể quay thành nhiều clip rồi ghép, nhưng không cắt bỏ lỗi hoặc thay số liệu.
Video cuối nên 8–10 phút:

- 40 giây identity/version.
- 50 giây hardware/SUT.
- 2 phút trình bày ba JMX/CSV/listener.
- 2–3 phút các đoạn start/steady/peak/final summary của ba run.
- 1 phút HTML/JTL metrics.
- 1 phút Human Review lỗi CSV blank record.
- 1 phút Agent Skill và audit.
- Kết luận endurance threshold sau khi có run thật.

Không quay JWT, không dùng giọng AI, không đọc metric chưa có evidence.
