# HW02 - Phan tich Domain Testing va Boundary Value Analysis

Sinh vien: Nguyen Le Quan Anh - 23127001 - 23KTPM2

Repo ca nhan: https://github.com/quananh2503/eshop-sut

## 1. Pham vi feature

Theo phan cong Member 1 va de bai HW02, bai lam chon 4 feature chinh:

| Pool | Feature | Nen tang | Cach thuc kiem thu |
|---|---|---|---|
| A | FR-03 - Forgot password and password reset | Web/API | Domain + BVA + Playwright/API evidence |
| B | FR-07 - Shopping cart | Web | Domain + BVA + Playwright evidence |
| C | FR-16 - Product import from CSV | Admin Web/API | Domain + BVA + Playwright/API evidence |
| D | FR-04mb - Personal profile management | Mobile/API | Domain + BVA + manual/code/API evidence |

Ghi chu: `FR-04mb` la feature mobile. Vi frontend mobile la React Native/Expo, Playwright khong phai cong cu phu hop de automate native mobile. Do do phan mobile se duoc thiet ke test theo Domain/BVA va co the kiem chung bang manual/API/code evidence.

## 2. Phuong phap ap dung

### 2.1 Domain Testing

Voi moi feature:

1. Xac dinh cac input variables va dieu kien nghiep vu tu `README.md` va `api_specification.md`.
2. Chia mien dau vao thanh cac lop tuong duong:
   - Valid equivalence classes.
   - Invalid equivalence classes.
   - Special/security/format classes neu lien quan.
3. Tao test case dai dien cho tung lop.
4. Doi chieu ket qua thuc te voi dac ta, khong lay hanh vi hien tai cua code lam chuan.

### 2.2 Boundary Value Analysis

Voi cac input co bien ro:

1. Xac dinh min/max hoac nguong nghiep vu.
2. Chon gia tri tai bien va sat bien:
   - `min - 1`, `min`, `min + 1`
   - `max - 1`, `max`, `max + 1`
3. Neu khong co max trong spec, chon bien thuc te hop ly de kiem tra stability/UI/API, vi du chuoi rong, chuoi dai, file rong, 1 dong, nhieu dong.
4. Ghi ro test nao co the automate bang Playwright va test nao can manual/API.

## 3. FR-03 - Forgot password and password reset

### 3.1 Dac ta lien quan

FR-03 gom 2 buoc:

- Buoc 1: nguoi dung nhap email da dang ky de lay OTP.
- He thong sinh OTP 6 chu so va hien thi tren man hinh trong moi truong demo.
- Giao dien co step indicator, vi du "Buoc 1 / 2".
- Co nut quay lai dang nhap.
- Buoc 2: nguoi dung nhap OTP, mat khau moi, xac nhan mat khau moi.
- Mat khau moi tuan thu rule FR-01: toi thieu 8 ky tu, co chu hoa, chu thuong, so, ky tu dac biet.
- OTP chi hop le voi email da yeu cau.

### 3.2 Input variables

| Bien | Mien hop le | Mien khong hop le |
|---|---|---|
| Email | Email da dang ky, dung format | Rong, sai format, chua dang ky |
| OTP | 6 chu so, dung voi email yeu cau | Rong, khong phai so, khac 6 chu so, sai OTP, OTP cua email khac |
| New password | >= 8 ky tu, co uppercase/lowercase/digit/special | Rong, < 8 ky tu, thieu tung nhom ky tu, chi co khoang trang/sai policy |
| Confirm password | Khop voi new password | Rong, khong khop |
| Step UI | Co step indicator va quay lai dang nhap | Thieu step indicator, thieu nut quay lai login |

### 3.3 Equivalence classes

| ID | Input | Lop tuong duong | Loai | Ket qua mong doi |
|---|---|---|---|---|
| FR03-EC-EMAIL-01 | Email | Email ton tai trong CSDL | Valid | Tao OTP thanh cong |
| FR03-EC-EMAIL-02 | Email | Email khong ton tai | Invalid | Bao loi khong tim thay/khong gui OTP |
| FR03-EC-EMAIL-03 | Email | Sai dinh dang email | Invalid | UI/API tu choi |
| FR03-EC-OTP-01 | OTP | Dung OTP cua email vua yeu cau | Valid | Cho phep reset neu password hop le |
| FR03-EC-OTP-02 | OTP | Sai OTP | Invalid | Bao loi |
| FR03-EC-OTP-03 | OTP | OTP cua email khac | Invalid | Bao loi |
| FR03-EC-PWD-01 | New password | Password manh hop le | Valid | Reset thanh cong |
| FR03-EC-PWD-02 | New password | Password yeu | Invalid | Tu choi |
| FR03-EC-CONF-01 | Confirm password | Khop new password | Valid | Cho phep submit |
| FR03-EC-CONF-02 | Confirm password | Khong khop | Invalid | Tu choi |

### 3.4 Boundary values

| Bien | Bien/nguong | Gia tri test |
|---|---|---|
| OTP length | Spec yeu cau 6 chu so | 5 digits, 6 digits, 7 digits |
| Password length | Min = 8 | 7 chars, 8 chars, 9 chars |
| Password character classes | 4 nhom bat buoc | thieu uppercase, thieu lowercase, thieu digit, thieu special, du 4 nhom |
| Email | Empty/non-empty | empty, valid registered email |

## 4. FR-07 - Shopping cart

### 4.1 Dac ta lien quan

- Hien thi cac cot: San pham, Don gia, So luong co nut +/-, Thanh tien, Thao tac.
- Them cung mot san pham vao gio se tang so luong, khong tao dong moi.
- Nut xoa san pham phai co dialog xac nhan.
- Co nut tiep tuc mua sam.
- Tong tien hien nhan chinh xac: "Tong cong".
- Gio hang trong co hinh minh hoa va thong bao ro rang.

### 4.2 Input variables

| Bien | Mien hop le | Mien khong hop le |
|---|---|---|
| Product | San pham ton tai | San pham khong ton tai/null |
| Quantity | So nguyen duong, min 1 | 0, am, decimal, chuoi, rong |
| Add duplicate product | Cung product id | Tao dong moi thay vi cong quantity |
| Remove action | Co confirm dialog | Xoa ngay khong confirm |
| Total label | "Tong cong" | "Tong tam tinh" hoac nhan sai |
| Empty cart UI | Co thong bao + hinh minh hoa | Thieu hinh/thong bao khong ro |

### 4.3 Equivalence classes

| ID | Input | Lop tuong duong | Loai | Ket qua mong doi |
|---|---|---|---|---|
| FR07-EC-ADD-01 | Add product | San pham moi chua co trong gio | Valid | Them 1 dong moi |
| FR07-EC-ADD-02 | Add product | San pham da co trong gio | Valid | Tang quantity dong hien co |
| FR07-EC-QTY-01 | Quantity | So nguyen duong | Valid | Cap nhat thanh tien |
| FR07-EC-QTY-02 | Quantity | 0 hoac am | Invalid | Tu choi hoac reset ve min 1 |
| FR07-EC-QTY-03 | Quantity | Chuoi/decimal | Invalid | Tu choi hoac normalize hop ly |
| FR07-EC-REMOVE-01 | Remove | Xac nhan xoa | Valid | Xoa san pham |
| FR07-EC-REMOVE-02 | Remove | Huy confirm | Valid | Giu san pham |
| FR07-EC-EMPTY-01 | Empty cart | Gio hang rong | Valid UI state | Hien empty state ro rang |

### 4.4 Boundary values

| Bien | Bien/nguong | Gia tri test |
|---|---|---|
| Quantity | Min = 1 | 0, 1, 2 |
| Quantity | Gia tri lon | 99, 100, 101 |
| Duplicate add | So lan them cung product | 1 lan, 2 lan, 3 lan |
| Cart rows | So san pham trong gio | 0 item, 1 item, 2 item |

## 5. FR-16 - Product import from CSV

### 5.1 Dac ta lien quan

- Admin upload file `.csv`.
- Header bat buoc: `name,price,description,imageUrl,category_id`.
- Ho tro field co dau phay neu boc trong dau nhay kep theo RFC 4180.
- Validate truoc khi import:
  - `name` khong rong.
  - `price` la so duong.
- Neu co loi bat ky dong nao, toan bo import rollback theo all-or-nothing.
- Hien report ro: so dong thanh cong, so dong loi, ly do.

### 5.2 Input variables

| Bien | Mien hop le | Mien khong hop le |
|---|---|---|
| File extension | `.csv` | `.txt`, `.xlsx`, khong file |
| Header | Dung thu tu/ten cot theo spec | Thieu cot, sai ten cot, sai thu tu neu parser yeu cau |
| Row count | >= 1 data row | File rong, chi co header |
| Name | Non-empty string | Rong, whitespace only |
| Price | So duong > 0 | 0, am, chuoi, rong |
| Description | String, co the co dau phay neu quote dung | Field co dau phay nhung parser cat sai |
| category_id | Ton tai trong categories | Rong, khong ton tai, khong phai so |
| Transaction | Tat ca row hop le | Co 1 row loi thi rollback toan bo |

### 5.3 Equivalence classes

| ID | Input | Lop tuong duong | Loai | Ket qua mong doi |
|---|---|---|---|---|
| FR16-EC-FILE-01 | File | CSV hop le | Valid | Import thanh cong |
| FR16-EC-FILE-02 | File | Khong phai CSV | Invalid | Tu choi file |
| FR16-EC-HEADER-01 | Header | Header dung | Valid | Parser chap nhan |
| FR16-EC-HEADER-02 | Header | Thieu/sai header | Invalid | Bao loi header |
| FR16-EC-NAME-01 | name | Co ten san pham | Valid | Dong hop le |
| FR16-EC-NAME-02 | name | Rong | Invalid | Bao loi va rollback |
| FR16-EC-PRICE-01 | price | So duong | Valid | Dong hop le |
| FR16-EC-PRICE-02 | price | 0/am/chuoi | Invalid | Bao loi va rollback |
| FR16-EC-RFC-01 | description | Co dau phay trong quotes | Valid | Parse dung 1 field |
| FR16-EC-TXN-01 | mixed rows | Co it nhat 1 dong loi | Invalid batch | Khong import bat ky dong nao |

### 5.4 Boundary values

| Bien | Bien/nguong | Gia tri test |
|---|---|---|
| Row count | Min data row = 1 | 0 row, 1 row, 2 rows |
| Price | Min valid > 0 | -1, 0, 1 |
| Name length | Empty/non-empty | empty, 1 char, 255 chars, 256 chars |
| File extension | Accepted `.csv` | `.csv`, `.txt` |
| Transaction | First invalid row position | invalid first row, invalid middle row, invalid last row |

## 6. FR-04mb - Personal profile management

### 6.1 Dac ta lien quan

Theo FR-04 va phan mobile, nguoi dung da dang nhap co the cap nhat:

- Ho ten.
- So dien thoai.
- Dia chi giao hang mac dinh.

Rang buoc:

- So dien thoai hop le bat dau bang `0`, tu 10-11 chu so.
- Email khong duoc thay doi qua giao dien.
- Nguoi dung chi cap nhat ho so cua chinh minh.
- Khong the tu thay doi `role`.

### 6.2 Input variables

| Bien | Mien hop le | Mien khong hop le |
|---|---|---|
| Auth state | Da dang nhap | Chua dang nhap/token sai |
| Name | Non-empty user name | Rong/chi khoang trang neu spec UI yeu cau |
| Phone | Bat dau bang 0, 10-11 chu so | Khong bat dau 0, 9 chu so, 12 chu so, chu cai, ky tu dac biet |
| Shipping address | Chuoi dia chi hop le | Rong/qua dai/script neu can security |
| Email | Read-only | Co the sua email |
| Role | Khong duoc cap nhat | API/UI cho user tu doi role |

### 6.3 Equivalence classes

| ID | Input | Lop tuong duong | Loai | Ket qua mong doi |
|---|---|---|---|---|
| FR04MB-EC-AUTH-01 | Auth | User da dang nhap | Valid | Hien profile va cho cap nhat |
| FR04MB-EC-AUTH-02 | Auth | Chua dang nhap | Invalid | Yeu cau dang nhap |
| FR04MB-EC-PHONE-01 | Phone | 10 chu so bat dau 0 | Valid | Chap nhan |
| FR04MB-EC-PHONE-02 | Phone | 11 chu so bat dau 0 | Valid | Chap nhan |
| FR04MB-EC-PHONE-03 | Phone | Khong bat dau 0 | Invalid | Tu choi |
| FR04MB-EC-PHONE-04 | Phone | Chua ky tu khong phai so | Invalid | Tu choi |
| FR04MB-EC-EMAIL-01 | Email | Read-only | Valid UI behavior | Khong cho sua |
| FR04MB-EC-ROLE-01 | Role | User gui field role qua API | Invalid/security | Backend phai tu choi |

### 6.4 Boundary values

| Bien | Bien/nguong | Gia tri test |
|---|---|---|
| Phone length | Min = 10 | 9 digits, 10 digits, 11 digits, 12 digits |
| Phone prefix | Must start with 0 | `0912345678`, `1912345678` |
| Name | Empty/non-empty | empty, 1 char, normal name |
| Address length | Empty/normal/long | empty, normal address, long 256+ chars |

## 7. Mapping sang automation

| Feature | Domain/BVA report | Playwright | API/manual evidence |
|---|---|---|---|
| FR-03 | Yes | Yes | Yes |
| FR-07 | Yes | Yes | Optional |
| FR-16 | Yes | Yes | Yes |
| FR-04mb | Yes | No/limited | Yes |

## 8. AI gap analysis se can ghi

Khi dung AI de goi y test case, can review cac diem AI de bo sot:

- AI co the chi dua happy path, thieu invalid class.
- AI co the bo sot rollback all-or-nothing cua CSV import.
- AI co the khong phan biet spec yeu cau OTP 6 so voi code hien tai 4 so.
- AI co the de xuat Playwright cho mobile native, trong khi React Native/Expo khong phu hop voi Playwright browser.
- AI co the khong nhan ra security issue nhu user tu doi `role` qua API.
