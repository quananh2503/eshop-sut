# FR-04mb - Manual Test Cases cho Personal Profile Management

Sinh viên thực hiện: Nguyễn Lê Quan Anh - 23127001  
Feature: FR-04mb - Personal profile management trên mobile  
Phương pháp: Domain Testing + Boundary Value Analysis  
Hình thức thực thi: Manual test trên iPhone bằng Expo Go  

## 1. Phạm vi kiểm thử

FR-04mb kiểm thử chức năng quản lý hồ sơ cá nhân trên mobile. Theo đặc tả FR-04:

- Người dùng đã đăng nhập có thể cập nhật Họ tên, Số điện thoại, Địa chỉ giao hàng mặc định.
- Số điện thoại hợp lệ phải bắt đầu bằng `0`, dài từ 10-11 chữ số.
- Email không được phép thay đổi qua giao diện.
- Người dùng chỉ được cập nhật hồ sơ của chính mình.
- Người dùng không thể tự thay đổi thuộc tính `role`.

## 2. Tài khoản và điều kiện trước khi test

Backend phải đang chạy và iPhone truy cập được:

```text
http://192.168.1.5:3000/api/products
```

Tài khoản test:

```text
Email: test@eshop.com
Password: Test1234!
```

Nếu login bị lỗi do tài khoản bị khóa hoặc database bẩn, reset backend database rồi chạy lại server:

```cmd
node database.js
node server.js
```

## 3. Bảng test cases

| Test ID | Kỹ thuật | Mục tiêu | Dữ liệu test | Bước thực hiện | Expected result | Evidence cần chụp |
|---|---|---|---|---|---|---|
| FR04MB-TC-001 | Domain - Auth valid | Người dùng đã đăng nhập xem được màn hình hồ sơ | `test@eshop.com` / `Test1234!` | 1. Mở app mobile. 2. Bấm `Đăng nhập`. 3. Nhập email/password. 4. Bấm `Sign In`. 5. Bấm `Chào, <user>` trên header. | Hiển thị màn hình `Hồ sơ của bạn` với Email, Họ Tên, Số điện thoại, Địa chỉ giao hàng. | Ảnh màn hình hồ sơ sau đăng nhập. |
| FR04MB-TC-002 | Domain - Auth invalid | Người dùng chưa đăng nhập không được xem/sửa hồ sơ | Chưa login | 1. Mở app. 2. Nếu đang login thì bấm `Thoát`. 3. Bấm khu vực `Đăng nhập`/vào profile nếu có. | App yêu cầu đăng nhập, không cho sửa hồ sơ khi chưa authenticated. | Ảnh màn hình yêu cầu đăng nhập. |
| FR04MB-TC-003 | Domain - Email read-only | Email không được sửa qua giao diện | Email hiện tại của user | 1. Login. 2. Vào `Hồ sơ của bạn`. 3. Chạm vào ô `Email (Không đổi)`. 4. Thử nhập/xóa nội dung. | Ô email không cho chỉnh sửa, nội dung email giữ nguyên. | Ảnh ô email read-only. |
| FR04MB-TC-004 | Domain - Name valid | Cập nhật họ tên hợp lệ | `Nguyen Le Quan Anh Mobile` | 1. Login. 2. Vào profile. 3. Sửa `Họ Tên`. 4. Bấm `Cập nhật`. | App báo cập nhật thành công, tên mới được hiển thị trong profile/header. | Ảnh trước khi bấm cập nhật và ảnh thông báo/thành công. |
| FR04MB-TC-005 | Boundary - Name empty | Không nên chấp nhận họ tên rỗng | Rỗng `""` | 1. Xóa toàn bộ `Họ Tên`. 2. Giữ phone/address hợp lệ. 3. Bấm `Cập nhật`. | Hệ thống nên từ chối hoặc báo lỗi tên không được rỗng. | Ảnh dữ liệu nhập và thông báo lỗi/thành công thực tế. |
| FR04MB-TC-006 | Boundary - Name 1 char | Kiểm tra biên tên rất ngắn | `A` | 1. Nhập `Họ Tên = A`. 2. Phone/address hợp lệ. 3. Bấm `Cập nhật`. | Nếu spec chỉ yêu cầu non-empty thì chấp nhận; nếu có rule min length thì báo lỗi rõ ràng. | Ảnh kết quả sau cập nhật. |
| FR04MB-TC-007 | Boundary - Phone 9 digits | Từ chối số điện thoại dưới min | `012345678` | 1. Nhập phone 9 chữ số bắt đầu bằng 0. 2. Bấm `Cập nhật`. | Bị từ chối vì phone phải 10-11 chữ số. | Ảnh phone nhập và thông báo lỗi. |
| FR04MB-TC-008 | Boundary - Phone 10 digits valid | Chấp nhận phone hợp lệ 10 chữ số bắt đầu bằng 0 | `0123456789` | 1. Nhập phone `0123456789`. 2. Bấm `Cập nhật`. | Phải cập nhật thành công theo spec. Nếu app báo lỗi thì ghi bug. | Ảnh phone nhập và thông báo kết quả. |
| FR04MB-TC-009 | Boundary - Phone 11 digits valid | Chấp nhận phone hợp lệ 11 chữ số bắt đầu bằng 0 | `01234567890` | 1. Nhập phone `01234567890`. 2. Bấm `Cập nhật`. | Phải cập nhật thành công theo spec. Nếu app báo lỗi thì ghi bug. | Ảnh phone nhập và thông báo kết quả. |
| FR04MB-TC-010 | Boundary - Phone 12 digits | Từ chối phone vượt max | `012345678901` | 1. Nhập phone 12 chữ số. 2. Bấm `Cập nhật`. | Bị từ chối vì vượt giới hạn 10-11 chữ số. | Ảnh thông báo lỗi. |
| FR04MB-TC-011 | Domain - Phone wrong prefix | Từ chối phone không bắt đầu bằng 0 | `1123456789` | 1. Nhập phone `1123456789`. 2. Bấm `Cập nhật`. | Phải bị từ chối vì không bắt đầu bằng 0. Nếu thành công thì ghi bug. | Ảnh dữ liệu nhập và thông báo kết quả. |
| FR04MB-TC-012 | Domain - Phone letters | Từ chối phone chứa chữ cái | `09abc45678` | 1. Nhập phone chứa chữ. 2. Bấm `Cập nhật`. | Bị từ chối, thông báo phone không hợp lệ. | Ảnh thông báo lỗi. |
| FR04MB-TC-013 | Domain - Phone special chars | Từ chối phone chứa ký tự đặc biệt | `091-234-5678` | 1. Nhập phone có dấu gạch. 2. Bấm `Cập nhật`. | Bị từ chối hoặc normalize rõ ràng; không được lưu sai định dạng. | Ảnh kết quả. |
| FR04MB-TC-014 | Boundary - Address empty | Kiểm tra địa chỉ giao hàng rỗng | Address rỗng, phone `987654321` để vượt validation hiện tại | 1. Xóa địa chỉ. 2. Dùng phone được implementation hiện tại chấp nhận. 3. Bấm `Cập nhật`. | Nếu địa chỉ bắt buộc thì báo lỗi; nếu optional thì lưu rỗng nhất quán. | Ảnh kết quả thực tế. |
| FR04MB-TC-015 | Domain - Address valid | Cập nhật địa chỉ hợp lệ | `123 nguyễn trãi, quận 5, tphcm`, phone `987654321` | 1. Nhập địa chỉ hợp lệ. 2. Bấm `Cập nhật`. | App báo thành công và địa chỉ được lưu. | Ảnh trước/sau cập nhật. |
| FR04MB-TC-016 | Persistence | Địa chỉ sau cập nhật phải được giữ lại khi vào lại app | Địa chỉ mới từ TC-015 | 1. Cập nhật địa chỉ. 2. Thoát app/reload Expo. 3. Login lại. 4. Mở profile. | Địa chỉ mới vẫn còn. Nếu mất hoặc không đổi thì ghi bug field mapping. | Ảnh profile sau reload/login lại. |
| FR04MB-TC-017 | Security/UI | Không hiển thị trường `role` để user tự sửa | User thường | 1. Login user thường. 2. Mở profile. 3. Quan sát toàn bộ form. | Không có field `role`, `admin`, quyền người dùng để chỉnh. | Ảnh toàn bộ form profile. |
| FR04MB-TC-018 | Domain - Logout | Thoát tài khoản xóa trạng thái profile | User đã login | 1. Vào profile. 2. Bấm `Thoát`. | Header trở về `Đăng nhập`, không còn xem profile user cũ. | Ảnh trước/sau logout. |
| FR04MB-TC-019 | Usability | Sau cập nhật thành công phải có feedback rõ ràng | Dữ liệu hợp lệ | 1. Sửa name/phone/address hợp lệ. 2. Bấm `Cập nhật`. | Có thông báo thành công hoặc UI feedback rõ ràng. Nếu không có phản hồi thì ghi usability issue. | Ảnh hoặc ghi chú không có feedback. |
| FR04MB-TC-020 | Error handling | Khi backend không khả dụng, app báo lỗi dễ hiểu | Tắt backend tạm thời | 1. Tắt backend. 2. Trong profile bấm `Cập nhật`. | App không treo; hiển thị lỗi cập nhật rõ ràng. | Ảnh thông báo lỗi. |

## 4. Các bug có khả năng cao sẽ gặp

### BUG-FR04MB-001 - Mobile từ chối số điện thoại hợp lệ bắt đầu bằng 0

Liên quan test:

- FR04MB-TC-008
- FR04MB-TC-009

Theo spec, phone hợp lệ phải bắt đầu bằng `0`, dài 10-11 chữ số. Tuy nhiên code mobile hiện validate:

```js
/^[1-9][0-9]{8,9}$/
```

Regex này bắt đầu bằng `[1-9]`, nghĩa là số bắt đầu bằng `0` có thể bị từ chối.

### BUG-FR04MB-002 - Mobile chấp nhận số điện thoại không bắt đầu bằng 0

Liên quan test:

- FR04MB-TC-011

Nếu nhập `1912345678` mà app báo thành công thì sai spec, vì phone phải bắt đầu bằng `0`.

### BUG-FR04MB-003 - Địa chỉ giao hàng có thể không được lưu đúng

Liên quan test:

- FR04MB-TC-015
- FR04MB-TC-016

Mobile gửi field:

```js
shippingAddress
```

Trong khi backend thường dùng:

```js
shipping_address
```

Nếu app báo thành công nhưng sau reload/login lại địa chỉ không giữ, đây là bug mapping field.

## 5. Quy ước đặt tên ảnh evidence

Khi bạn chụp màn hình từ iPhone, nên đổi tên ảnh theo format:

```text
FR04MB-TC-008-phone-10digits-valid.png
FR04MB-TC-011-phone-wrong-prefix.png
FR04MB-TC-016-address-persistence.png
```

Nếu xác nhận bug, đổi theo Bug ID:

```text
BUG-FR04MB-001/screenshot.png
BUG-FR04MB-002/screenshot.png
BUG-FR04MB-003/screenshot.png
```

## 6. Thứ tự test thủ công khuyến nghị

1. FR04MB-TC-001: Login và mở hồ sơ.
2. FR04MB-TC-003: Kiểm tra email read-only.
3. FR04MB-TC-008: Phone hợp lệ 10 chữ số bắt đầu bằng 0 (`0123456789`).
4. FR04MB-TC-009: Phone hợp lệ 11 chữ số bắt đầu bằng 0 (`01234567890`).
5. FR04MB-TC-011: Phone không bắt đầu bằng 0.
6. FR04MB-TC-015: Cập nhật địa chỉ hợp lệ.
7. FR04MB-TC-016: Reload/login lại kiểm tra địa chỉ có lưu không.
8. FR04MB-TC-017: Kiểm tra không có field role.
9. FR04MB-TC-018: Logout.
10. Các case còn lại nếu còn thời gian.
