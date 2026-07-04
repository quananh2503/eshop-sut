# HW02 - Test Cases

Sinh vien: Nguyen Le Quan Anh - 23127001 - 23KTPM2

Trang thai:

- `Designed`: da thiet ke, chua chay.
- `Automated`: da/du kien automate bang Playwright/API.
- `Manual`: can kiem tra thu cong hoac bang evidence code/API.
- `Pass/Fail/Blocked/Not run`: cap nhat sau khi thuc thi.

## 1. FR-03 - Forgot password and password reset

| ID | Ky thuat | Muc tieu | Tien dieu kien | Du lieu test | Buoc thuc hien | Expected result | Evidence mode | Status |
|---|---|---|---|---|---|---|---|---|
| FR03-DT-001 | Domain | Lay OTP voi email da dang ky | User `test@eshop.com` ton tai | `test@eshop.com` | Mo Forgot Password, nhap email, submit | He thong tao OTP va chuyen sang buoc 2 | Playwright | Designed |
| FR03-DT-002 | Domain | Tu choi email chua dang ky | Backend dang chay | `notfound@example.com` | Nhap email, submit | Hien loi phu hop, khong chuyen buoc reset | Playwright/API | Designed |
| FR03-DT-003 | Domain | Tu choi email sai format | Backend dang chay | `abc`, `abc@` | Nhap email sai format, submit | UI/API tu choi email sai format | Playwright/API | Designed |
| FR03-DT-004 | Domain | Reset thanh cong voi OTP dung va password manh | Da lay OTP | OTP dung, `NewPass123!` | Nhap OTP, password moi, confirm password, submit | Reset thanh cong, chuyen ve login | Playwright/API | Designed |
| FR03-DT-005 | Domain | Tu choi OTP sai | Da lay OTP | `000000` | Nhap OTP sai va password hop le | Hien loi OTP/email khong hop le | Playwright/API | Designed |
| FR03-DT-006 | Domain | Tu choi password moi yeu | Da lay OTP | `weak` | Nhap OTP dung, password yeu | Hien loi password policy, khong reset | Playwright/API | Designed |
| FR03-DT-007 | Domain | Tu choi confirm password khong khop | Da lay OTP | `NewPass123!` vs `Other123!` | Nhap OTP dung, password va confirm khac nhau | UI tu choi do confirm mismatch | Manual/Playwright | Designed |
| FR03-DT-008 | Domain | OTP chi hop le voi email da yeu cau | Co 2 email test | OTP cua email A dung cho email B | Request OTP email A, reset bang email B | Reset bi tu choi | API | Designed |
| FR03-BVA-001 | BVA | OTP 5 chu so | Da lay OTP | `12345` | Reset voi OTP 5 chu so | Tu choi do khong du 6 chu so | API/Playwright | Designed |
| FR03-BVA-002 | BVA | OTP 6 chu so | Da lay OTP | OTP 6 chu so dung | Reset voi OTP dung | Chap nhan neu password hop le | API/Playwright | Designed |
| FR03-BVA-003 | BVA | OTP 7 chu so | Da lay OTP | `1234567` | Reset voi OTP 7 chu so | Tu choi do qua 6 chu so | API/Playwright | Designed |
| FR03-BVA-004 | BVA | Password 7 ky tu | Da lay OTP | `Aa1!aaa` | Reset voi password 7 ky tu | Tu choi | API/Playwright | Designed |
| FR03-BVA-005 | BVA | Password 8 ky tu hop le | Da lay OTP | `Aa1!aaaa` | Reset voi password 8 ky tu | Chap nhan neu OTP dung | API/Playwright | Designed |
| FR03-BVA-006 | BVA | Password 9 ky tu hop le | Da lay OTP | `Aa1!aaaaa` | Reset voi password 9 ky tu | Chap nhan neu OTP dung | API/Playwright | Designed |
| FR03-UI-001 | Domain | Kiem tra step indicator | Mo trang forgot password | N/A | Quan sat buoc 1 va buoc 2 | Co hien "Buoc 1 / 2" va "Buoc 2 / 2" | Playwright screenshot | Designed |
| FR03-UI-002 | Domain | Kiem tra nut quay lai dang nhap | Mo trang forgot password | N/A | Tim nut/link quay lai dang nhap | Co nut quay lai login | Playwright screenshot | Designed |

## 2. FR-07 - Shopping cart

| ID | Ky thuat | Muc tieu | Tien dieu kien | Du lieu test | Buoc thuc hien | Expected result | Evidence mode | Status |
|---|---|---|---|---|---|---|---|---|
| FR07-DT-001 | Domain | Them san pham moi vao gio | Web dang chay | Product id 1, quantity 1 | Mo product detail, add to cart | Gio co 1 dong san pham, quantity 1 | Playwright | Designed |
| FR07-DT-002 | Domain | Them cung san pham lan 2 | Gio da co product id 1 | Product id 1, quantity 1 | Add cung san pham lan 2 | Gio van 1 dong, quantity tang len 2 | Playwright | Designed |
| FR07-DT-003 | Domain | Them 2 san pham khac nhau | Gio rong | Product id 1 va id 2 | Add 2 product khac nhau | Gio co 2 dong rieng | Playwright | Designed |
| FR07-DT-004 | Domain | Xoa san pham co confirm | Gio co 1 san pham | Click xoa | Click xoa, chon confirm | San pham bi xoa sau confirm | Playwright | Designed |
| FR07-DT-005 | Domain | Huy xoa san pham | Gio co 1 san pham | Click xoa, cancel | Click xoa, chon cancel | San pham van con trong gio | Playwright | Designed |
| FR07-DT-006 | Domain | Empty cart UI | Gio rong | N/A | Mo trang cart | Hien thong bao ro va hinh minh hoa | Playwright screenshot | Designed |
| FR07-DT-007 | Domain | Nut tiep tuc mua sam | Trang cart | N/A | Click tiep tuc mua sam | Quay ve trang chu | Playwright | Designed |
| FR07-DT-008 | Domain | Nhan tong tien dung spec | Gio co san pham | Product id 1 | Mo cart | Hien nhan "Tong cong" | Playwright screenshot | Designed |
| FR07-BVA-001 | BVA | Quantity min - 1 | Gio co item | quantity 0 | Dat quantity 0 hoac click minus tu 1 | He thong tu choi, khong co quantity 0 | Playwright | Designed |
| FR07-BVA-002 | BVA | Quantity min | Gio co item | quantity 1 | Them san pham quantity 1 | Thanh tien = price x 1 | Playwright | Designed |
| FR07-BVA-003 | BVA | Quantity min + 1 | Gio co item | quantity 2 | Tang quantity len 2 | Thanh tien = price x 2 | Playwright | Designed |
| FR07-BVA-004 | BVA | Quantity lon | Gio co item | quantity 100 | Dat/tang quantity 100 | Total tinh dung hoac co validation max neu spec bo sung | Playwright/API | Designed |
| FR07-BVA-005 | BVA | Cart row 0 | Gio rong | 0 item | Mo cart | Empty state ro rang | Playwright | Designed |
| FR07-BVA-006 | BVA | Cart row 1 | Gio co 1 item | 1 item | Mo cart | Hien 1 dong | Playwright | Designed |
| FR07-BVA-007 | BVA | Cart row 2 | Gio co 2 product khac nhau | 2 items | Mo cart | Hien 2 dong | Playwright | Designed |

## 3. FR-16 - Product import from CSV

| ID | Ky thuat | Muc tieu | Tien dieu kien | Du lieu test | Buoc thuc hien | Expected result | Evidence mode | Status |
|---|---|---|---|---|---|---|---|---|
| FR16-DT-001 | Domain | Import CSV hop le 1 dong | Admin da login | Header dung, 1 product hop le | Upload CSV, click import | Import thanh cong 1/1 | Playwright/API | Designed |
| FR16-DT-002 | Domain | Tu choi file khong phai CSV | Admin da login | `products.txt` | Upload file txt | UI tu choi file khong phai CSV | Playwright | Designed |
| FR16-DT-003 | Domain | Tu choi header sai | Admin da login | Header thieu `price` | Upload/import | Bao loi header, khong import | Playwright/API | Designed |
| FR16-DT-004 | Domain | Tu choi name rong | Admin da login | Row co `name` rong | Upload/import | Bao loi name rong va rollback | Playwright/API | Designed |
| FR16-DT-005 | Domain | Tu choi price = 0 | Admin da login | `price=0` | Upload/import | Bao loi price phai duong va rollback | Playwright/API | Designed |
| FR16-DT-006 | Domain | Tu choi price am | Admin da login | `price=-1` | Upload/import | Bao loi price phai duong va rollback | Playwright/API | Designed |
| FR16-DT-007 | Domain | Tu choi price khong phai so | Admin da login | `price=abc` | Upload/import | Bao loi price invalid va rollback | Playwright/API | Designed |
| FR16-DT-008 | Domain | Ho tro RFC 4180 field co dau phay | Admin da login | `"Mo ta co, dau phay"` | Upload/import | Parser giu description la 1 field | Playwright/API | Designed |
| FR16-DT-009 | Domain | Rollback khi batch co dong loi | Admin da login | Row 1 hop le, row 2 name rong | Upload/import | 0 row duoc import, report 1 loi | Playwright/API | Designed |
| FR16-DT-010 | Domain | Report import ro rang | Admin da login | Batch hop le/loi | Upload/import | Hien so dong thanh cong, so dong loi, ly do | Playwright screenshot | Designed |
| FR16-BVA-001 | BVA | File 0 data row | Admin da login | Chi co header | Upload/import | Bao khong co du lieu de import | Playwright/API | Designed |
| FR16-BVA-002 | BVA | File 1 data row | Admin da login | 1 row hop le | Upload/import | Import thanh cong | Playwright/API | Designed |
| FR16-BVA-003 | BVA | File 2 data rows | Admin da login | 2 rows hop le | Upload/import | Import 2/2 | Playwright/API | Designed |
| FR16-BVA-004 | BVA | Price min - 1 | Admin da login | `price=0` | Upload/import | Tu choi | Playwright/API | Designed |
| FR16-BVA-005 | BVA | Price min | Admin da login | `price=1` | Upload/import | Chap nhan | Playwright/API | Designed |
| FR16-BVA-006 | BVA | Price sat tren min | Admin da login | `price=2` | Upload/import | Chap nhan | Playwright/API | Designed |
| FR16-BVA-007 | BVA | Name empty | Admin da login | `name=""` | Upload/import | Tu choi | Playwright/API | Designed |
| FR16-BVA-008 | BVA | Name 1 char | Admin da login | `name="A"` | Upload/import | Chap nhan | Playwright/API | Designed |
| FR16-BVA-009 | BVA | Name dai | Admin da login | 256 chars | Upload/import | Chap nhan hoac bao loi neu spec/product rule max 255 duoc ap dung | API | Designed |

## 4. FR-04mb - Personal profile management

| ID | Ky thuat | Muc tieu | Tien dieu kien | Du lieu test | Buoc thuc hien | Expected result | Evidence mode | Status |
|---|---|---|---|---|---|---|---|---|
| FR04MB-DT-001 | Domain | Hien profile khi da dang nhap | User da login mobile | `test@eshop.com` | Mo profile | Hien email read-only, name, phone, address | Manual/API | Designed |
| FR04MB-DT-002 | Domain | Chan profile khi chua dang nhap | Chua login | N/A | Mo profile | Yeu cau dang nhap | Manual | Designed |
| FR04MB-DT-003 | Domain | Cap nhat phone hop le 10 chu so | User da login | `0912345678` | Nhap phone, save | Chap nhan | Manual/API | Designed |
| FR04MB-DT-004 | Domain | Cap nhat phone hop le 11 chu so | User da login | `09123456789` | Nhap phone, save | Chap nhan | Manual/API | Designed |
| FR04MB-DT-005 | Domain | Tu choi phone khong bat dau 0 | User da login | `1912345678` | Nhap phone, save | Tu choi | Manual/API | Designed |
| FR04MB-DT-006 | Domain | Tu choi phone co chu cai | User da login | `09abc45678` | Nhap phone, save | Tu choi | Manual/API | Designed |
| FR04MB-DT-007 | Domain | Email khong duoc sua | User da login | Email field | Thu sua email | Email field read-only | Manual screenshot | Designed |
| FR04MB-DT-008 | Domain | User khong duoc tu doi role | User token hop le | Body co `role=admin` | Goi API update profile co role | Backend tu choi hoac role khong doi | API | Designed |
| FR04MB-DT-009 | Domain | Dia chi giao hang duoc cap nhat | User da login | `123 Le Loi, Q1` | Nhap address, save | Profile luu address moi | Manual/API | Designed |
| FR04MB-BVA-001 | BVA | Phone 9 chu so | User da login | `091234567` | Save profile | Tu choi do < 10 digits | Manual/API | Designed |
| FR04MB-BVA-002 | BVA | Phone 10 chu so | User da login | `0912345678` | Save profile | Chap nhan | Manual/API | Designed |
| FR04MB-BVA-003 | BVA | Phone 11 chu so | User da login | `09123456789` | Save profile | Chap nhan | Manual/API | Designed |
| FR04MB-BVA-004 | BVA | Phone 12 chu so | User da login | `091234567890` | Save profile | Tu choi do > 11 digits | Manual/API | Designed |
| FR04MB-BVA-005 | BVA | Name empty | User da login | empty name | Save profile | Tu choi hoac bao loi neu name bat buoc | Manual/API | Designed |
| FR04MB-BVA-006 | BVA | Name 1 ky tu | User da login | `A` | Save profile | Chap nhan neu khong co min length khac | Manual/API | Designed |
| FR04MB-BVA-007 | BVA | Address rong | User da login | empty address | Save profile | Chap nhan/tu choi theo spec hien thi cua app, can ghi nhan | Manual/API | Designed |

## 5. Test summary ban dau

| Feature | Designed | Planned automated | Planned manual/API | Passed | Failed | Not run |
|---|---:|---:|---:|---:|---:|---:|
| FR-03 | 16 | 13 | 3 | 0 | 0 | 16 |
| FR-07 | 15 | 15 | 0 | 0 | 0 | 15 |
| FR-16 | 19 | 16 | 3 | 0 | 0 | 19 |
| FR-04mb | 16 | 0 | 16 | 0 | 0 | 16 |
| **Total** | **66** | **44** | **22** | **0** | **0** | **66** |

Ghi chu: So lieu passed/failed/not run se cap nhat sau khi thuc thi Playwright/manual/API.
