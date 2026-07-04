# Huong dan chay EShop cho HW02

## 1. Dieu kien moi truong

- Node.js hien tai tren may: `v18.19.1`.
- Repo cai duoc dependencies, nhung co canh bao mot so package yeu cau Node 20+.
- Neu `npm run dev` loi do engine/Vite, nen cai Node 20 LTS bang `nvm` hoac cong cu quan ly Node tuong duong.
- Kiem tra thuc te: Vite 8 trong `frontend-web` va `frontend-admin` khong chay duoc voi Node 18. Can Node `20.19+` hoac `22.12+`.

Kiem tra version:

```bash
node -v
```

Neu chua co Node 20, co the chay tam bang `npx`:

```bash
npx -p node@20 node -v
```

## 2. Chay backend

Mo terminal 1:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut/backend
node database.js
node server.js
```

Ket qua mong doi:

```text
Server is running on http://localhost:3000
```

Tai khoan seed:

- User: `test@eshop.com` / `Test1234!`
- Admin: `admin@eshop.com` / `Admin123!`

## 3. Chay frontend web

Mo terminal 2:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut/frontend-web
npm run dev
```

URL du kien:

`http://localhost:5173`

Neu may van dang dung Node 18 va chua cai Node 20, chay tam bang:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut/frontend-web
npx -p node@20 node node_modules/vite/bin/vite.js --host 127.0.0.1
```

## 4. Chay frontend admin

Mo terminal 3:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut/frontend-admin
npm run dev
```

URL du kien:

`http://localhost:5174`

Neu may van dang dung Node 18 va chua cai Node 20, chay tam bang:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut/frontend-admin
npx -p node@20 node node_modules/vite/bin/vite.js --host 127.0.0.1
```

## 5. Chay Playwright sau khi app dang mo

Mo terminal 4:

```bash
cd /home/quananh/seminar/07_hw02_individual/02_source_materials/eshop-sut
npm run test:e2e
```

Xem report:

```bash
npm run test:e2e:report
```

## 6. Ghi chu

- `run_servers.sh` trong repo goc khong dung truc tiep vi hard-code duong dan may tac gia.
- Playwright se luu screenshot/trace/video khi test fail, phu hop lam bang chung bug.
- Khong nen tao GitHub Issue tu dong ngay khi test fail; can xem lai de tranh issue sai do loi script hoac moi truong.
