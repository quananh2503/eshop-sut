# Huong dan Playwright tests cho HW02

## 1. Cac test da viet

| File | Feature | So test | Muc dich |
|---|---|---:|---|
| `tests/fr03-forgot-password.spec.js` | FR-03 | 8 | Kiem tra OTP, password reset, step UI bang UI |
| `tests/fr07-shopping-cart.spec.js` | FR-07 | 8 | Kiem tra add cart, duplicate, remove confirm, total label, empty cart, +/- |
| `tests/fr16-product-import.spec.js` | FR-16 | 10 | Kiem tra CSV import, invalid price, rollback, RFC 4180 bang Admin UI |

Tong: 26 automated UI tests.

Luu y: Theo dinh huong Domain Testing cua bai, cac test nay uu tien thao tac qua UI. Neu UI khong co chuc nang/validation theo spec, test se fail va duoc xem la bug candidate.

## 2. Dieu kien truoc khi chay

Can mo 3 service:

- Backend: `http://localhost:3000`
- Frontend Web: `http://127.0.0.1:5173`
- Frontend Admin: `http://127.0.0.1:5174`

Neu dung Node 18, frontend can chay bang Node 20 tam nhu trong `docs/hw02/run_guide_vi.md`.

## 3. Lenh chay

Chay tat ca:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut
npm run test:e2e
```

Chay tung feature:

```bash
npx playwright test tests/fr03-forgot-password.spec.js
npx playwright test tests/fr07-shopping-cart.spec.js
npx playwright test tests/fr16-product-import.spec.js
```

Xem report:

```bash
npm run test:e2e:report
```

## 4. Cach doc ket qua

- Test pass: app dap ung expected result theo spec.
- Test fail: can review lai de phan biet:
  - Bug that cua SUT.
  - Loi test script/selector.
  - Server chua chay.
  - Data bi thay doi do test truoc.

Neu fail la bug that, dung screenshot/trace/video trong `test-results/` lam evidence de tao GitHub Issue.

## 5. Luu y

- Mot so test duoc viet theo dac ta dung, nen kha nang fail cao vi repo SUT co bug co y.
- Khong test truc tiep backend API trong bo Playwright nay; backend chi duoc dung nhu service ho tro UI.
- Voi cac feature luu state tren browser/client, test khong reload giua cac buoc neu state do can duoc giu lai. Vi du: gio hang web hien luu trong React state/context, nen test add duplicate san pham phai add hai lan trong cung mot page session.
- Moi Playwright test mac dinh chay trong browser context rieng, nen localStorage/cookie khong bi ro ri giua cac test case.
- Khong nen auto-create GitHub Issue ngay sau moi test fail. Nen review truoc.
- Cac test title co ID nhu `FR07-DT-002` de trace ve `docs/hw02/test-cases.md`.
