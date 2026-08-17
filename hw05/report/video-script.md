# Kịch bản quay video HW05 — lời nói và lệnh đầy đủ

## 1. Yêu cầu bắt buộc từ đề

Đề Version 1.0 yêu cầu video YouTube **không công khai (Unlisted)**, tổng thời
lượng **tối thiểu 6 phút**, có **giọng thuyết minh tiếng Việt thật của sinh
viên**, và phải cho thấy công cụ kiểm thử cùng resource monitor trong **cùng
một khung hình**. Có thể quay một video liền hoặc nhiều clip rồi ghép.

Video nên dài khoảng **9–10 phút** theo kịch bản dưới đây. Không cần chạy lại
ba official run dài. Chỉ chạy một demo Load 15 giây ra `/tmp` để chứng minh
thao tác live; phải nói rõ demo này không thay thế evidence chính thức.

## 2. Chuẩn bị trước khi bấm quay

1. Đóng email, tin nhắn và thông báo cá nhân.
2. Không mở `hw05/data/runtime-auth.properties`; file này chứa JWT.
3. Mở sẵn VS Code tại `/home/quananh/hw05/eshop-sut`.
4. Mở sẵn trình duyệt tại Issue #22:
   `https://github.com/quananh2503/eshop-sut/issues/22`.
5. Mở sẵn Markdown Preview của báo cáo chính.
6. Chọn micro thật; không dùng giọng AI.
7. Quay toàn màn hình ở độ phân giải đủ đọc terminal.

## 3. Kịch bản chi tiết

### 0:00–0:45 — Giới thiệu và xác nhận danh tính

**Màn hình:** mở terminal VS Code và chạy từng lệnh:

```bash
cd /home/quananh/hw05/eshop-sut
```

```bash
whoami
```

```bash
hostname
```

```bash
git branch --show-current
```

```bash
git log --oneline -5
```

**Lời nói:**

> Xin chào thầy và các anh chị trợ giảng. Em là Nguyễn Lê Quan Anh, mã số sinh
> viên 23127001, lớp 23KTPM2, nhóm 07. Đây là bài HW05 về kiểm thử hiệu năng có
> sử dụng AI. Em chọn đề Version 1.0 theo thông báo Q&A cho phép sinh viên chọn
> một trong hai phiên bản. Hệ thống được kiểm thử là EShop backend chạy local
> trên WSL2. Repository đang ở nhánh hw05-ai-performance-v1, và lịch sử Git cho
> thấy các bước thiết kế, chạy test, phân tích và lập báo cáo được commit riêng.

### 0:45–1:25 — Môi trường và phần cứng

**Màn hình:** lần lượt mở các ảnh:

- `hw05/evidence/hardware/dxdiag.png`
- `hw05/evidence/hardware/cpu.png`
- `hw05/evidence/hardware/memory.png`
- `hw05/evidence/hardware/wsl_environment.txt`

**Lời nói:**

> Máy kiểm thử là Dell Vostro 3590, hostname DESKTOP-L0U0JQ4, dùng CPU Intel
> Core i5-10210U với 4 core và 8 logical processor, RAM vật lý 16 GB DDR4. Trong
> WSL, bài test nhìn thấy 2 CPU logic, khoảng 7,7 GiB RAM và 4 GiB swap. Công
> cụ chính là Apache JMeter 5.6.3 chạy non-GUI, Java 17 và htop 3.3.0. Backend
> là Node.js, Express và SQLite tại localhost cổng 3000. Các ảnh phần cứng có
> hostname thật trùng với môi trường làm bài trước.

### 1:25–2:50 — Ba test plan, ba endpoint group và ba CSV

**Màn hình:** trong Explorer mở lần lượt:

- `hw05/test-plans/23127001_Load_20260816.jmx`
- `hw05/test-plans/23127001_Stress_20260816.jmx`
- `hw05/test-plans/23127001_Spike_20260816.jmx`
- `hw05/data/profile_data.csv`
- `hw05/data/cart_data.csv`
- `hw05/data/forgot_password_data.csv`

Có thể dùng tìm kiếm trong terminal để hiện nhanh cấu hình:

```bash
rg -n "num_threads|ramp_time|duration|HTTPSampler.path|ConstantTimer.delay|ResultCollector" hw05/test-plans/*.jmx
```

**Lời nói:**

> Theo Version 1.0, ba scenario phải bao phủ đúng một lần ba nhóm endpoint.
> Load dùng nhóm read-heavy, feature FR-04mb, gọi GET API users me. Cấu hình là
> 20 threads, ramp 20 giây, duration 120 giây và think time 1 giây. Listener
> riêng của plan này là View Results Tree.
>
> Stress dùng nhóm transactional, feature FR-07, gọi POST API cart. Cấu hình
> tăng tuyến tính đến 80 threads trong 180 giây, tổng duration 240 giây và think
> time 200 mili giây. Listener là Summary Report.
>
> Spike dùng nhóm auth-heavy, feature FR-03, gọi POST API forgot-password.
> Baseline có 5 threads trong 150 giây. Sau 60 giây, 100 threads được thêm vào
> trong 1 giây và giữ 30 giây, sau đó tiếp tục quan sát recovery. Listener là
> Aggregate Report. Mỗi endpoint group có CSV riêng. JWT của Load và Stress
> được chuẩn bị ngoài measured run và nằm trong file bị Git ignore.

### 2:50–4:25 — Evidence và kết quả ba official run

**Màn hình:** mở lần lượt các ảnh sau. Phóng to để thấy terminal bên trái và
`htop` bên phải trong cùng frame:

- `hw05/evidence/load/load_runtime_steady.png`
- `hw05/evidence/load/load_cli_final_summary.png`
- `hw05/evidence/stress/stress_runtime_peak.png`
- `hw05/evidence/stress/stress_cli_final_summary.png`
- `hw05/evidence/spike/spike_runtime_peak.png`
- `hw05/evidence/spike/spike_recovery_cli_final_summary.png`

**Lời nói:**

> Đây là evidence được chụp trong các lần chạy chính thức. Mỗi ảnh đều có
> terminal JMeter và htop theo dõi process node server.js trong cùng một khung
> hình. Các warning package scanning của JMeter chỉ là cảnh báo deprecation,
> không phải lỗi của test.
>
> Load tạo 1.940 samples, error rate 0 phần trăm, throughput 16,796 request mỗi
> giây, average 24,713 mili giây, p95 55 mili giây và max 72 mili giây.
>
> Stress tạo 54.311 samples, không có lỗi, throughput toàn run 226,544 request
> mỗi giây, average 5,575 mili giây và p95 16 mili giây. Interval cuối đạt
> 389,1 request mỗi giây nhưng vẫn không có lỗi. Vì vậy 80 threads chỉ là
> ceiling đã cấu hình, không phải breaking point hoặc giới hạn phần cứng.
>
> Spike tạo 2.814 samples và không có HTTP hoặc assertion error. Tuy nhiên p95
> baseline steady là 49 mili giây, p95 trong spike là 1.497 mili giây, tức tăng
> khoảng 30,6 lần. Recovery p95 trở về 56,6 mili giây, gần baseline. Như vậy
> dịch vụ vẫn available nhưng có latency degradation rõ rệt trong burst.

**Màn hình HTML dashboard:** mở một terminal riêng và chạy:

```bash
cd /home/quananh/hw05/eshop-sut/hw05
```

```bash
python3 -m http.server 8000 --directory results/html
```

Mở trong trình duyệt:

- `http://localhost:8000/23127001_Load_20260816/`
- `http://localhost:8000/23127001_Stress_20260816/`
- `http://localhost:8000/23127001_Spike_20260816/`
- `http://localhost:8000/23127001_Endurance_20260816/`

Chỉ nhanh Dashboard/Statistics và nói:

> Đây là bốn HTML dashboard được sinh trực tiếp từ raw JTL tương ứng. Em giữ
> nguyên cả folder vì index HTML phụ thuộc vào các file CSS, JavaScript và
> statistics JSON đi kèm.

Sau khi chiếu xong, quay lại terminal HTTP server và nhấn `Ctrl + C`.

### 4:25–5:15 — Endurance 15 phút

**Màn hình:** mở:

- `hw05/evidence/endurance/endurance_05min.png`
- `hw05/evidence/endurance/endurance_10min.png`
- `hw05/evidence/endurance/endurance_14min.png`
- `hw05/evidence/endurance/endurance_cli_final_summary.png`

Sau đó chạy:

```bash
sed -n '1,80p' hw05/results/analysis/endurance-windows.md
```

**Lời nói:**

> Endurance là một lần chạy bổ sung bằng Load plan, không phải test plan thứ
> tư. Run dùng 80 threads trong 900 giây, tương đương 15 phút. Tổng cộng có
> 61.478 samples, 0 lỗi và p95 toàn run 40 mili giây. Sau khi loại 60 giây ramp,
> ba steady window đạt lần lượt 70,243; 70,746; và 70,454 request mỗi giây, với
> p95 là 44, 32 và 40 mili giây. Node RES tăng từ khoảng 99,4 MiB lên khoảng
> 101 MiB rồi giữ phẳng tại phút 5, 10, 14 và cuối run. Vì CPU chưa bão hòa,
> em kết luận đây là maximum verified stable point, tức 80 threads và ít nhất
> 70,243 request mỗi giây; em không gọi đây là hardware maximum tuyệt đối.

### 5:15–6:20 — AI analysis, lỗi diễn giải và Human Review

**Màn hình:** chạy:

```bash
sed -n '1,100p' hw05/results/analysis/spike-phases.md
```

Sau đó mở phần `Task 2 — AI analysis và misinterpretation hunt` trong báo cáo.

**Lời nói:**

> AI hỗ trợ tạo testware và phân tích JTL, nhưng em không chấp nhận output trực
> tiếp. Lỗi thứ nhất là CSV ban đầu có record rỗng cuối file, làm Spike smoke
> test phát sinh một lỗi 404 giả vì email rỗng. Đây là test-data defect, không
> phải lỗi SUT. Em xóa record rỗng và chạy lại ba smoke test với 0 lỗi.
>
> Lỗi diễn giải metric thực tế là AI ban đầu dùng toàn bộ cửa sổ từ 0 đến 60
> giây làm baseline và báo p95 4.284,8 mili giây. Request bắt đầu sát giây 60
> lại hoàn tất trong lúc spike đã xảy ra, nên baseline bị transition
> contamination. Sau Human Review, em dùng guard band: baseline steady từ giây
> 5 đến 50 có p95 đúng là 49 mili giây; spike từ 60 đến 90 có p95 1.497 mili
> giây; recovery từ 100 đến 145 có p95 56,6 mili giây.
>
> AI cũng có xu hướng gọi 80 threads là breaking point chỉ vì đó là tải lớn
> nhất trong plan. Raw Stress JTL cho thấy 0 lỗi và p95 16 mili giây, nên kết
> luận đúng là chưa quan sát breaking point.

### 6:20–7:00 — Đề xuất tối ưu và GitHub Issue

**Màn hình:** mở Issue:

`https://github.com/quananh2503/eshop-sut/issues/22`

Sau đó mở source `backend/server.js` tại handler `/api/forgot-password` và
`backend/database.js` tại phần tạo bảng users.

**Lời nói:**

> Em đã đăng performance Issue số 22 trên fork, kèm screenshot và kết quả tái
> hiện. Source cho thấy mỗi request forgot-password thực hiện SELECT theo email
> rồi UPDATE reset token bằng một SQLite database handle. Tranh chấp hoặc queue
> ghi là giả thuyết phù hợp, nhưng chưa được gọi là root cause khi chưa profile.
> Thêm index cho users email, thử WAL với busy timeout, và rate limiting là các
> đề xuất khả thi có điều kiện và phải benchmark lại. Connection pool kiểu
> PostgreSQL không tự giải quyết SQLite single-writer. Cache reset token là đề
> xuất không phù hợp vì có thể phá semantics và an toàn của luồng xác thực.

### 7:00–8:05 — Demo live JMeter và htop cùng frame

Phần này giúp đáp ứng chắc chắn yêu cầu “tool và resource monitor trong cùng
frame”. Đây chỉ là demo 15 giây, output đặt tại `/tmp`, không ghi đè official
JTL.

#### Terminal A — Backend

```bash
cd /home/quananh/hw05/eshop-sut/backend
```

```bash
node server.js
```

Để terminal này chạy, không nhập tiếp.

#### Terminal B bên trái — chuẩn bị demo

```bash
cd /home/quananh/hw05/eshop-sut/hw05
```

```bash
node scripts/prepare_test_data.js
```

Không mở file `runtime-auth.properties`.

#### Terminal B bên phải — htop

Chia đôi terminal rồi chạy:

```bash
htop -p "$(pgrep -n -f 'node server.js')"
```

Nhấn `Shift + H` nếu htop hiện nhiều thread.

#### Terminal B bên trái — JMeter demo 15 giây

```bash
VIDEO_DEMO_JTL=/tmp/23127001_video_demo_load_20260817.jtl
```

Nếu đã rehearsal bằng đúng tên trên, đổi phần cuối thành `_take2.jtl`.

```bash
/home/quananh/hw05/.tools/apache-jmeter-5.6.3/bin/jmeter -n -t test-plans/23127001_Load_20260816.jmx -q data/runtime-auth.properties -l "$VIDEO_DEMO_JTL" -Jhost=localhost -Jport=3000 -Jdata_dir=/home/quananh/hw05/eshop-sut/hw05/data -Jload_threads=2 -Jload_ramp=2 -Jload_duration=15 -Jthink_time_ms=500
```

**Lời nói trong lúc chạy:**

> Em đang demo live Load plan với 2 threads trong 15 giây. Bên trái là JMeter
> non-GUI, bên phải là htop theo dõi đúng process Node backend. Output demo được
> lưu trong `/tmp`, không ghi đè và không được dùng thay số liệu official. Cùng
> một JMX được parameter hóa để smoke, demo và official run không cần sửa file.

Khi kết thúc, chỉ dòng summary và nói:

> Demo đã hoàn tất. Metric vừa thấy chỉ chứng minh workflow hoạt động, không
> phải performance result chính thức.

### 8:05–8:55 — Agent Skill end-to-end

**Màn hình:** mở:

`hw05/agent-skill/build-jmeter-performance-evidence/SKILL.md`

Sau đó chạy từ thư mục `hw05`:

```bash
cd /home/quananh/hw05/eshop-sut/hw05
```

```bash
python3 agent-skill/build-jmeter-performance-evidence/scripts/audit_jmeter_suite.py . --student-id 23127001
```

```bash
python3 scripts/audit_submission.py --phase build
```

**Lời nói:**

> Đây là Agent Skill build-jmeter-performance-evidence em dùng trong bài. Skill
> hướng dẫn từ chọn endpoint, kiểm tra CSV, assertion và auth isolation, đến
> smoke validation, giữ raw evidence, phân tích percentile và final audit. Với
> endpoint group FR-03, workflow end-to-end gồm JMX Spike, CSV email riêng,
> official JTL, phân tích ba phase, resource evidence và Issue số 22. Hai lệnh
> audit đang kiểm tra chính suite này và kết quả là 0 failure ở phase build.
> Skill luôn từ chối coi smoke metric là kết quả chính thức và không cho phép
> dựng screenshot hoặc raw JTL bằng AI.

### 8:55–9:35 — Continuous Performance Testing

**Màn hình:** mở phần `Task 3 — Continuous Performance Testing proposal` trong
báo cáo và hiện flowchart Mermaid.

**Lời nói:**

> Mô hình continuous performance testing theo dõi commit hoặc pull request.
> Chỉ thay đổi ảnh hưởng backend, database, dependency hoặc API mới kích hoạt
> performance suite. Pipeline build và seed SUT cô lập, chạy smoke, sau đó chạy
> workload chuẩn và so p95 với baseline cùng môi trường. Nếu p95 vượt ngưỡng,
> pipeline rerun để loại nhiễu; chỉ khi regression tái hiện mới flag và đính
> JTL, HTML cùng diff. Trade-off là selective trigger giảm chi phí nhưng có thể
> bỏ sót ảnh hưởng gián tiếp; threshold quá chặt gây false alarm, còn rerun làm
> tăng thời gian CI.

### 9:35–10:00 — Kết luận

**Màn hình:** mở bảng tóm tắt trong báo cáo và AI Disclosure Form.

**Lời nói:**

> Kết luận, cả Load, Stress, Spike và Endurance đều có 0 error. Stress chưa
> chạm breaking point, nhưng Spike làm p95 tăng khoảng 30,6 lần và đã được báo
> cáo ở Issue số 22. Endurance xác minh 80 threads duy trì ít nhất 70,243
> request mỗi giây mà không có latency hoặc memory drift. Em sử dụng OpenAI
> Codex để hỗ trợ thiết kế, tạo testware, phân tích và viết báo cáo; toàn bộ raw
> JTL, HTML, screenshot, hardware evidence, GitHub Issue, video và giọng nói là
> evidence thật do em thực hiện hoặc xác nhận. Em xin kết thúc phần demo.

## 4. Sau khi quay

1. Trong terminal Backend nhấn `Ctrl + C` để dừng server.
2. Trong terminal htop nhấn `q`.
3. Xem lại video, bảo đảm giọng nghe rõ và dài ít nhất 6 phút.
4. Kiểm tra video không lộ JWT, mật khẩu hoặc thông báo cá nhân.
5. Upload YouTube và chọn **Unlisted / Không công khai**, không chọn Private.
6. Gửi URL video để điền vào README, báo cáo, Audit và checklist.

## 5. Những điều không được nói sai

- Không gọi 80 threads là hardware maximum hoặc breaking point.
- Không gọi 0 HTTP error là Spike không có ảnh hưởng.
- Không gọi demo 15 giây là official result.
- Không nói AI tạo raw JTL, screenshot, Issue hoặc video.
- Không nói Endurance là test plan thứ tư; đó là lần chạy bổ sung bằng Load plan.
- Không nói nguyên nhân chắc chắn là SQLite lock; hiện mới là giả thuyết cần
  profiling.
