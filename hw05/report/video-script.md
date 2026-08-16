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
   - Demo ít nhất một run từ lệnh đến JTL/HTML.
   - Mở HTML p95/throughput/error và chỉ resource monitor cùng frame.
5. **5:30–6:40 — Human Review**
   - Giải thích CSV blank record làm Spike smoke có 404 và cách sửa.
   - Phân biệt smoke metric với run chính thức.
6. **6:40–7:40 — AI analysis/critique**
   - Chỉ đúng một misinterpretation thật và giá trị đúng trong raw JTL.
7. **7:40–8:40 — Agent Skill**
   - Mở `SKILL.md`, chạy script audit trên một endpoint group hoặc toàn suite.
8. **8:40–9:10 — Kết luận**
   - Threshold endurance, số issue thật và trade-off pipeline.

Không đọc số liệu chưa có trên màn hình. Không quay token JWT, mật khẩu hoặc
file `runtime-auth.properties`.

