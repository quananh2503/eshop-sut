# HW06 CI/CD Report

## Pipeline design

The workflow definition is `ci/hw06-newman.yml`. Copy it to `.github/workflows/hw06-newman.yml` before pushing. It triggers manually and on changes to `backend/**` or `hw06/**`, installs backend dependencies, generates the collection, starts the backend, waits for localhost, runs Newman, and uploads reports with `if: always()`.

## Evidence to add after real GitHub runs

| Required run | Commit SHA/link | Screenshot | Status |
|---|---|---|---|
| Regression/smoke suite all passing | Pending | Pending | Not fabricated |
| Suite with one intentionally failing assertion | Pending | Pending | Not fabricated |

The current local regression run correctly contains two specification failures and therefore is not suitable to represent the all-pass CI example.
