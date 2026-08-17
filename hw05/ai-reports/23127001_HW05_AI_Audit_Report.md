# HW05 — AI AUDIT REPORT

## 1. Thông tin

| Mục | Giá trị |
|---|---|
| Sinh viên | Nguyễn Lê Quan Anh |
| MSSV | 23127001 |
| Bài tập | HW05-AI — Performance Testing — Version 1.0 |
| AI tool | OpenAI Codex |
| Mức sử dụng | AI-first; sinh viên review và chịu trách nhiệm cuối cùng |

## 2. Quy tắc ghi log

Phiên giao diện hiện tại không cung cấp export timestamp chính xác cho từng tin
nhắn trước đó. Audit ghi ngày **16/08/2026** và không tự tạo giờ giả. Từ bước
thực thi chính thức, timestamp phải lấy từ terminal/JTL/video. Prompt dưới đây
giữ nguyên nội dung chính và lỗi chính tả của sinh viên khi có thể; output dẫn
đến artifact cụ thể để kiểm tra được.

## 3. Interaction log

### AI-01 — Chọn version

- Ngày: 16/08/2026; giờ: không có trong UI export.
- Prompt của sinh viên:

> thứ nhất trước khi làm thì đề này có 2 version, chọn cái nào dễ hơn, làm
> nhanh hơn ít phải quay video viết báo cáo phức tạp hơn; chọn 1 trong 2, từ đó
> phân tích những thứ cần làm; sau đó hỏi tôi cần cung cấp những thông tin gì,
> tôi sẽ cung cấp đầy đủ về ngữ cảnh cũng như tài liệu cần thiết, tuyệt đối
> không được bịa

- Output AI: so sánh hai đề và đề xuất Version 1.0 vì mỗi scenario chỉ nhắm một
  endpoint group; cảnh báo chưa thể giả định version cũ còn hợp lệ khi chưa có
  thông báo TA.
- Human review: sinh viên cung cấp Q&A ngày 11/08/2026 xác nhận được chọn một
  trong hai version. Version 1.0 được chốt và phải ghi trong submission.

### AI-02 — Xác định SUT và ngữ cảnh HW04

- Ngày: 16/08/2026; giờ: không có trong UI export.
- Prompt của sinh viên:

> tôi đã thêm mới shop-sut đó trong đó có backend, cứ đọc readme là hiểu ...
> tôi đang chạy wsl trên window nè, tôi sẽ cung cấp cho bạn file báo cáo hw04
> để bạn lấy thông tin đó giải nén rồi đọc

- Output AI: đọc README/setup/API/source; giải nén HW04; xác nhận Nguyễn Lê
  Quan Anh, 23127001, 23KTPM2, repository fork và cấu trúc hồ sơ Markdown/PDF.
  AI phát hiện source backend port 3000, Express/SQLite và database tự seed.
- Human review: thông tin nhận dạng được đối chiếu cả README và báo cáo HW04;
  số liệu HW04 không tái sử dụng làm performance evidence.

### AI-03 — Chọn endpoint từng làm

- Ngày: 16/08/2026; giờ: không có trong UI export.
- Prompt của sinh viên:

> lấy 3 cái trong HW04 tôi làm á, chọn 3 endpoint trong đó là không bị trùng;
> có làm ai aigent để lấy điểm 10

- Output AI ban đầu: chỉ ra FR-03/FR-07/FR-16 không đủ nhóm read-heavy vì
  FR-16 là import/write. AI không gắn nhãn sai FR-16.
- Human review: sinh viên bổ sung bài HW02 cá nhân, xác nhận bốn feature là
  FR-03, FR-07, FR-16, FR-04mb. Mapping cuối dùng FR-04mb/FR-07/FR-03.

### AI-04 — Chốt Stress transactional

- Ngày: 16/08/2026; giờ: không có trong UI export.
- Prompt của sinh viên:

> Stress/transactional: FR-07 — POST /api/cart chọn cái này đi; chọn cái này có
> được ko

- Output AI: xác nhận hợp lệ vì Version 1.0 nêu add-to-cart là ví dụ trực tiếp
  cho transactional. Source cho thấy cart được giữ trong biến in-memory
  `userCarts`, nên stress có thể quan sát latency/memory growth.
- Human review: endpoint được sinh viên chấp thuận; kết luận memory ceiling vẫn
  để chờ run thật.

### AI-05 — Yêu cầu triển khai

- Ngày: 16/08/2026; giờ: không có trong UI export.
- Prompt của sinh viên:

> oke làm hết trước đi, tôi mới cài htop rồi á

- Output AI/artifact:
  - Cài dependency backend nhưng không chạy `npm audit fix` để giữ SUT bất biến.
  - Tải JMeter 5.6.3 từ Apache và xác minh SHA-512.
  - Tạo ba JMX, ba CSV, token preparation, runner, JTL summarizer và audit.
  - Tạo Agent Skill `build-jmeter-performance-evidence`.
  - Smoke-test ba plan ở tải cực nhỏ, lưu `/tmp`, không dùng làm submission.
- Human review: source database được backup trước khi backend reset/seed.
  Cảnh báo Node engine được giữ trong report thay vì che giấu.

### AI-06 — Lỗi CSV được tìm bởi smoke test

- Ngày: 16/08/2026; timestamp run nằm trong `/tmp` smoke JTL, không nộp như
  evidence chính thức.
- Prompt/ngữ cảnh: AI tự kiểm tra testware theo yêu cầu “làm hết trước”.
- Output AI ban đầu: ba CSV có một record rỗng ở cuối; Spike smoke có một 404
  do `${email}` rỗng.
- Human review/fix: phân loại là test-data defect, không tạo Issue cho SUT; xóa
  blank record và chạy lại ba smoke test. Kết quả lần hai: 0 lỗi, label đầy đủ.

### AI-07 — Phân tích raw JTL chính thức

- Ngày/giờ: 16/08/2026, sau Load kết thúc lúc 14:49:22 UTC.
- Prompt/ngữ cảnh của sinh viên: xác nhận đã chạy xong nhưng chưa quay video;
  yêu cầu tiếp tục hoàn thành các task trước, video tổng kết quay sau.
- Output AI từ script deterministic: 1.940 samples; 0 failure; throughput
  16,796 req/s; average 24,713 ms; p95 55 ms; p99 66 ms; max 72 ms.
- Human review: đối chiếu summary terminal, raw JTL và hai screenshot. Ảnh steady
  thấy Node khoảng 7,3% CPU/69.498 KiB RES nhưng chỉ là snapshot, không gọi là
  peak hoặc hardware threshold. Interaction phân tích AI/misinterpretation hunt
  riêng vẫn chờ đủ ba JTL.

### AI-08 — Phân tích Stress chính thức và sửa cách gọi threshold

- Ngày/giờ: 16/08/2026, sau Stress kết thúc lúc 15:09:59 UTC.
- Prompt của sinh viên: cung cấp toàn bộ log Stress và ba screenshot thật,
  yêu cầu AI xem ảnh, đổi tên và tiếp tục xử lý.
- Output AI từ raw JTL: 54.311 samples; 0 failure; throughput 226,544 req/s;
  average 5,575 ms; p95 16 ms; p99 28 ms; max 88 ms.
- Human review: ba ảnh được phân loại thành ramp/peak/final. Vì 80 threads vẫn
  có 0 lỗi và interval cuối đạt 389,1 req/s, kết luận đúng là chưa quan sát
  breaking point; 80 chỉ là ceiling cấu hình, không phải hardware threshold.
  CPU/RAM chỉ được ghi như snapshot nhìn thấy trong htop.

### AI-09 — Phân tích Spike theo baseline/peak/recovery

- Ngày/giờ: 16/08/2026, sau Spike kết thúc lúc 15:19:13 UTC.
- Prompt của sinh viên: “rồi á” sau khi chạy theo hướng dẫn và đặt bốn ảnh thật
  vào thư mục Spike.
- Output AI toàn JTL: 2.814 samples, 0 lỗi, p95 1.530 ms, max 9.403 ms.
- Human review: hai ảnh đầu đều là baseline, không đổi tên ảnh thứ hai thành
  recovery. Phân tích timestamp có guard band cho thấy baseline p95 49 ms,
  spike p95 1.497 ms và recovery p95 56,6 ms. Kết luận latency degradation
  khoảng 30,6 lần và có recovery; không gọi 0 HTTP error là “không ảnh hưởng”.

### AI-10 — Endurance và maximum verified stable point

- Ngày/giờ: 16/08/2026, sau Endurance kết thúc lúc 15:39:34 UTC.
- Prompt của sinh viên: cung cấp toàn bộ terminal log và yêu cầu “rồi á làm
  tiếp đi”; năm screenshot thật đã được đặt trong thư mục evidence.
- Output AI: 61.478 samples, 0 lỗi, overall 68,390 req/s, p95 40 ms. Ba steady
  window sau ramp đạt 70,243/70,746/70,454 req/s và p95 44/32/40 ms.
- Human review: Node RES ở ảnh đầu khoảng 99,4 MiB rồi giữ khoảng 101 MiB tại
  phút 5/10/14/final. Kết luận là maximum **verified** stable point 80 threads,
  ít nhất 70,243 req/s; không gọi đây là hardware maximum vì CPU chưa bão hòa.

### AI-11 — Misinterpretation hunt

- Output AI ban đầu: window Spike 0–60 s được gọi là baseline và báo average
  670,14 ms, p95 4.284,8 ms, max 9.403 ms.
- Human review: sample bắt đầu sát giây 60 hoàn tất khi spike đã gây queue, nên
  window bị transition contamination. Guard band 5–50 s cho baseline đúng:
  average 28,1 ms, p95 49 ms, max 102 ms.
- Output AI ban đầu khác: có xu hướng gọi ceiling Stress 80 threads là breaking
  point. Raw JTL đúng là 54.311 samples, 0 lỗi, p95 16 ms; chưa có breaking.

### AI-12 — Đề xuất tối ưu và feasibility review

- Ngày/giờ: 16/08/2026, sau khi đủ bốn JTL.
- Prompt: phân tích metric thật, đề xuất index/pool/WAL/rate-limit/cache và đối
  chiếu từng đề xuất với source EShop thay vì chấp nhận chung chung.
- Output AI: đề xuất index email, WAL/busy timeout, rate limiting, connection
  pool và cache.
- Human review dựa trên source: index, WAL/busy timeout, rate-limit là feasible
  có điều kiện; connection pool kiểu PostgreSQL không được source hỗ trợ và
  không giải quyết SQLite single-writer; cache reset-token phá semantics.

### AI-13 — Đăng performance issue có evidence

- Ngày: 17/08/2026.
- Prompt của sinh viên: yêu cầu hướng dẫn tiếng Việt để đăng issue từ draft.
- Output AI: cung cấp tiêu đề, mô tả tiếng Việt, metric thật và hai đường dẫn
  screenshot Spike cần đính kèm.
- Human action: sinh viên tự đăng Issue #22 trên fork và cung cấp URL
  <https://github.com/quananh2503/eshop-sut/issues/22>. AI không giả mạo thao
  tác đăng hoặc trạng thái xác minh từ GitHub.

## 4. Artifact attribution

| Artifact | AI contribution | Student responsibility/evidence |
|---|---|---|
| JMX/CSV/scripts | AI tạo bản đầu và smoke-test | Chọn endpoint, review, chạy chính thức |
| Report/AI forms | AI tạo khung và nội dung đã có evidence | Điền metric/evidence thật, ký và chịu trách nhiệm |
| JTL/HTML | Không được AI tạo giả | JMeter sinh từ run thật |
| Screenshot/video/voice | Không được AI tạo | Sinh viên tự chụp/quay/thuyết minh |
| Bug Issue | AI có thể draft sau khi có evidence | Chỉ đăng khi sinh viên tái hiện và xác nhận |
| Agent Skill | AI tạo theo skill-creator; script được chạy thật | Sinh viên demo và giải thích trong video |

## 5. AI Critique — 200–300 từ

AI giúp rút ngắn đáng kể thời gian đọc đề, truy vết API, tạo JMX/CSV và tổng hợp
JTL, nhưng đầu ra ban đầu không thể dùng trực tiếp. Lỗi rõ nhất nằm ở dữ liệu
CSV do AI tạo: record rỗng cuối file khiến JMeter đọc email rỗng và tạo một
Spike smoke 404 giả. Nếu chỉ nhìn error rate, lỗi test-data này rất dễ bị gán
nhầm cho SUT. Human review đã kiểm tra label và request, xóa record rỗng, rồi
chạy lại cả ba smoke test với 0 lỗi.

AI cũng diễn giải sai cửa sổ Spike đầu tiên. Phép chia ngây thơ 0–60 giây báo
“baseline” average 670,14 ms, p95 4.284,8 ms và max 9.403 ms. Các request bắt
đầu sát giây 60 thực tế hoàn tất trong lúc 100 spike users tranh chấp SQLite,
nên cửa sổ đó bị nhiễm transition. Sau review, baseline steady được giới hạn
5–50 giây và cho average 28,1 ms, p95 49 ms, max 102 ms; spike p95 là 1.497 ms
và recovery p95 là 56,6 ms. AI còn có xu hướng gọi 80 threads là breaking
point chỉ vì đó là ceiling của plan, trong khi Stress JTL có 0 lỗi và p95 16
ms. Kết luận đã sửa thành “chưa quan sát breaking point”.

Cuối cùng, các đề xuất tối ưu chỉ được chấp nhận sau khi đối chiếu source.
Index email, WAL/busy-timeout và rate limiting là khả thi có điều kiện; connection
pool kiểu PostgreSQL và cache reset-token không phù hợp với SQLite/semantics
hiện tại. Vì vậy AI hữu ích nhất ở vai trò tạo giả thuyết và tự động hóa phép
tính, còn phân loại dữ liệu, ranh giới pha và quyết định kỹ thuật vẫn cần người
review chịu trách nhiệm.

## 6. Mandatory Disclosure

> Tôi sử dụng OpenAI Codex để phân tích đề, đọc source/tài liệu HW02–HW04, tạo
> bản đầu JMeter test plans, CSV, scripts, Agent Skill và báo cáo. Tôi đã/chưa
> hoàn tất review cuối: `PENDING_STUDENT_FINAL_REVIEW`. Raw JTL, HTML report,
> screenshot, hardware evidence, GitHub Issue, giọng nói và video không được AI
> tạo hoặc giả mạo.
