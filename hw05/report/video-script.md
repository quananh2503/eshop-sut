# Kịch bản video HW05 ngắn gọn — khoảng 6 phút 30 giây

## Yêu cầu không được thiếu

- Video YouTube ở chế độ **Unlisted / Không công khai**.
- Dài **ít nhất 6 phút**.
- Dùng **giọng thật tiếng Việt** của sinh viên.
- Phải thấy JMeter/terminal và `htop` trong cùng khung hình.
- Không mở `data/runtime-auth.properties` vì có JWT.

Không cần đọc từng chữ. Nói tự nhiên theo các ý dưới đây. Không chạy lại ba
official run; dùng ảnh và kết quả thật đã có.

## 0:00–0:30 — Giới thiệu

**Màn hình:** terminal tại repository.

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

**Nói:**

> Em là Nguyễn Lê Quan Anh, MSSV 23127001, lớp 23KTPM2, nhóm 07. Đây là bài
> HW05 kiểm thử hiệu năng trên EShop chạy local bằng WSL2. Em chọn Version 1.0
> và làm trên nhánh hw05-ai-performance-v1.

## 0:30–1:00 — Máy và phạm vi

**Màn hình:** mở `evidence/hardware/dxdiag.png`, `cpu.png`, `memory.png`.

**Nói:**

> Máy là Dell Vostro 3590, CPU Intel Core i5-10210U và RAM 16 GB. WSL được cấp
> 2 CPU logic và khoảng 7,7 GiB RAM. Em dùng JMeter 5.6.3 và htop để theo dõi
> backend Node.js trên cổng 3000.

## 1:00–1:50 — Ba test plan

**Màn hình:** mở ba file trong `hw05/test-plans/` và ba CSV trong `hw05/data/`.

**Nói:**

> Version 1.0 yêu cầu ba nhóm endpoint được bao phủ đúng một lần. Load kiểm tra
> read-heavy bằng GET users me, gồm 20 threads trong 120 giây. Stress kiểm tra
> transactional bằng POST cart, tăng dần đến 80 threads trong 240 giây. Spike
> kiểm tra auth-heavy bằng POST forgot-password, có baseline 5 threads và tăng
> đột ngột thêm 100 threads sau 60 giây. Mỗi plan có CSV riêng và dùng một
> report view khác nhau: View Results Tree, Summary Report và Aggregate Report.

## 1:50–3:05 — Kết quả Load, Stress và Spike

**Màn hình:** mở lần lượt:

- `evidence/load/load_cli_final_summary.png`
- `evidence/stress/stress_runtime_peak.png`
- `evidence/stress/stress_cli_final_summary.png`
- `evidence/spike/spike_runtime_peak.png`
- `evidence/spike/spike_recovery_cli_final_summary.png`

Phóng to để thấy terminal và `htop` cùng khung.

**Nói:**

> Đây là ảnh thật của các lần chạy chính thức, bên trái là JMeter và bên phải
> là htop. Load có 1.940 request, không lỗi, throughput 16,796 request mỗi giây
> và p95 55 mili giây.
>
> Stress có 54.311 request, không lỗi, throughput toàn run 226,544 request mỗi
> giây và p95 16 mili giây. 80 threads là mức cao nhất đã thử, không phải
> breaking point vì hệ thống chưa có lỗi hoặc suy giảm rõ.
>
> Spike có 2.814 request và không lỗi. Tuy nhiên p95 tăng từ 49 mili giây ở
> baseline lên 1.497 mili giây trong spike, sau đó recovery về 56,6 mili giây.
> Như vậy API vẫn phản hồi nhưng latency tăng khoảng 30,6 lần lúc tải đột biến.

## 3:05–3:45 — Endurance

**Màn hình:** mở `endurance_05min.png`, `endurance_10min.png`,
`endurance_14min.png`, rồi `results/analysis/endurance-windows.md`.

**Nói:**

> Em dùng lại Load plan để chạy Endurance 80 threads trong 15 phút. Tổng cộng
> có 61.478 request và không lỗi. Ba giai đoạn steady đạt khoảng 70,2 đến 70,7
> request mỗi giây, p95 từ 32 đến 44 mili giây. Node RES giữ khoảng 101 MiB,
> không có xu hướng tăng liên tục. Vì máy chưa bão hòa, em chỉ kết luận đây là
> mức ổn định cao nhất đã xác minh, không gọi là giới hạn tuyệt đối của máy.

## 3:45–4:35 — AI và Human Review

**Màn hình:** mở `results/analysis/spike-phases.md` và phần Task 2 trong báo cáo.

**Nói:**

> AI hỗ trợ tạo test plan và phân tích log, nhưng em có kiểm tra lại. Lỗi đầu
> tiên là CSV do AI tạo có dòng rỗng, làm smoke test sinh lỗi 404 giả. Em xóa
> dòng rỗng và chạy lại với 0 lỗi.
>
> AI cũng tính toàn bộ 0 đến 60 giây là baseline của Spike, nên p95 bị sai do
> dính thời điểm chuyển sang spike. Sau khi loại vùng chuyển tiếp, baseline đúng
> từ giây 5 đến 50 có p95 49 mili giây. Em cũng sửa kết luận 80 threads là
> breaking point vì raw Stress JTL không chứng minh điều đó.

## 4:35–5:05 — Issue và đề xuất tối ưu

**Màn hình:** mở <https://github.com/quananh2503/eshop-sut/issues/22>.

**Nói:**

> Em đã tạo Issue số 22 cho hiện tượng Spike làm latency tăng khoảng 30,6 lần,
> kèm ảnh và số liệu tái hiện. Các đề xuất như thêm index email, thử WAL và rate
> limiting có thể kiểm thử thêm. Em không chấp nhận cache reset token vì có thể
> làm sai luồng xác thực. Em không kết luận nguyên nhân gốc khi chưa profiling.

## 5:05–5:35 — Continuous Performance Testing

**Màn hình:** mở flowchart ở Task 3 trong báo cáo.

**Nói:**

> Pipeline đề xuất chỉ chạy performance test khi commit ảnh hưởng backend, API,
> database hoặc dependency. Sau smoke test, pipeline so p95 với baseline. Nếu
> có regression thì chạy lại một lần để giảm false alarm, rồi mới cảnh báo và
> đính kèm JTL cùng HTML. Cách này giảm chi phí nhưng có thể bỏ sót tác động
> gián tiếp, còn rerun sẽ làm CI chậm hơn.

## 5:35–6:20 — Agent Skill và demo ngắn

**Màn hình:** mở
`agent-skill/build-jmeter-performance-evidence/SKILL.md`.

**Nói trước khi chạy:**

> Em xây Agent Skill để tái sử dụng quy trình thiết kế JMeter, kiểm tra CSV,
> giữ raw evidence, tính percentile và audit bài nộp. Sau đây là demo ngắn bằng
> Load plan. Demo này không thay thế kết quả chính thức.

### Terminal 1 — Backend

```bash
cd /home/quananh/hw05/eshop-sut/backend
```

```bash
node server.js
```

Khi thấy server chạy ở cổng 3000, để nguyên terminal này.

### Terminal 2 bên trái

```bash
cd /home/quananh/hw05/eshop-sut/hw05
```

```bash
node scripts/prepare_test_data.js
```

### Terminal 2 bên phải

Nhấn **Split Terminal**, rồi chạy:

```bash
htop
```

Nhấn `F4`, gõ `node server.js`, nhấn `Enter`. Nếu có nhiều dòng giống nhau,
nhấn `Shift + H`.

### Quay lại terminal bên trái

```bash
DEMO_JTL="/tmp/23127001_video_demo_$(date +%H%M%S).jtl"
```

Copy nguyên một dòng:

```bash
/home/quananh/hw05/.tools/apache-jmeter-5.6.3/bin/jmeter -n -t test-plans/23127001_Load_20260816.jmx -q data/runtime-auth.properties -l "$DEMO_JTL" -Jhost=localhost -Jport=3000 -Jdata_dir=/home/quananh/hw05/eshop-sut/hw05/data -Jload_threads=2 -Jload_ramp=2 -Jload_duration=15 -Jthink_time_ms=500
```

**Nói khi đang chạy:**

> Bên trái là JMeter demo 2 threads trong 15 giây, bên phải là htop theo dõi
> backend trong cùng khung hình. Output được lưu trong `/tmp`, không ghi đè raw
> JTL chính thức.

Khi kết thúc, chạy audit:

```bash
python3 agent-skill/build-jmeter-performance-evidence/scripts/audit_jmeter_suite.py . --student-id 23127001
```

**Nói:**

> Audit kết thúc với 0 failure. Metric của demo ngắn không được dùng làm kết
> quả performance chính thức.

## 6:20–6:40 — Kết luận

**Màn hình:** mở bảng tóm tắt báo cáo.

**Nói:**

> Tóm lại, ba scenario và Endurance đều không có lỗi. Stress chưa chạm breaking
> point, còn Spike có latency degradation và đã được báo cáo ở Issue số 22.
> Em đã khai báo việc dùng AI và tự review kết quả dựa trên raw evidence. Em xin
> kết thúc phần demo.

## Sau khi quay

1. Nhấn `q` để thoát `htop`.
2. Tại backend, nhấn `Ctrl + C`.
3. Kiểm tra video dài hơn 6 phút và không lộ JWT.
4. Upload YouTube ở chế độ **Unlisted**, rồi gửi URL video.

## Không được nói sai

- Demo 15 giây không phải official result.
- 80 threads không phải hardware maximum hoặc breaking point.
- Spike 0 lỗi không có nghĩa là không bị ảnh hưởng; latency đã tăng.
- Không khẳng định nguyên nhân gốc khi chưa profiling.
