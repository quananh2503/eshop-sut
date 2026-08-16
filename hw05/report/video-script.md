# Kịch bản video HW05

Video phải do sinh viên tự quay, giọng tiếng Việt thật, tối thiểu 6 phút. JMeter
hoặc terminal chạy JMeter và htop/Task Manager phải cùng frame.

## Timeline đề xuất 8–10 phút

1. **0:00–0:40 — Identity và phạm vi**
   - Hiện `whoami`, `hostname`, MSSV và branch.
   - Nói rõ chọn Version 1.0.
2. **0:40–1:30 — SUT và hardware**
   - Backend port 3000, Task Manager/htop, dxdiag/spec.
3. **1:30–3:30 — Ba plan**
   - Load/profile, Stress/cart, Spike/forgot password.
   - Mở ba CSV và ba report view khác nhau.
4. **3:30–5:30 — Chạy và evidence**
   - Không cần chạy lại run dài: mở command, raw JTL, HTML và screenshot thật.
   - Load: 1.940 samples, p95 55 ms, 0 lỗi.
   - Stress: 54.311 samples, p95 16 ms, 0 lỗi; 80 threads chưa phải breaking.
   - Spike: baseline/spike/recovery p95 là 49/1.497/56,6 ms.
5. **5:30–6:40 — Human Review**
   - Giải thích CSV blank record làm Spike smoke có 404 và cách sửa.
   - Giải thích vì sao window 0–60 s bị transition contamination và dùng
     baseline steady 5–50 s.
6. **6:40–7:40 — AI analysis/critique**
   - Chỉ misinterpretation thật: 80 threads là ceiling, không phải breaking.
   - Nói index/WAL/rate-limit có điều kiện; pool/cache reset-token không phù hợp.
7. **7:40–8:40 — Agent Skill**
   - Mở `SKILL.md`, giải thích giữ raw evidence và không dựng metric.
   - Chạy `python3 scripts/audit_submission.py --phase build` và chỉ 0 failure.
8. **8:40–9:10 — Kết luận**
   - Endurance: 80 threads, >=70,243 req/s steady, p95 32–44 ms, Node RES
     khoảng 101 MiB; đây là maximum verified point, không phải hardware max.
   - Mở flowchart continuous testing và issue Spike; chỉ nói “đã đăng” khi có
     URL thật trên fork.

Không đọc số liệu chưa có trên màn hình. Không quay token JWT, mật khẩu hoặc
file `runtime-auth.properties`.
