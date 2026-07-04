# HW02 - Test Execution Notes

Dung file nay de ghi lai ket qua chay test va cap nhat status.

## 1. Lan chay test

| Run ID | Date/time | Backend | Web | Admin | Command | Result summary | Notes |
|---|---|---|---|---|---|---|---|
| RUN-001 | TODO | `localhost:3000` | `127.0.0.1:5173` | `127.0.0.1:5174` | `npm run test:e2e` | TODO | TODO |

## 2. Mapping test fail sang bug

| Test case / Playwright title | Result | Bug ID | Action |
|---|---|---|---|
| TODO | TODO | TODO | TODO |

## 3. Lenh nen chay

Chay tat ca tests:

```bash
npm run test:e2e
```

Chay rieng feature:

```bash
npx playwright test tests/fr03-forgot-password.spec.js
npx playwright test tests/fr07-shopping-cart.spec.js
npx playwright test tests/fr16-product-import.spec.js
```

Mo report:

```bash
npm run test:e2e:report
```

## 4. Sau khi co ket qua

- Cap nhat `docs/hw02/bug-tracker.md`.
- Tao issue draft neu bug confirmed.
- Tao GitHub Issue va dan link vao tracker.
- Cap nhat status trong `docs/hw02/test-cases.md` neu can.
