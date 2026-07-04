# HW02 - Bug Tracker

Sinh vien: Nguyen Le Quan Anh - 23127001 - 23KTPM2

## 1. Quy uoc trang thai bug

| Trang thai | Y nghia |
|---|---|
| `Candidate` | Moi phat hien qua test fail/code reading, can review lai |
| `Confirmed` | Da doi chieu spec va co bang chung tai hien |
| `Reported` | Da tao GitHub Issue va co link |
| `Rejected` | Khong phai bug SUT, do script/test data/moi truong |
| `Fixed` | Da co ban sua |
| `Retested` | Da test lai sau khi fix |

## 2. Quy uoc severity

| Severity | Y nghia |
|---|---|
| `Critical` | Loi nghiem trong ve bao mat, mat du lieu, sai logic cot loi |
| `High` | Chuc nang chinh sai spec, anh huong workflow quan trong |
| `Medium` | Sai validation/UI/logic nhung co workaround |
| `Low` | Loi hien thi, nhan, usability nho |

## 3. Bug tracker

| Bug ID | Feature | Related test case(s) | Title | Severity | Status | Evidence | GitHub Issue |
|---|---|---|---|---|---|---|---|
| BUG-FR03-001 | FR-03 | FR03-DT-001, FR03-BVA-002 | OTP reset password chi co 4 chu so thay vi 6 chu so | High | Candidate | Pending Playwright/API run | Pending |
| BUG-FR03-002 | FR-03 | FR03-DT-007 | Form reset password thieu truong xac nhan mat khau moi | High | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR03-003 | FR-03 | FR03-DT-006, FR03-BVA-004 | API reset password chap nhan mat khau yeu | High | Candidate | Pending API run | Pending |
| BUG-FR03-004 | FR-03 | FR03-UI-001 | Giao dien quen mat khau thieu step indicator | Medium | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR03-005 | FR-03 | FR03-UI-002 | Buoc 1 thieu nut quay lai dang nhap dung spec | Low | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR07-001 | FR-07 | FR07-DT-002 | Them cung mot san pham tao dong moi thay vi tang so luong | High | Candidate | Pending Playwright run | Pending |
| BUG-FR07-002 | FR-07 | FR07-DT-004, FR07-DT-005 | Xoa san pham khoi gio hang khong co confirm dialog | Medium | Candidate | Pending Playwright run | Pending |
| BUG-FR07-003 | FR-07 | FR07-DT-008 | Nhan tong tien hien "Tong tam tinh" thay vi "Tong cong" | Low | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR07-004 | FR-07 | FR07-DT-006, FR07-BVA-005 | Gio hang rong thieu hinh minh hoa | Low | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR07-005 | FR-07 | FR07-BVA-001, FR07-BVA-003 | Gio hang khong co nut +/- de chinh so luong | Medium | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR16-001 | FR-16 | FR16-DT-002 | Admin import chap nhan file khong phai `.csv` | Medium | Candidate | Pending Playwright run | Pending |
| BUG-FR16-002 | FR-16 | FR16-DT-005, FR16-BVA-004 | Import product chap nhan `price = 0` | High | Candidate | Pending API run | Pending |
| BUG-FR16-003 | FR-16 | FR16-DT-006 | Import product chap nhan `price < 0` | High | Candidate | Pending API run | Pending |
| BUG-FR16-004 | FR-16 | FR16-DT-009 | Import CSV khong rollback all-or-nothing khi batch co dong loi | High | Candidate | Pending API run | Pending |
| BUG-FR16-005 | FR-16 | FR16-DT-008 | CSV parser khong ho tro RFC 4180 field co dau phay trong dau nhay kep | Medium | Candidate | Pending Playwright screenshot | Pending |
| BUG-FR04MB-001 | FR-04mb | FR04MB-DT-003, FR04MB-BVA-002 | Mobile profile tu choi so dien thoai hop le bat dau bang 0 | High | Candidate | Pending manual/API evidence | Pending |
| BUG-FR04MB-002 | FR-04mb | FR04MB-DT-009 | Mobile gui `shippingAddress` thay vi `shipping_address`, co the khong cap nhat dia chi | Medium | Candidate | Pending manual/API evidence | Pending |
| BUG-FR04MB-003 | FR-04mb | FR04MB-DT-008 | API profile cho user tu thay doi `role` neu gui field role | Critical | Candidate | Pending API run | Pending |

## 4. Cach cap nhat bug sau khi chay test

1. Neu Playwright/API fail dung voi spec mismatch:
   - Doi `Status` tu `Candidate` sang `Confirmed`.
   - Them path screenshot/trace vao `Evidence`.
   - Tao GitHub Issue.
   - Doi `Status` sang `Reported`.
   - Dan link issue vao `GitHub Issue`.
2. Neu fail do selector/server/data:
   - Doi `Status` sang `Rejected`.
   - Ghi ly do trong bug report hoac test execution notes.
3. Neu test pass:
   - Xoa bug candidate hoac doi status sang `Rejected` voi ly do "Not reproducible".

## 5. Ghi chu quan trong

- Bug tracker nay bat dau tu code reading + expected failures theo spec.
- Chi nhung bug co evidence thuc thi hoac evidence manual/API ro rang moi nen dua vao danh sach bug chinh trong report cuoi.
