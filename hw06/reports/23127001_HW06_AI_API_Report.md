# HW06 — API Testing Report

## 1. Information and scope

| Item | Value |
|---|---|
| Student | Nguyễn Lê Quan Anh — 23127001 |
| SUT | EShop backend, Node.js / Express / SQLite |
| Base URL | `http://127.0.0.1:3000` |
| Tool | Postman collection + Newman 6.2.2 |
| Selected APIs | `POST /api/login`; `PUT /api/orders/:id/cancel`; `PUT /api/admin/orders/:id/status` |

The SRS and API specification are the test oracle. Source inspection was used to establish data setup and hypotheses; it does not replace execution evidence.

## 2. Test design summary

| API | AI-generated | Human-added | Total | Primary coverage |
|---|---:|---:|---:|---|
| `POST /api/login` | 35 | 5 | 40 | partitions, lockout, JWT, schema, SQL-like inputs, credential exposure |
| `PUT /api/orders/:id/cancel` | 35 | 5 | 40 | ownership/IDOR, JWT, cancellation state transitions and final states |
| `PUT /api/admin/orders/:id/status` | 35 | 5 | 40 | admin authorization, complete state machine and terminal states |
| **Total** | **105** | **15** | **120** |  |

The traceable data matrix is `data/test-cases.json` and its Excel-importable CSV counterpart is `data/test-cases.csv`. The detailed basis, requirements mapping and state diagram are in `reports/test-basis-and-design.md`.

## 3. Human audit approach

Every AI-derived case is initially marked `INCOMPLETE` until reviewed against requirements and real behavior. The five human cases per API are marked `VALID` as design additions, not as passed executions. The human additions target gaps commonly missed by generic generation: password disclosure, exact lockout counter/duration, IDOR, user cancellation at `shipping`, final-state immutability, and ordinary-user access to admin operations.

## 4. Real execution record

An isolated temporary copy of the backend/database was started on localhost, so the working `backend/database.sqlite` in this repository was not modified. Newman ran the generated collection on 2026-08-23 UTC.

| Metric | Actual result |
|---|---:|
| Requests | 7 |
| Assertions | 9 |
| Passed assertions | 7 |
| Failed assertions | 2 |
| Transport/request errors | 0 |

The collection-level pre-request script printed `HW06 pre-request: X-Student-Id=23127001` before every request in the Newman console. The raw report and HTML report are `results/newman-report.json` and `results/newman-report.html`.

### Confirmed failures

1. `LOGIN-001`: response `user` object contained `password`, violating SEC-01.
2. `ADMINSTATUS ordinary user denied`: an ordinary user JWT received `200 OK` when setting a real owned order to `confirmed`, violating SEC-03/FR-12/FR-18.

These are documented as local issue drafts in `bugs/`. They must be re-run by the student and then published manually to GitHub with a real screenshot. This report intentionally does **not** claim that all 120 designed cases have been executed; the remaining execution matrix is pending expansion of the collection into each atomic data row.

## 5. Postman/Newman features used

- Collection and local environment variables (`baseUrl`, user/admin JWT, dynamic `orderId`).
- Collection pre-request script to inject `X-Student-Id`.
- Setup requests that authenticate user/admin and create an isolated order.
- Test scripts for status, response shape and authorization assertions.
- Newman CLI, JSON result export and HTML Extra report.
- JSON/CSV test-case data files, ready for data-driven collection expansion.

## 6. CI/CD

Workflow source is `ci/hw06-newman.yml`; before use, copy it to `.github/workflows/hw06-newman.yml`. It installs dependencies, starts the SUT, runs Newman and uploads reports even if a test fails. Two GitHub Actions run links and screenshots remain to be collected from real GitHub executions; they are not fabricated here.

## 7. AI-driven test generator

The reusable design is in `agent-skill/generate-api-tests/SKILL.md`. Its state model is self-drawn in `test-basis-and-design.md`, and the generator implementation is `scripts/generate_artifacts.js`. It converts endpoint contracts and a state model into atomic cases, CSV/JSON test data and a Postman collection skeleton. It never produces execution results.
