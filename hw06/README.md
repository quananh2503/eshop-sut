# HW06 — AI API Testing

Sinh viên: **Nguyễn Lê Quan Anh — 23127001 — 23KTPM2**

## Selected APIs

| Pool | API | Cases planned |
|---|---|---:|
| A | `POST /api/login` | 40 |
| B | `PUT /api/orders/:id/cancel` | 40 |
| C | `PUT /api/admin/orders/:id/status` | 40 |
| **Total** |  | **120** |

The 120-case matrix has 35 AI-generated cases plus 5 human-added cases for each API. Test design is in [reports/test-basis-and-design.md](reports/test-basis-and-design.md); generated data is in `data/test-cases.json`.

## Running

1. Start the unmodified SUT: `cd backend && node server.js`.
2. Install Newman in a project-local development environment if it is not available.
3. Run `node hw06/scripts/generate_artifacts.js` and then `./hw06/scripts/run_newman.sh` from repository root.

The runner writes real output under `hw06/results/`. It never creates screenshots, reports, or pass/fail summaries without a real run.

## Submission checklist

- [ ] Main report and PDF
- [ ] AI Audit, Disclosure and Privacy Checklist (Markdown/PDF)
- [ ] Postman collection, environment and Newman HTML report
- [ ] Excel test cases and test summary
- [ ] CI/CD report, two real workflow-run links and screenshots
- [ ] Bug reports / GitHub Issues with real screenshots
- [ ] Test-generator diagram and pseudocode
- [ ] Git commit log
