# HW06 CI/CD Report

## Pipeline design

The workflow definition is `ci/hw06-newman.yml`. Copy it to `.github/workflows/hw06-newman.yml` before pushing. It triggers manually and on changes to `backend/**` or `hw06/**`, installs backend dependencies, generates the collection, starts the backend, waits for localhost, runs Newman, and uploads reports with `if: always()`.

## Evidence to add after real GitHub runs

| Required run | Commit SHA/link | Screenshot | Status |
|---|---|---|---|
| Regression/smoke suite all passing | Pending | Pending | Not fabricated |
| Suite with one intentionally failing assertion | Pending | Pending | Not fabricated |

The current full local run invoked 120 unique primary IDs and has 35 failed assertions, so it is not suitable to represent the all-pass CI example. Create a separate smoke/regression folder after human audit for the required all-pass run; retain the specification suite as the required failing run.
